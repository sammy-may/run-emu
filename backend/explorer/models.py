from datetime import datetime

from django.db import models  # noqa: F401


# Create your models here.
class Race(models.Model):
    name = models.CharField(max_length=100, default="", unique=True)
    name_url = models.CharField(max_length=100, default="")
    distance = models.FloatField(default=0.0)
    images = models.JSONField(default=dict)
    distances = models.JSONField(default=dict)
    distance_min = models.FloatField(default=0.0)
    distance_max = models.FloatField(default=0.0)
    website = models.CharField(max_length=100, default="")
    register = models.CharField(max_length=100, default="")
    date = models.DateTimeField(default=datetime.fromisoformat("2000-01-01 00:00:00"))
    location = models.CharField(max_length=100, default="")
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
