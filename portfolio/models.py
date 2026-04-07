from django.db import models


class SiteProfile(models.Model):
    """Единственная запись: тексты главной страницы (редактируются в админке)."""

    hero_eyebrow = models.CharField("Приветствие (hero)", max_length=160, blank=True)
    hero_name = models.CharField("Имя в шапке и hero", max_length=200, blank=True)
    hero_tagline = models.TextField("Подзаголовок / описание (meta)", blank=True)
    hero_role = models.CharField("Роль / стек одной строкой", max_length=300, blank=True)
    code_block = models.TextField(
        "Код в блоке справа",
        blank=True,
        help_text="Многострочный текст; HTML экранируется — используйте обычный код.",
    )

    about_title = models.CharField("Заголовок «Обо мне»", max_length=200, blank=True)
    about_lead = models.TextField("Лид «Обо мне»", blank=True)
    about_body = models.TextField(
        "Текст «Обо мне»",
        blank=True,
        help_text="Основной абзац; переносы строк сохраняются.",
    )

    m1_value = models.CharField("Метрика 1 — число", max_length=50, blank=True)
    m1_label = models.CharField("Метрика 1 — подпись", max_length=120, blank=True)
    m2_value = models.CharField("Метрика 2 — число", max_length=50, blank=True)
    m2_label = models.CharField("Метрика 2 — подпись", max_length=120, blank=True)
    m3_value = models.CharField("Метрика 3 — число", max_length=50, blank=True)
    m3_label = models.CharField("Метрика 3 — подпись", max_length=120, blank=True)

    stack_title = models.CharField("Заголовок «Стек»", max_length=200, blank=True)
    stack_lead = models.TextField("Лид «Стек»", blank=True)

    projects_title = models.CharField("Заголовок «Проекты»", max_length=200, blank=True)
    projects_lead = models.TextField("Лид «Проекты»", blank=True)

    contact_title = models.CharField("Заголовок «Контакты»", max_length=200, blank=True)
    contact_lead = models.TextField("Лид «Контакты»", blank=True)

    contact_email = models.CharField(
        "Email (отображение)",
        max_length=200,
        blank=True,
        help_text="Текст ссылки, например hello@mail.com",
    )
    contact_email_href = models.CharField(
        "Email (mailto)",
        max_length=300,
        blank=True,
        help_text="Например mailto:hello@mail.com",
    )
    github_url = models.URLField("GitHub", blank=True)
    linkedin_url = models.URLField("LinkedIn", blank=True)
    telegram_url = models.URLField("Telegram", blank=True)

    case_title = models.CharField("Кейс: заголовок", max_length=200, blank=True)
    case_problem = models.TextField("Кейс: проблема", blank=True)
    case_solution = models.TextField("Кейс: решение", blank=True)
    case_result = models.TextField("Кейс: результат", blank=True)

    header_logo_label = models.CharField(
        "Текст логотипа в шапке",
        max_length=120,
        blank=True,
        help_text="Если пусто — используется имя из hero.",
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Тексты сайта"
        verbose_name_plural = "Тексты сайта"

    def __str__(self):
        return self.hero_name or "Тексты сайта"


class HeroTechPill(models.Model):
    label = models.CharField(max_length=80)
    sort_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["sort_order", "pk"]
        verbose_name = "Технология (hero)"
        verbose_name_plural = "Технологии (hero)"


class StackGroup(models.Model):
    title = models.CharField(max_length=120)
    sort_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["sort_order", "pk"]
        verbose_name = "Группа стека"
        verbose_name_plural = "Группы стека"

    def __str__(self):
        return self.title


class StackItem(models.Model):
    LEVEL_CHOICES = [
        ("advanced", "Advanced"),
        ("proficient", "Proficient"),
        ("intermediate", "Intermediate"),
    ]

    group = models.ForeignKey(
        StackGroup,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name="Группа",
    )
    name = models.CharField(max_length=120)
    hint = models.TextField(
        "Описание при наведении",
        blank=True,
        help_text="Для расширенной вёрстки; на простой странице можно кратко.",
    )
    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        default="proficient",
    )
    sort_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["sort_order", "pk"]
        verbose_name = "Элемент стека"
        verbose_name_plural = "Элементы стека"

    def __str__(self):
        return f"{self.group.title}: {self.name}"


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("api", "API"),
        ("commerce", "E-commerce"),
        ("data", "Data-driven"),
        ("other", "Другое"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="other",
    )
    tags = models.CharField(
        "Теги через запятую",
        max_length=500,
        blank=True,
        help_text="Например: Django, DRF, PostgreSQL",
    )
    github_url = models.URLField(blank=True)
    live_url = models.URLField("Демо / Live", blank=True)
    is_active = models.BooleanField("Показывать на сайте", default=True)
    sort_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["sort_order", "pk"]
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return self.title

    def tag_list(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]


def get_or_create_site_profile():
    defaults = {
        "hero_eyebrow": "Добро пожаловать",
        "hero_name": "Имя Фамилия",
        "hero_tagline": "Собираю надёжные бэкенды и понятные интерфейсы к данным.",
        "hero_role": "Python · Django · API",
        "code_block": "",
        "about_title": "Обо мне",
        "about_lead": (
            "Кратко опишите, чем занимаетесь и какие задачи решаете — текст можно править в админке."
        ),
        "about_body": (
            "Здесь — основной текст о вас: опыт, подход, ценности. Переносы строк сохраняются."
        ),
        "m1_value": "12+",
        "m1_label": "проектов",
        "m2_value": "5",
        "m2_label": "лет опыта",
        "m3_value": "100%",
        "m3_label": "внимание к деталям",
        "stack_title": "Стек",
        "stack_lead": "Технологии и инструменты, с которыми работаю.",
        "projects_title": "Проекты",
        "projects_lead": "Избранные работы; ссылки и описания редактируются в админке.",
        "contact_title": "Контакты",
        "contact_lead": "Напишите — отвечу на email или в мессенджере.",
        "contact_email": "hello@example.com",
        "contact_email_href": "mailto:hello@example.com",
        "github_url": "https://github.com/",
        "linkedin_url": "",
        "telegram_url": "",
        "case_title": "Топ-проект: мини-кейс",
        "case_problem": "Разрозненные данные и медленные отчёты.",
        "case_solution": "Единая схема БД, API слой, кэширование выборок.",
        "case_result": "Предсказуемое время ответа и нагрузка на БД.",
        "header_logo_label": "",
    }
    obj, created = SiteProfile.objects.get_or_create(pk=1, defaults=defaults)
    if created:
        return obj
    # Дополняем пустые поля у существующей записи не трогаем; только первичное создание
    return obj
