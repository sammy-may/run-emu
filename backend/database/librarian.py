import json
import logging
import os
from datetime import datetime

import geopy
import geopy.distance
from tqdm import tqdm

from backend.utils import utils
from supabase import Client, create_client

logger = logging.getLogger(__name__)

KM_TO_MILE = 1.60934
STATE_ABBREV = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "Alberta": "AB",
    "British Columbia": "BC",
    "Manitoba": "MB",
    "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL",
    "Nova Scotia": "NS",
    "Ontario": "ON",
    "Prince Edward Island": "PE",
    "Quebec": "QC",
    "Saskatchewan": "SK",
}

COUNTRY_ABBREV = {
    "United States": "USA",
    "United States of America": "USA",
    "Canada": "CA",
}


TAGS = [
    "obstacle",
    "relay",
    "adventure",
    "trail",
    "mud",
]


def build_distances(dist_strs: list[str]) -> dict:
    res = {"data": []}
    for x in dist_strs:
        name, distance, tags = parse_distance(x)
        if not name or not distance:
            continue
        res["data"].append({"name": name, "distance": round(distance, 1), "tags": tags})
    res["data"].sort(key=lambda x: x["distance"], reverse=True)
    return res


def parse_distance(x: str) -> tuple[str, float]:

    x = x.lower().replace('"', "").replace("'", "")
    tags = []
    for tag in TAGS:
        if tag in x:
            tags.append(tag)
            x = x.replace(tag, "")

    x = x.replace("race", "").replace("run", "").replace("fun", "").replace("ultra", "")

    x = x.strip()
    units = "".join([ch for ch in x if not (ch.isdigit() or ch.isspace() or ch == ".")])
    distance_str = "".join([ch for ch in x if ch.isdigit() or ch == "."])
    if "marathon" in x or "mar." in x:
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
    elif not distance_str:
        name = None
        distance = None
    elif "hr" in x or "hour" in x or units == "h":
        time_str = "".join([ch for ch in x if ch.isdigit() or ch == "."])
        if not time_str:
            distance = -1
        else:
            distance = float(time_str) * (
                100.0 / 24.0
            )  # count 24hr race as <=> 100 miler
        name = time_str + "HR"
    elif units == "k" or units == "km":
        distance = float("".join([ch for ch in x if ch.isdigit() or ch == "."]))
        name = str(distance) + "K"
        distance *= 1.0 / KM_TO_MILE
    elif units == "m" or units == "" or units == "mi":
        distance = float("".join([ch for ch in x if ch.isdigit() or ch == "."]))
        name = str(distance) + "M"
    else:
        name = None
        distance = None

    if name is not None:
        name = name.replace(".0", "")

    return name, distance, tags


class Librarian:
    URL: str = os.environ.get("SUPABASE_URL")
    KEY: str = os.environ.get("SUPABASE_SERVICE_KEY")
    TABLE: str = "Races"

    def __init__(
        self, sources: list[str], weather: str, output_dir: str, dry_run: bool
    ):
        self.client: Client = create_client(self.URL, self.KEY)
        self.sources = sources
        self.output_dir = output_dir
        self.dry_run = dry_run

        with open(weather, "r") as f_in:
            self.weather = json.load(f_in)

        self.races = {}
        self.idx = 0

        if not os.path.exists(self.output_dir):
            os.mkdir(self.output_dir)

    @staticmethod
    def format_location(city: str, state: str, country: str) -> str:
        if city and state:
            if state.strip().title() in STATE_ABBREV:
                return "{:s}, {:s}".format(city, STATE_ABBREV[state.strip().title()])
            else:
                return "{:s}, {:s}".format(city, state)
        else:
            res = ""
            if city:
                res += ", " + city
            if state:
                res += ", " + state
            if res and country.strip().title() in COUNTRY_ABBREV:
                res += ", " + COUNTRY_ABBREV[country.strip().title()]
            elif country:
                res += ", " + country
            if res and len(res) >= 2:
                res = res[2:]
            return res

    def build_database(self):
        logger.info(
            "Building database by merging the following {:d} '.json' files.".format(
                len(self.sources)
            )
        )
        for src in self.sources:
            self.parse_dump(src)

        with open(self.output_dir + "/merged_races.json", "w") as f_out:
            json.dump(self.races, f_out, sort_keys=True, indent=4)

        if not self.dry_run:
            logger.info("Upserting all entries to supabase.")
            resp = (
                self.client.table(self.TABLE)
                .upsert([v for k, v in self.races.items()], on_conflict="name_url")
                .execute()
            )
            return resp

        return None

    def extract_weather(self, race, date: datetime):
        if not ("latitude" in race and "longitude" in race):
            return {}

        lat, lon = race["latitude"], race["longitude"]

        nearby_weather_stations = [
            k
            for k, v in self.weather.items()
            if (abs(lat - v["latitude"]) < 2 and abs(lon - v["longitude"]) < 2)
        ]
        if not nearby_weather_stations:
            logger.warning(
                "No nearby weather stations found for race '{:s}', with lat/lon of {:.2f}/{:.2f}".format(
                    race["title"], lat, lon
                )
            )
            return {}

        min_distance = 99999999
        min_station = None
        for ws in nearby_weather_stations:
            distance = geopy.distance.distance(
                (lat, lon),
                (self.weather[ws]["latitude"], self.weather[ws]["longitude"]),
            ).miles
            if distance < min_distance:
                min_distance = distance
                min_station = ws

        if not min_station:
            logger.warning(
                "No nearby weather stations found for race '{:s}', with lat/lon of {:.2f}/{:.2f}".format(
                    race["title"], lat, lon
                )
            )
            return {}

        res = self.weather[min_station]["weather"][str(date.month)][str(date.day)]
        race_weather = {
            "typical_high": res["high"],
            "typical_low": res["low"],
            "precip_chance": res["rain"],
            "station_name": min_station,
            "station_distance": min_distance,
            "station_lat": self.weather[min_station]["latitude"],
            "station_lng": self.weather[min_station]["longitude"],
        }
        return race_weather

    @staticmethod
    def create_race_id(race: dict, date: datetime) -> str:
        return utils.slugify(
            "-".join(
                [
                    utils.slugify(race["title"]),
                    race["city"],
                    str(date.month),
                    str(date.year),
                ]
            )
        )

    def parse_dump(self, dump_file: str):
        with open(dump_file, "r") as f_in:
            results = json.load(f_in)

        logger.info(
            "Extracting up to {:d} total races from file '{:s}'.".format(
                len(results), dump_file
            )
        )

        for race, info in tqdm(results.items()):
            # race = utils.slugify(race.replace("&amp;", "and"))
            if race == "test":
                continue
            info["title"] = info["title"].replace("&amp;", "and")
            self.idx += 1
            date = None
            if "date" not in info:
                continue
            elif "," in info["date"]:
                try:
                    date = datetime.strptime(info["date"], "%B %d, %Y %H:%M:%S")
                except Exception as err:  # noqa: F841
                    try:
                        date = datetime.strptime(info["date"], "%b %d, %Y")
                    except Exception as err:  # noqa: F841
                        try:
                            date = datetime.strptime(info["date"], "%B %d, %Y")
                        except Exception as err:  # noqa: F841
                            pass
            else:
                date = datetime.strptime(info["date"], "%d %b %y")
            race_weather = self.extract_weather(info, date)
            if not ("latitude" in info and "longitude" in info):
                continue
            if "city" not in info:
                info["city"] = ""
            if "state" not in info:
                info["state"] = ""
            if info["state"] == "":
                locs = info["location"].split(",")
                if len(locs) == 2:
                    state = locs[1].strip().lower()
                    for full_state, abbrev in STATE_ABBREV.items():
                        if state == abbrev.lower():
                            info["state"] = full_state
            if "register" not in info and "website" in info:
                info["register"] = info["website"]
            if "website" not in info and "register" in info:
                info["website"] = info["register"]

            try:
                distances = build_distances(info["distances"])
                if not distances["data"]:
                    logger.debug(
                        "Skipping race {:s}, issue extracting valid distances from '{:s}'.".format(
                            race, str(info["distances"])
                        )
                    )
                    continue

                race_id = self.create_race_id(info, date)
                if race_id in self.races:
                    logger.debug("Duplicate: '{:s}'".format(race_id))
                self.races[race_id] = {
                    "name": info["title"],
                    "name_url": race_id,
                    "city": info["city"],
                    "state": info["state"],
                    "country": info["country"],
                    "latitude": info["latitude"],
                    "longitude": info["longitude"],
                    "register": info["register"],
                    "website": info["website"],
                    "date": date.isoformat(),
                    "distances": distances,
                    "distance": len(distances["data"]),
                    "distance_min": min([x["distance"] for x in distances["data"]]),
                    "distance_max": max([x["distance"] for x in distances["data"]]),
                    "location": self.format_location(
                        info["city"], info["state"], info["country"]
                    ),
                }
                for k, v in race_weather.items():
                    self.races[race_id][k] = v

            except Exception as err:
                logger.error("Problem with race '{:s}' : {:s}".format(race, str(err)))
