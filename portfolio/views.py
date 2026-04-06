from dataclasses import asdict

from django.conf import settings
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from portfolio.services.github import iter_portfolio_repos


def home(request):
    return render(
        request,
        "portfolio/index.html",
        {
            "name": "Имя Фамилия",
            "role": "Python · Django · API",
            "tagline": "Собираю надёжные бэкенды и понятные интерфейсы к данным.",
        },
    )


@api_view(["GET"])
def health(_request):
    return Response({"status": "ok"})


@api_view(["GET"])
def github_projects(_request):
    username = settings.GITHUB_USERNAME
    if not username:
        return Response(
            {"detail": "Set GITHUB_USERNAME in environment to list projects."},
            status=status.HTTP_501_NOT_IMPLEMENTED,
        )

    token = settings.GITHUB_TOKEN or None
    repos = [asdict(r) for r in iter_portfolio_repos(username, token=token)]
    return Response(repos)
