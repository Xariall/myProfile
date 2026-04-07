"""Fetch public repositories for the portfolio via GitHub API (PyGithub)."""

from __future__ import annotations

from dataclasses import dataclass
from itertools import islice
from typing import Any, Iterable

from github import Auth, Github


@dataclass(frozen=True)
class RepoSummary:
    name: str
    description: str | None
    html_url: str
    homepage: str | None
    stargazers_count: int
    language: str | None


def iter_portfolio_repos(
    username: str,
    *,
    token: str | None = None,
    exclude_forks: bool = True,
    exclude_private: bool = True,
    limit: int = 50,
) -> Iterable[RepoSummary]:
    if token:
        g = Github(auth=Auth.Token(token))
    else:
        g = Github()

    user = g.get_user(username)
    for repo in islice(user.get_repos(sort="updated"), limit):
        if exclude_forks and repo.fork:
            continue
        if exclude_private and getattr(repo, "private", False):
            continue
        raw_home = getattr(repo, "homepage", "") or ""
        homepage = raw_home.strip() or None
        yield RepoSummary(
            name=repo.name,
            description=repo.description,
            html_url=repo.html_url,
            homepage=homepage,
            stargazers_count=repo.stargazers_count,
            language=repo.language,
        )


def repos_to_card_dicts(repos: Iterable[RepoSummary]) -> list[dict[str, Any]]:
    """Унифицированная структура для шаблона главной (как у модели Project)."""
    cards: list[dict[str, Any]] = []
    for r in repos:
        tag_parts = []
        if r.language:
            tag_parts.append(r.language)
        tag_parts.append(f"★ {r.stargazers_count}")
        cards.append(
            {
                "title": r.name,
                "description": r.description or "",
                "github_url": r.html_url,
                "live_url": r.homepage or "",
                "tags": " · ".join(tag_parts),
            }
        )
    return cards
