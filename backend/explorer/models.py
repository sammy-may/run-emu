from django.db import models  # noqa: F401


# Create your models here.
class Race(models.Model):
    name = models.CharField(max_length=100, default="", unique=True)
    distance = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
