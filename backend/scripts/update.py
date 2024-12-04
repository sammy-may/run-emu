import json
from datetime import datetime

import geopy
import geopy.distance
from explorer.models import Race

SPIDER_DUMP_FILES = ["../data/rf_spider_dump.json", "../data/usu_spider_dump.json"]
WEATHER_DUMP_FILE = "../data/weather/daily_normals.json"
KM_TO_MILE = 1.60934


def build_distances(dist_strs: list[str]) -> dict:
    res = {"data": []}
    for x in dist_strs:
        name, distance = parse_distance(x)
        if name is None or distance is None:
            continue
        res["data"].append({"name": name, "distance": round(distance, 1)})
    return res


def parse_distance(x: str) -> tuple[str, float]:
    x = x.lower()
    units = "".join([ch for ch in x if not (ch.isdigit() or ch == ".")])
    if "marathon" in x:
        if "1/2" in x or "half" in x:
            name = "1/2 Marathon"
            distance = 13.1
        else:
            name = "Marathon"
            distance = 26.2
    elif "mile" in x:
        distance_str = "".join([ch for ch in x if ch.isdigit() or ch == "."])
        if not distance_str:
            distance = 1
        else:
            distance = float(distance_str)
        name = str(distance) + "M"
    elif "hr" in x:
        time_str = "".join([ch for ch in x if ch.isdigit() or ch == "."])
        if not time_str:
            distance = -1
        else:
            distance = float(time_str) * (
                100.0 / 24.0
            )  # count 24hr race as <=> 100 miler
        name = time_str + "HR"
    elif units == "k":
        distance = float("".join([ch for ch in x if ch.isdigit() or ch == "."]))
        name = str(distance) + "K"
        distance *= 1.0 / KM_TO_MILE
    elif units == "m":
        distance = float("".join([ch for ch in x if ch.isdigit() or ch == "."]))
        name = str(distance) + "M"
    else:
        name = None
        distance = None

    if name is not None:
        name = name.replace(".0", "")

    return name, distance


def parse(races: dict, weather: dict):
    for race, info in races.items():
        my_race, created = Race.objects.get_or_create(name=info["title"])

        my_race.name_url = race.replace("/", "_")
        if "distances" not in info:
            continue
        my_race.distances = build_distances(info["distances"])
        my_race.distance = len(my_race.distances["data"])
        if not my_race.distances["data"]:
            my_race.distance = -1
        else:
            my_race.distance_min = min(
                [x["distance"] for x in my_race.distances["data"]]
            )
            my_race.distance_max = max(
                [x["distance"] for x in my_race.distances["data"]]
            )
        if "," in info["date"]:
            my_race.date = datetime.strptime(info["date"], "%B %d, %Y %H:%M:%S")
        else:
            my_race.date = datetime.strptime(info["date"], "%d %b %y")
        my_race.location = info["location"]
        my_race.website = info["website"]
        my_race.register = info["register"]
        if "images" in info:
            my_race.images = {"data": info["images"]}
        else:
            my_race.images = {"data": info["imgs"]}
            my_race.images["data"] = [
                "/images/imgs/" + x.split("/")[-1] for x in my_race.images["data"]
            ]
        my_race.images["data"] = [
            x.replace(".jpg>", ".jpg") for x in my_race.images["data"]
        ]

        if "latitude" in info and "longitude" in info:
            my_race.latitude = info["latitude"]
            my_race.longitude = info["longitude"]

            nearby_stations = [
                k
                for k, v in weather.items()
                if abs(my_race.latitude - v["latitude"]) < 5
                and abs(my_race.longitude - v["longitude"]) < 5  # noqa: W503
            ]
            if not nearby_stations:
                continue
            min_distance = 99999999
            min_station = None
            for station in nearby_stations:
                distance = geopy.distance.distance(
                    (my_race.latitude, my_race.longitude),
                    (weather[station]["latitude"], weather[station]["longitude"]),
                ).miles
                if distance < min_distance:
                    min_distance = distance
                    min_station = station

            nearest_weather = weather[min_station]["weather"][str(my_race.date.month)][
                str(my_race.date.day)
            ]
            my_race.typical_high = nearest_weather["high"]
            my_race.typical_low = nearest_weather["low"]
            my_race.precip_chance = nearest_weather["rain"]
            my_race.station_name = station
            my_race.station_distance = min_distance

        my_race.save()


def run():
    with open(WEATHER_DUMP_FILE, "r") as f_in:
        weather = json.load(f_in)

    for f in SPIDER_DUMP_FILES:
        with open(f, "r") as f_in:
            races = json.load(f_in)
        parse(races, weather)
