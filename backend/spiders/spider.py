import json
import logging

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


class Spider:
    def __init__(self, urls: list[str], **kwargs):
        self.urls = urls
        self.races = {}
        self.f_out = "data/spider_dump.json"

    def crawl(self):
        for i in range(10000):
            num_string = "{:04d}".format(i)
            url = self.urls.replace("XXXX", num_string)

            response = requests.get(url)
            soup = BeautifulSoup(response.content, "html.parser")

            lines = str(soup).split("\n")
            for idx, line in enumerate(lines):
                if not ("ace_btn" in line and "addcalevent" in line):
                    continue
                else:
                    race = {}
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
                    try:
                        race["title"] = info["title"]
                        title, dists, location, register, website = info["desc"].split(
                            "\n"
                        )
                        dists = [x.strip() for x in dists.split(",")]
                        race["distances"] = dists
                        race["location"] = info["location"]
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
                        logger.warning("Trouble with this json")
                        logger.warning(info)
                    if race_name not in self.races:
                        logger.info("Adding race '{:s}'".format(race_name))
                        self.races[race_name] = race
                        logger.info(race)
                        with open(self.f_out, "w") as f_out:
                            json.dump(self.races, f_out, indent=4)
                    else:
                        logger.info("Duplicate entry of '{:s}'".format(race_name))
