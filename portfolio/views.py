from dataclasses import asdict

from django.conf import settings as django_settings
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
from portfolio.services.github import iter_portfolio_repos


def home(request):
    profile = get_or_create_site_profile()
    pills = HeroTechPill.objects.all()
    stack_groups = StackGroup.objects.prefetch_related("items")
    projects = Project.objects.filter(is_active=True)
    logo_text = (profile.header_logo_label or "").strip() or profile.hero_name or "portfolio"

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
            "projects": projects,
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
    repos = [asdict(r) for r in iter_portfolio_repos(username, token=token)]
    return Response(repos)
