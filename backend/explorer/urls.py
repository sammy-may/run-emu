from django.urls import path

from .views import create_race, get_races

urlpatterns = [
    path("", get_races, name="get_races"),
    path("create/", create_race, name="create_race"),
]
