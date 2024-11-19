from datetime import datetime

from django.shortcuts import render  # noqa: F401
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Race
from .serializers import RaceSerializer


# Create your views here.
@api_view(["GET"])
def get_races(request):
    active_only = request.GET.get("active_only")
    if active_only:
        races = Race.objects.filter(date__gte=datetime.today())
    else:
        races = Race.objects.all()
    serializedData = RaceSerializer(races, many=True).data
    return Response(serializedData)


@api_view(["POST"])
def create_race(request):
    data = request.data
    serializer = RaceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
