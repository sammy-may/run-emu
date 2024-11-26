import json
import logging

import parse
from bs4 import BeautifulSoup
from tqdm import tqdm

from backend.spiders.spider import Spider

logger = logging.getLogger(__name__)


class USUSpider(Spider):
    DIRECTORY = "data/usu_directory.json"

    def __init__(self, urls: list[str], **kwargs):
        super().__init__(urls, **kwargs)
        self.f_out = "data/usu_spider_dump.json"

    def enumerate_pages(self):
        base = self.urls[0]
        self.urls = [base.replace("XXXX", "{:04d}".format(i)) for i in range(0, 10000)]

    def crawl(self):
        self.enumerate_pages()
        for url in tqdm(self.urls):
            raw_html = self.load_url(url)
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
            self.save_result(race_name, race)
