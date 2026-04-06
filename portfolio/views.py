from django.shortcuts import render


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
