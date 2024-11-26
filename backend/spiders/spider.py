import json
import logging

import geopy
import geopy.geocoders
import pandas as pd
import requests

logger = logging.getLogger(__name__)


class Spider:
    DIRECTORY = None

    def __init__(self, urls: list[str], **kwargs):
        self.urls = urls
        self.races = {}

        self.geo_locator = geopy.geocoders.Nominatim(user_agent="my_geocoder")

        with open(self.DIRECTORY, "r") as f_in:
            self.directory = json.load(f_in)

    def load_url(self, url: str):
        """
        First check directory to see if website is cached, otherwise request (and save in cache for next time).
        """
        raw_html = None
        if url in self.directory:  # already in cache, just load
            logger.info(
                "Loading page '{:s}' from directory file '{:s}'.".format(
                    url, self.directory[url]
                )
            )
            raw_html = pd.read_parquet(self.directory[url])["raw_html"][0]

        else:  # not in cache, request from src and then store in cache
            logger.info("Requesting page '{:s}' from src.".format(url))
            response = requests.get(url)
            raw_html = response.content

            df = pd.DataFrame({"raw_html": raw_html}, index=[0])
            f_out = "data/pages/usu/{:s}.parquet".format(self.unslash(url))

            logger.info("Saving page to directory file '{:s}'.".format(f_out))

            df.to_parquet(f_out)
            self.directory[url] = f_out
            with open(self.DIRECTORY, "w") as f_out:
                json.dump(self.directory, f_out, indent=4)

        return raw_html

    def save_result(self, race_name: str, race: dict):
        """
        Add race dict to results if not already in.
        """
        if race_name not in self.races:
            logger.info("Adding race '{:s}'".format(race_name))
            self.races[race_name] = race
            logger.info(race)
            with open(self.f_out, "w") as f_out:
                json.dump(self.races, f_out, indent=4)
        else:
            logger.info("Duplicate entry of '{:s}'".format(race_name))

    @staticmethod
    def unslash(x: str) -> str:
        return x.replace("/", "SLASH")

    @staticmethod
    def reslash(x: str) -> str:
        return x.replace("SLASH", "/")

    def enumerate_pages(self):
        raise NotImplementedError("Must be implemented by derived spiders.")

    def crawl(self):
        raise NotImplementedError("Must be implemented by derived spiders.")
