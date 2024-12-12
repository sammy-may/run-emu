import json
import logging
import os
from urllib.parse import urljoin

import geopy
import geopy.geocoders
import pandas as pd
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


class Spider:
    DIRECTORY = None
    IMG_DIR = "data/imgs/"

    def __init__(self, urls: list[str], **kwargs):
        self.urls = urls
        self.races = {}
        self.reuse = kwargs.get("reuse", False)

        self.geo_locator = geopy.geocoders.Nominatim(user_agent="my_geocoder")

        with open(self.DIRECTORY, "r") as f_in:
            self.directory = json.load(f_in)

        if self.reuse:
            with open(self.f_out, "r") as f_in:
                self.races = json.load(f_in)

    def get_location(self, location: str):
        loc = None
        try:
            loc = self.geo_locator.geocode(location)
        except Exception as e:
            logger.debug(
                "Issue getting location '{:s}' : {:s}.".format(location, str(e))
            )
            pass
        return loc

    def get_location_info(self, latitude: float, longitude: float):
        res = {}
        try:
            rvg = self.geo_locator.reverse(
                "{:s}, {:s}".format(str(latitude), str(longitude)), language="en"
            ).raw["address"]
            for key in ["city", "state", "country"]:
                if key in rvg:
                    res[key] = rvg[key]
        except Exception as e:
            logger.debug(
                "Issue reverse lookup on {:s}, {:s} : {:s}.".format(
                    str(latitude), str(longitude), str(e)
                )
            )
            pass
        return res

    def load_url(self, url: str, cache: bool = True):
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
            try:
                response = requests.get(url)
                raw_html = response.content
            except Exception as err:
                logger.warning(
                    "Problem with website '{:s}' : {:s}.".format(url, str(err))
                )
                raw_html = None

            if cache:
                df = pd.DataFrame({"raw_html": raw_html}, index=[0])
                f_out = "data/pages/usu/{:s}.parquet".format(self.unslash(url))

                logger.info("Saving page to directory file '{:s}'.".format(f_out))

                df.to_parquet(f_out)
                self.directory[url] = f_out
                with open(self.DIRECTORY, "w") as f_out:
                    json.dump(self.directory, f_out, indent=4)

        return raw_html

    def get_site_imgs(self, website: str, save_prefix: str):
        raw_html = self.load_url(website, cache=False)
        if not raw_html:
            return []
        soup = BeautifulSoup(raw_html, "html.parser")

        imgs = []
        img_tags = soup.find_all("img")
        for idx, img in enumerate(img_tags):
            if idx >= 3:
                continue
            img_url = img.get("src")
            if not img_url:
                continue
            if any(
                [
                    x in img_url.lower()
                    for x in ["logo", "passport", "cookie", "sponsor"]
                ]
            ):
                continue
            img_url = urljoin(website, img_url)

            try:
                img_data = requests.get(img_url).content
                save_name = os.path.abspath(
                    os.path.join(
                        self.IMG_DIR, "{:s}_img_{:d}.jpg".format(save_prefix, idx + 1)
                    )
                )

                with open(save_name, "wb") as f_out:
                    f_out.write(img_data)

                imgs.append(save_name)
                logger.info(
                    "Saved local copy of img '{:s}' to path '{:s}'".format(
                        img_url, save_name
                    )
                )

            except Exception as e:
                logger.warning(
                    "Failed to download img '{:s}' : {:s}.".format(img_url, str(e))
                )

        return imgs

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

    @staticmethod
    def strip_name(x: str) -> str:
        return x.replace("'", "").replace('"', "").replace(" ", "_").replace("/", "_")

    def enumerate_pages(self):
        raise NotImplementedError("Must be implemented by derived spiders.")

    def crawl(self):
        raise NotImplementedError("Must be implemented by derived spiders.")
