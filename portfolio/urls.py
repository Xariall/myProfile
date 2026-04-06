from django.urls import path

from portfolio import views

urlpatterns = [
    path("health/", views.health, name="api-health"),
    path("github/projects/", views.github_projects, name="api-github-projects"),
]
