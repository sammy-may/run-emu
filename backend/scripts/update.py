import json
from datetime import datetime

from explorer.models import Race

SPIDER_DUMP_FILE = "../data/spider_dump.json"


def run():
    with open(SPIDER_DUMP_FILE, "r") as f_in:
        races = json.load(f_in)
        for race, info in races.items():
            print(race, info)

            my_race = Race(
                name=info["title"],
                distance=len(info["distances"]),
                date=datetime.strptime(info["date"], "%B %d, %Y %H:%M:%S"),
                location=info["location"],
            )

            my_race.save()
