"""Fetch public repositories for the portfolio via GitHub API (PyGithub)."""

from __future__ import annotations

from dataclasses import dataclass
from itertools import islice
from typing import Iterable

from github import Auth, Github


@dataclass(frozen=True)
class RepoSummary:
    name: str
    description: str | None
    html_url: str
    stargazers_count: int
    language: str | None


def iter_portfolio_repos(
    username: str,
    *,
    token: str | None = None,
    exclude_forks: bool = True,
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
        yield RepoSummary(
            name=repo.name,
            description=repo.description,
            html_url=repo.html_url,
            stargazers_count=repo.stargazers_count,
            language=repo.language,
        )
