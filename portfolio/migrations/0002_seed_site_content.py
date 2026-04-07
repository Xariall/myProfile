from django.db import migrations


def seed(apps, schema_editor):
    SiteProfile = apps.get_model("portfolio", "SiteProfile")
    HeroTechPill = apps.get_model("portfolio", "HeroTechPill")
    StackGroup = apps.get_model("portfolio", "StackGroup")
    StackItem = apps.get_model("portfolio", "StackItem")
    Project = apps.get_model("portfolio", "Project")

    if not SiteProfile.objects.filter(pk=1).exists():
        SiteProfile.objects.create(
            pk=1,
            hero_eyebrow="Добро пожаловать",
            hero_name="Имя Фамилия",
            hero_tagline="Собираю надёжные бэкенды и понятные интерфейсы к данным.",
            hero_role="Python · Django · API",
            code_block=(
                '# hello.py\ndef focus():\n    return {\n        "stack": ["Django", "DRF", "PostgreSQL"],\n'
                '        "goal": "Чистый API и предсказуемые данные",\n    }'
            ),
            about_title="Обо мне",
            about_lead="Кратко опишите, чем занимаетесь — текст правится в админке.",
            about_body=(
                "Я проектирую и развиваю серверную часть приложений: REST API, интеграции, "
                "базы данных. Ценю читаемый код и предсказуемое поведение системы."
            ),
            m1_value="12+",
            m1_label="проектов",
            m2_value="5",
            m2_label="лет опыта",
            m3_value="100%",
            m3_label="внимание к деталям",
            stack_title="Стек",
            stack_lead="Технологии и инструменты, с которыми работаю.",
            projects_title="Проекты",
            projects_lead="Избранные работы; ссылки и описания редактируются в админке.",
            contact_title="Контакты",
            contact_lead="Напишите — отвечу на email или в мессенджере.",
            contact_email="hello@example.com",
            contact_email_href="mailto:hello@example.com",
            github_url="https://github.com/",
            linkedin_url="",
            telegram_url="",
            case_title="Топ-проект: мини-кейс",
            case_problem="Разрозненные данные и медленные отчёты.",
            case_solution="Единая схема БД, API слой, кэширование выборок.",
            case_result="Предсказуемое время ответа и нагрузка на БД.",
            header_logo_label="",
        )

    pills = ["Python", "Django", "DRF", "PostgreSQL"]
    if HeroTechPill.objects.count() == 0:
        for i, label in enumerate(pills):
            HeroTechPill.objects.create(label=label, sort_order=i)

    if StackGroup.objects.count() == 0:
        g1 = StackGroup.objects.create(title="Languages", sort_order=0)
        StackItem.objects.create(
            group=g1,
            name="Python",
            hint="Основной язык: сервисы, скрипты, async при необходимости.",
            level="advanced",
            sort_order=0,
        )
        StackItem.objects.create(
            group=g1,
            name="SQL",
            hint="Сложные выборки, индексы, миграции схемы.",
            level="proficient",
            sort_order=1,
        )
        g2 = StackGroup.objects.create(title="Frameworks", sort_order=1)
        StackItem.objects.create(
            group=g2,
            name="Django",
            hint="ORM, админка, middleware.",
            level="advanced",
            sort_order=0,
        )
        StackItem.objects.create(
            group=g2,
            name="DRF",
            hint="ViewSets, permissions, фильтры.",
            level="advanced",
            sort_order=1,
        )
        g3 = StackGroup.objects.create(title="Databases", sort_order=2)
        StackItem.objects.create(
            group=g3,
            name="PostgreSQL",
            hint="Транзакции, JSONB, Supabase.",
            level="proficient",
            sort_order=0,
        )

    if Project.objects.count() == 0:
        Project.objects.create(
            title="API-платформа",
            description="Микросервисная логика, версионирование API.",
            category="api",
            tags="Django, DRF, PostgreSQL",
            github_url="https://github.com/",
            live_url="",
            is_active=True,
            sort_order=0,
        )
        Project.objects.create(
            title="Интернет-магазин",
            description="Каталог, корзина, интеграции с оплатой.",
            category="commerce",
            tags="Django, PostgreSQL, Redis",
            github_url="https://github.com/",
            live_url="",
            is_active=True,
            sort_order=1,
        )


def unseed(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
