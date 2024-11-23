from rest_framework import serializers

from .models import Race


class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = (
            "id",
            "name",
            "name_url",
            "images",
            "distance",
            "distances",
            "distance_min",
            "distance_max",
            "website",
            "register",
            "date",
            "location",
            "latitude",
            "longitude",
            "created_at",
        )
