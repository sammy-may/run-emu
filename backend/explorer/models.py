from datetime import datetime

from django.db import models  # noqa: F401


# Create your models here.
class Race(models.Model):
    name = models.CharField(max_length=100, default="", unique=True)
    distance = models.FloatField(default=0.0)
    date = models.DateTimeField(default=datetime.fromisoformat("2000-01-01 00:00:00"))
    location = models.CharField(max_length=100, default="")
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
