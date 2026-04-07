"""Fetch public repositories for the portfolio via GitHub API (PyGithub)."""

from __future__ import annotations

import logging
from dataclasses import dataclass
from itertools import islice
from typing import Any, Iterable

from github import Auth, Github, GithubException

logger = logging.getLogger(__name__)


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


def fetch_repos_by_names(
    username: str,
    names: list[str],
    *,
    token: str | None = None,
    exclude_forks: bool = True,
    exclude_private: bool = True,
) -> list[RepoSummary]:
    """Подтягивает репозитории по точным именам, порядок как в списке."""
    if not names:
        return []

    if token:
        g = Github(auth=Auth.Token(token))
    else:
        g = Github()

    out: list[RepoSummary] = []
    for raw in names:
        name = raw.strip()
        if not name:
            continue
        full = f"{username}/{name}"
        try:
            repo = g.get_repo(full)
        except GithubException as e:
            logger.warning("GitHub: репозиторий %s недоступен: %s", full, e)
            continue
        if exclude_forks and repo.fork:
            logger.warning("GitHub: %s пропущен (fork)", full)
            continue
        if exclude_private and getattr(repo, "private", False):
            logger.warning("GitHub: %s пропущен (private)", full)
            continue
        raw_home = getattr(repo, "homepage", "") or ""
        homepage = raw_home.strip() or None
        out.append(
            RepoSummary(
                name=repo.name,
                description=repo.description,
                html_url=repo.html_url,
                homepage=homepage,
                stargazers_count=repo.stargazers_count,
                language=repo.language,
            )
        )
    return out


def load_repos_for_portfolio(
    username: str,
    *,
    token: str | None,
    limit: int,
    exclude_forks: bool,
    exclude_private: bool,
    allowlist: list[str],
) -> list[RepoSummary]:
    """С allowlist — только выбранные репозитории; без — список по обновлению (как раньше)."""
    if allowlist:
        return fetch_repos_by_names(
            username,
            allowlist,
            token=token,
            exclude_forks=exclude_forks,
            exclude_private=exclude_private,
        )
    return list(
        iter_portfolio_repos(
            username,
            token=token,
            limit=limit,
            exclude_forks=exclude_forks,
            exclude_private=exclude_private,
        )
    )


def repos_to_card_dicts(repos: Iterable[RepoSummary]) -> list[dict[str, Any]]:
    """Карточки для React SPA, совместимые с типом Project в Projects.tsx."""
    cards: list[dict[str, Any]] = []
    for i, r in enumerate(repos):
        lang = (r.language or "").strip()
        cards.append(
            {
                "id": f"gh{i}",
                "title": r.name,
                "description": r.description or "",
                "longDescription": r.description or "",
                "github_url": r.html_url,
                "live_url": r.homepage or "",
                "tags": [lang] if lang else [],
                "category": lang or "Other",
                "featured": False,
                "stars": str(r.stargazers_count) if r.stargazers_count else "",
                "status": "Open Source",
            }
        )
    return cards
