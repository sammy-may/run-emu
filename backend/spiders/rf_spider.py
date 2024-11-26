import logging

import parse
from bs4 import BeautifulSoup

from backend.spiders.spider import Spider

logger = logging.getLogger(__name__)


class RFSpider(Spider):
    DIRECTORY = "data/rf_directory.json"
    BASE_URL = "https://race-find.com/us/races?state=STATENUM&race-page=PAGENUM"

    PATTERN_N_ENTRIES = '{junk}<p class="summary">Showing <b>{cur}</b> of <b>{total}</b> items</p><table><thead>'
    PATTERN_TR = '<tr data-geo="{location}" data-key="{key}"><td>{num}</td><td></td><td>{date}</td><td><a href="{link}" target="_blank">{title}</a></td><td>{events}</td><td>{trailing_junk}'

    def __init__(self, urls: list[str], **kwargs):
        self.f_out = "data/rf_spider_dump.json"
        super().__init__(urls, **kwargs)

    def enumerate_pages(self):
        self.urls = []
        for i in range(1, 51):
            skip = False
            state_url = self.BASE_URL.replace("STATENUM", str(i)).replace(
                "PAGENUM", "1"
            )
            raw_html = self.load_url(state_url)
            soup = BeautifulSoup(raw_html, "html.parser")
            lines = str(soup).split("\n")

            for idx, line in enumerate(lines):
                if '<p class="summary">' in line:
                    results = parse.parse(self.PATTERN_N_ENTRIES, line)
                    if not results:
                        logger.info(
                            "Could not parse total number of results for url '{:s}', skipping.".format(
                                state_url
                            )
                        )
                        skip = True
                    else:
                        n_total = int(results["total"].replace("+", ""))
                        n_pages = (n_total // 15) + 1
                        for j in range(1, n_pages + 1):
                            self.urls.append(
                                self.BASE_URL.replace("STATENUM", str(i)).replace(
                                    "PAGENUM", str(j)
                                )
                            )
                    break
            if skip:
                continue

    def crawl(self):
        self.enumerate_pages()
        for url in self.urls:
            raw_html = self.load_url(url)
            soup = BeautifulSoup(raw_html, "html.parser")
            lines = str(soup).split("\n")

            for idx, line in enumerate(lines):
                imgs = []
                race = {}

                if not all([x in line for x in ["tr", "data-geo", "data-key"]]):
                    continue
                content = parse.parse(self.PATTERN_TR, line)
                if not content:
                    logger.info("Issue parsing line '{:s}', skipping.".format(line))
                    continue
                race["title"] = content["title"]
                race_name = self.strip_name(race["title"])

                if self.reuse:
                    if race_name in self.races:
                        logger.info(
                            "Option 'reuse' selected, skipping race '{:s}'.".format(
                                race_name
                            )
                        )
                        continue

                race["distances"] = [x for x in content["events"].split("/")]
                race["location"] = content["location"].replace(", USA", "")

                loc = self.get_location(race["location"])
                if loc:
                    race["latitude"] = loc.latitude
                    race["longitude"] = loc.longitude

                race["register"] = content["link"]
                race["website"] = content["link"]
                race["date"] = content["date"]
                race["imgs"] = imgs

                race["imgs"] = self.get_site_imgs(race["website"], race_name)

                self.save_result(race_name, race)
