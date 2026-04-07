import logging
from dataclasses import asdict

from django.conf import settings as django_settings
from django.core.cache import cache
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from portfolio.models import (
    HeroTechPill,
    Project,
    StackGroup,
    get_or_create_site_profile,
)
from portfolio.services.github import load_repos_for_portfolio, repos_to_card_dicts

logger = logging.getLogger(__name__)


def _projects_from_database():
    return [
        {
            "title": p.title,
            "description": p.description or "",
            "github_url": p.github_url or "",
            "live_url": p.live_url or "",
            "tags": p.tags or "",
            "category": p.category,
        }
        for p in Project.objects.filter(is_active=True).order_by("sort_order", "pk")
    ]


def _load_github_project_cards():
    username = (django_settings.GITHUB_USERNAME or "").strip()
    if not username:
        return []

    allowlist = getattr(django_settings, "GITHUB_REPO_ALLOWLIST", []) or []
    cache_key = f"portfolio:github_cards:{username}:{','.join(allowlist)}"
    cached = cache.get(cache_key)
    if cached is not None:
        return list(cached)

    repos = load_repos_for_portfolio(
        username,
        token=(django_settings.GITHUB_TOKEN or None) or None,
        limit=django_settings.GITHUB_REPOS_LIMIT,
        exclude_forks=django_settings.GITHUB_EXCLUDE_FORKS,
        exclude_private=django_settings.GITHUB_EXCLUDE_PRIVATE,
        allowlist=allowlist,
    )
    cards = repos_to_card_dicts(repos)
    cache.set(cache_key, cards, django_settings.GITHUB_CACHE_TTL)
    return cards


def home(request):
    profile = get_or_create_site_profile()
    pills = HeroTechPill.objects.all()
    stack_groups = StackGroup.objects.prefetch_related("items")
    logo_text = (profile.header_logo_label or "").strip() or profile.hero_name or "portfolio"

    gh_user = (django_settings.GITHUB_USERNAME or "").strip()
    if gh_user:
        try:
            portfolio_projects = _load_github_project_cards()
            projects_from_github = True
        except Exception:
            logger.exception(
                "Не удалось загрузить репозитории с GitHub, показываем проекты из БД"
            )
            portfolio_projects = _projects_from_database()
            projects_from_github = False
    else:
        portfolio_projects = _projects_from_database()
        projects_from_github = False

    return render(
        request,
        "portfolio/index.html",
        {
            "profile": profile,
            "name": profile.hero_name,
            "tagline": profile.hero_tagline,
            "role": profile.hero_role,
            "pills": pills,
            "stack_groups": stack_groups,
            "portfolio_projects": portfolio_projects,
            "projects_from_github": projects_from_github,
            "github_cache_ttl_minutes": max(1, django_settings.GITHUB_CACHE_TTL // 60),
            "github_curated": bool(
                getattr(django_settings, "GITHUB_REPO_ALLOWLIST", []) or []
            ),
            "logo_text": logo_text,
        },
    )


@api_view(["GET"])
def health(_request):
    return Response({"status": "ok"})


@api_view(["GET"])
def github_projects(_request):
    username = django_settings.GITHUB_USERNAME
    if not username:
        return Response(
            {"detail": "Set GITHUB_USERNAME in environment to list projects."},
            status=status.HTTP_501_NOT_IMPLEMENTED,
        )

    token = django_settings.GITHUB_TOKEN or None
    allowlist = getattr(django_settings, "GITHUB_REPO_ALLOWLIST", []) or []
    repos = [
        asdict(r)
        for r in load_repos_for_portfolio(
            username,
            token=token,
            limit=django_settings.GITHUB_REPOS_LIMIT,
            exclude_forks=django_settings.GITHUB_EXCLUDE_FORKS,
            exclude_private=django_settings.GITHUB_EXCLUDE_PRIVATE,
            allowlist=allowlist,
        )
    ]
    return Response(repos)
