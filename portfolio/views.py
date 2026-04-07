import json
import logging
from dataclasses import asdict

from django.conf import settings as django_settings
from django.core.cache import cache
from django.shortcuts import render
from django.utils.safestring import mark_safe
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from portfolio.models import (
    Certification,
    Education,
    Experience,
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
            "id": f"p{p.pk}",
            "title": p.title,
            "description": p.description or "",
            "longDescription": p.long_description or "",
            "tags": p.tag_list(),
            "category": p.category or "Other",
            "featured": p.featured,
            "stars": p.stars or "",
            "status": p.status or "Production",
            "github_url": p.github_url or "",
            "live_url": p.live_url or "",
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


def _build_portfolio_data(profile):
    """Build unified dict consumed by React SPA via window.__DATA__."""

    roles = [r.strip() for r in (profile.hero_role or "").split("·") if r.strip()]

    stats = []
    for i in range(1, 4):
        v = getattr(profile, f"m{i}_value", "")
        l = getattr(profile, f"m{i}_label", "")
        if v:
            stats.append({"value": v, "label": l})

    pills = list(HeroTechPill.objects.values_list("label", flat=True))

    skills = []
    for group in StackGroup.objects.prefetch_related("items").order_by("sort_order", "pk"):
        skills.append({
            "id": f"g{group.pk}",
            "label": group.title,
            "icon": group.icon or "💻",
            "skills": [
                {"name": item.name, "level": item.level_percent}
                for item in group.items.order_by("sort_order", "pk")
            ],
        })

    try:
        projects = _load_github_project_cards()
        if not projects:
            projects = _projects_from_database()
    except Exception:
        logger.exception("GitHub fetch failed, falling back to DB projects")
        projects = _projects_from_database()

    experience = [
        {
            "id": f"e{exp.pk}",
            "role": exp.role,
            "company": exp.company,
            "period": exp.period,
            "location": exp.location or "",
            "type": dict(Experience.TYPE_CHOICES).get(exp.type, exp.type),
            "description": exp.description or "",
            "achievements": exp.achievement_list(),
            "tags": exp.tag_list(),
        }
        for exp in Experience.objects.order_by("sort_order", "pk")
    ]

    education = [
        {
            "degree": edu.degree,
            "field": edu.field,
            "institution": edu.institution,
            "period": edu.period,
            "gpa": edu.gpa or "",
            "thesis": edu.thesis or "",
        }
        for edu in Education.objects.order_by("sort_order", "pk")
    ]

    certifications = [
        {
            "name": c.name,
            "issuer": c.issuer,
            "date": c.date,
            "credentialId": c.credential_id or "",
            "badge": c.badge or "🎯",
        }
        for c in Certification.objects.order_by("sort_order", "pk")
    ]

    contact_links = []
    if profile.contact_email:
        contact_links.append({
            "label": "Email",
            "value": profile.contact_email,
            "href": profile.contact_email_href or f"mailto:{profile.contact_email}",
            "description": "Best for professional inquiries",
            "color": "#EA4335",
            "iconName": "Mail",
        })
    if profile.github_url:
        contact_links.append({
            "label": "GitHub",
            "value": profile.github_url.replace("https://github.com/", "@"),
            "href": profile.github_url,
            "description": "View my open-source work",
            "color": "#E8EAF0",
            "iconName": "Github",
        })
    if profile.telegram_url:
        contact_links.append({
            "label": "Telegram",
            "value": profile.telegram_url.replace("https://t.me/", "@"),
            "href": profile.telegram_url,
            "description": "Quick messages & collaboration",
            "color": "#2AABEE",
            "iconName": "Send",
        })
    if profile.linkedin_url:
        contact_links.append({
            "label": "LinkedIn",
            "value": profile.linkedin_url.replace("https://", ""),
            "href": profile.linkedin_url,
            "description": "Professional network",
            "color": "#0A66C2",
            "iconName": "Linkedin",
        })
    if profile.twitter_url:
        contact_links.append({
            "label": "Twitter / X",
            "value": profile.twitter_url.replace("https://twitter.com/", "@").replace("https://x.com/", "@"),
            "href": profile.twitter_url,
            "description": "Thoughts on AI & tech",
            "color": "#E8EAF0",
            "iconName": "Twitter",
        })

    return {
        "profile": {
            "hero_eyebrow": profile.hero_eyebrow or "",
            "hero_name": profile.hero_name or "",
            "hero_tagline": profile.hero_tagline or "",
            "about_title": profile.about_title or "",
            "about_lead": profile.about_lead or "",
            "about_body": profile.about_body or "",
            "contact_title": profile.contact_title or "",
            "contact_lead": profile.contact_lead or "",
            "github_url": profile.github_url or "",
            "linkedin_url": profile.linkedin_url or "",
            "twitter_url": profile.twitter_url or "",
        },
        "roles": roles,
        "stats": stats,
        "pills": pills,
        "skills": skills,
        "projects": projects,
        "experience": experience,
        "education": education,
        "certifications": certifications,
        "contact_links": contact_links,
    }


def home(request):
    profile = get_or_create_site_profile()
    portfolio_data = _build_portfolio_data(profile)
    portfolio_json = mark_safe(json.dumps(portfolio_data, ensure_ascii=False))

    return render(
        request,
        "portfolio/index.html",
        {"portfolio_json": portfolio_json},
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
