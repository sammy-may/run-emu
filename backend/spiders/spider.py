import copy
import json
import logging
import os
from datetime import datetime
from threading import Lock
from urllib.parse import urljoin

import geocoder
import pandas as pd
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)
lock = Lock()


class Spider:
    DIRECTORY = None
    IMG_DIR = "data/imgs/"
    RACE_FORMAT = {
        "name": "",
        "name_url": "",
        "city": "",
        "state": "",
        "country": "",
        "day": -1,
        "month": -1,
        "year": -1,
        "website": "",
        "register": "",
        "distances": [],
        "tags": [],
    }

    def __init__(self, urls: list[str], **kwargs):
        self.urls = urls
        self.races = {}
        self.reuse = kwargs.get("reuse", False)
        self.f_geocode_map = kwargs.get("geocode_map", None)
        self.f_reverse_geocode_map = kwargs.get("reverse_geocode_map", None)
        self.load_geocode_maps()
        self.session = requests.Session()

        with open(self.DIRECTORY, "r") as f_in:
            self.directory = json.load(f_in)

        if self.reuse:
            with open(self.f_out, "r") as f_in:
                self.races = json.load(f_in)

    @staticmethod
    def empty_race():
        return copy.deepcopy(Spider.RACE_FORMAT)

    def load_geocode_maps(self):
        with open(self.f_geocode_map, "r") as f_in:
            self.geocode_map = json.load(f_in)
        with open(self.f_reverse_geocode_map, "r") as f_in:
            self.reverse_geocode_map = json.load(f_in)

    def geocode(self, location):
        if location in self.geocode_map:
            return self.geocode_map[location]

        try:
            resp = geocoder.mapbox(location).json
            if "lat" in resp and "lng" in resp:
                result = {"lat": resp["lat"], "lng": resp["lng"]}
                self.save_geocode(location, result)
            else:
                logger.warning("Issue getting location '{:s}'.".format(location))
        except Exception as err:  # noqa: F841
            resp = None
        return resp

    def save_geocode(self, location, resp):
        with open(self.f_geocode_map, "r") as f_in:
            self.geocode_map = json.load(f_in)
        self.geocode_map[location] = resp
        with lock:
            with open(self.f_geocode_map, "w") as f_out:
                json.dump(self.geocode_map, f_out, indent=4)

    def reverse_geocode(self, latlng):
        if str(latlng) in self.reverse_geocode_map:
            return self.reverse_geocode_map[str(latlng)]

        try:
            resp = geocoder.mapbox(latlng, method="reverse").json
            self.save_reverse_geocode(latlng, resp)
        except Exception as err:  # noqa: F841
            resp = None
        return None

    def save_reverse_geocode(self, latlng, resp):
        result = {}
        for field in ["city", "state", "country", "lat", "lng"]:
            if field in resp:
                result[field] = resp[field]
        with open(self.f_reverse_geocode_map, "r") as f_in:
            self.reverse_geocode_map = json.load(f_in)
        self.reverse_geocode_map[str(latlng)] = result
        with lock:
            with open(self.f_reverse_geocode_map, "w") as f_out:
                json.dump(self.reverse_geocode_map, f_out, indent=4)

    def get_location(self, location: str, race: dict):
        loc = None
        try:
            loc = self.geocode(location)
        except Exception as e:
            logger.warning(
                "Issue getting location '{:s}' : {:s}.".format(location, str(e))
            )

        if loc is not None:
            race["latitude"] = round(float(loc["lat"]), 2)
            race["longitude"] = round(float(loc["lng"]), 2)
            loc_info = self.get_location_info(race["latitude"], race["longitude"])
            for k, v in loc_info.items():
                if v:
                    race[k] = v

        if "city" not in race or not race["city"]:
            loc_items = [x.strip() for x in race["location"].split(",")]
            if len(loc_items) >= 2:
                race["city"] = loc_items[0]

        return

    def get_location_info(self, latitude: float, longitude: float):
        res = {}
        try:
            rvg = self.reverse_geocode((latitude, longitude))
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

    def load_url(self, url: str, cache: bool = True, read_from_cache: int = -1):
        """
        First check directory to see if website is cached, otherwise request (and save in cache for next time).
        If `read_from_cache` is greater than 0, re-request the page from src if it has been more than `read_from_cache` days since it was requested.
        """
        raw_html = None

        need_reload = False
        if read_from_cache > 0 and url in self.directory:
            days_since_cached = (
                datetime.today()
                - datetime.fromtimestamp(os.path.getmtime(self.directory[url]))
            ).days
            if read_from_cache <= days_since_cached:
                need_reload = True

        if read_from_cache < 0:
            need_reload = True

        if not need_reload and url in self.directory:  # already in cache, just load
            logger.debug(
                "Loading page '{:s}' from directory file '{:s}'.".format(
                    url, self.directory[url]
                )
            )
            raw_html = pd.read_parquet(self.directory[url])["raw_html"][0]

        else:  # not in cache, request from src and then store in cache
            logger.info("Requesting page '{:s}' from src.".format(url))
            try:
                response = self.session.get(url)
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
        return []
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
                img_data = self.session.get(img_url).content
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
