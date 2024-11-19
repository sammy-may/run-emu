import json
from datetime import datetime

from explorer.models import Race

SPIDER_DUMP_FILE = "../data/spider_dump.json"


def run():
    with open(SPIDER_DUMP_FILE, "r") as f_in:
        races = json.load(f_in)
        for race, info in races.items():
            print(race, info)

            my_race, created = Race.objects.get_or_create(name=info["title"])

            my_race.distance = len(info["distances"])
            my_race.date = datetime.strptime(info["date"], "%B %d, %Y %H:%M:%S")
            my_race.location = info["location"]
            if "latitude" in info and "longitude" in info:
                my_race.latitude = info["latitude"]
                my_race.longitude = info["longitude"]

            my_race.save()
