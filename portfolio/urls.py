from django.urls import path

from portfolio import views

urlpatterns = [
    path("", views.home, name="home"),
    path("api/health/", views.health, name="api-health"),
    path("api/github/projects/", views.github_projects, name="api-github-projects"),
]
