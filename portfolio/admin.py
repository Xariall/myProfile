from django.contrib import admin

from portfolio.models import (
    Certification,
    Education,
    Experience,
    HeroTechPill,
    Project,
    SiteProfile,
    StackGroup,
    StackItem,
)


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("hero_name", "updated_at")
    readonly_fields = ("updated_at",)

    fieldsets = (
        (
            "Hero",
            {
                "fields": (
                    "header_logo_label",
                    "hero_eyebrow",
                    "hero_name",
                    "hero_tagline",
                    "hero_role",
                    "code_block",
                )
            },
        ),
        (
            "Обо мне",
            {
                "fields": (
                    "about_title",
                    "about_lead",
                    "about_body",
                    ("m1_value", "m1_label"),
                    ("m2_value", "m2_label"),
                    ("m3_value", "m3_label"),
                )
            },
        ),
        (
            "Секции",
            {
                "fields": (
                    ("stack_title", "stack_lead"),
                    ("projects_title", "projects_lead"),
                    ("contact_title", "contact_lead"),
                )
            },
        ),
        (
            "Контакты и ссылки",
            {
                "fields": (
                    "contact_email",
                    "contact_email_href",
                    "github_url",
                    "linkedin_url",
                    "telegram_url",
                )
            },
        ),
        (
            "Кейс (блок внизу проектов)",
            {
                "fields": (
                    "case_title",
                    "case_problem",
                    "case_solution",
                    "case_result",
                )
            },
        ),
        ("Служебное", {"fields": ("updated_at",)}),
    )

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


class StackItemInline(admin.TabularInline):
    model = StackItem
    extra = 1
    ordering = ("sort_order", "pk")


@admin.register(StackGroup)
class StackGroupAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order")
    ordering = ("sort_order", "pk")
    inlines = [StackItemInline]


@admin.register(HeroTechPill)
class HeroTechPillAdmin(admin.ModelAdmin):
    list_display = ("label", "sort_order")
    ordering = ("sort_order", "pk")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_active", "sort_order")
    list_filter = ("category", "is_active")
    ordering = ("sort_order", "pk")
    search_fields = ("title", "description")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "period", "type", "sort_order")
    ordering = ("sort_order", "pk")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "field", "institution", "period", "sort_order")
    ordering = ("sort_order", "pk")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuer", "date", "sort_order")
    ordering = ("sort_order", "pk")
