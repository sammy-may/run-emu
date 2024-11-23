import json
import logging

import geopy
import geopy.geocoders
import pandas as pd
import parse
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

logger = logging.getLogger(__name__)

DIRECTORY = "data/directory.json"


class Spider:
    def __init__(self, urls: list[str], **kwargs):
        self.urls = urls
        self.races = {}
        self.f_out = "data/spider_dump.json"

        self.geo_locator = geopy.geocoders.Nominatim(user_agent="my_geocoder")

        with open(DIRECTORY, "r") as f_in:
            self.directory = json.load(f_in)

    @staticmethod
    def unslash(x: str) -> str:
        return x.replace("/", "SLASH")

    @staticmethod
    def reslash(x: str) -> str:
        return x.replace("SLASH", "/")

    def crawl(self):
        for i in tqdm(range(5938, 10000)):
            num_string = "{:04d}".format(i)
            url = self.urls.replace("XXXX", num_string)

            if url in self.directory:
                logger.info(
                    "Loading page '{:s}' from directory file '{:s}'.".format(
                        url, self.directory[url]
                    )
                )
                raw_html = pd.read_parquet(self.directory[url])["raw_html"][0]

            else:
                logger.info("Requesting page '{:s}' from src.".format(url))
                response = requests.get(url)
                raw_html = response.content

                df = pd.DataFrame({"raw_html": raw_html}, index=[0])
                f_out = "data/pages/usu/{:s}.parquet".format(self.unslash(url))

                logger.info("Saving page to directory file '{:s}'.".format(f_out))

                df.to_parquet(f_out)
                self.directory[url] = f_out
                with open(DIRECTORY, "w") as f_out:
                    json.dump(self.directory, f_out, indent=4)

            soup = BeautifulSoup(raw_html, "html.parser")
            lines = str(soup).split("\n")

            imgs = []
            race = {}
            for idx, line in enumerate(lines):
                if ".jpg" in line:
                    if "event_banner" in line:
                        img = parse.parse(
                            "src={}", [x for x in line.split() if "src=" in x][0]
                        )
                        if not img:
                            continue
                        img = img[0].replace("'", "").replace('"', "").strip()
                        imgs.append(img)
                    if "li" in line and "data-src" in line:
                        img = parse.parse(
                            "data-src={}",
                            [x for x in line.split() if "data-src=" in x][0],
                        )
                        if not img:
                            continue
                        img = img[0].replace("'", "").replace('"', "").strip()
                        imgs.append(img)

                if not ("ace_btn" in line and "addcalevent" in line):
                    continue
                else:
                    try:
                        info = "\n".join(lines[idx : idx + 15])
                        info = (
                            info[info.find("({") : info.find(")};")]
                            .strip()[1:-2]
                            .replace("'data'", '"data"')
                        )
                        info = "\n".join(
                            [
                                x
                                for x in info.split("\n")
                                if not ("'apps':" in x or "'ics':" in x)
                            ]
                        ).replace("},", "}")
                        info = json.loads(info)["data"]
                        race["title"] = info["title"]
                        title, dists, location, register, website = info["desc"].split(
                            "\n"
                        )
                        dists = [x.strip() for x in dists.split(",")]
                        race["distances"] = dists
                        race["location"] = info["location"]

                        loc = self.geo_locator.geocode(race["location"])
                        if loc:
                            race["latitude"] = loc.latitude
                            race["longitude"] = loc.longitude

                        race["register"] = info["url"]
                        race["date"] = info["time"]["start"]
                        race["website"] = website.split(" ")[-1]
                        race_name = (
                            race["title"]
                            .replace("'", "")
                            .replace('"', "")
                            .replace(" ", "_")
                        )

                    except:  # noqa: E722
                        logger.warning("Skipping")

            race["images"] = [x.replace(".jpg>", ".jpg") for x in imgs]
            if race_name not in self.races:
                logger.info("Adding race '{:s}'".format(race_name))
                self.races[race_name] = race
                logger.info(race)
                with open(self.f_out, "w") as f_out:
                    json.dump(self.races, f_out, indent=4)
            else:
                logger.info("Duplicate entry of '{:s}'".format(race_name))
