import logging
import random
import re

import parse
from bs4 import BeautifulSoup
from joblib import Parallel, delayed
from tqdm import tqdm

from backend.spiders.spider import Spider
from backend.utils import utils

logger = logging.getLogger(__name__)

STATE_ABBREVS = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
]


class USASpider(Spider):
    DIRECTORY = "data/usa_directory.json"

    REQUEST_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Referer": "https://runningintheusa.com",
    }

    BASE_URL = (
        "https://runningintheusa.com/race/list/STATE_ABBREV/upcoming/page-PAGE_NUM"
    )
    N_PER_PAGE = 20

    PATTERN_N_ENTRIES = "{junk}1 to 20 of {n_total}</a></li>"
    PATTERN_DATE = '<td rowspan="{num}" style="text-decoration:inherit;"><div style="color:black"><div style="font-weight:bold">{date}</div><div style="padding-left:10px">{day}</div></div>'
    PATTERN_RACE = '<td style="text-decoration:inherit;"><div><b>{title}</b></div><div style="padding-left:10px">{distances}</div><a href="{website}" style="text-decoration:none;"><div class="link-hightlight" style="padding:2px 10px 2px 10px; background-color:inherit"><span class="glyphicons glyphicons-info-sign glyphicon-adjust-menu"></span>More Information</div></a>{signup}'
    PATTERN_LOCATION = (
        '<td rowspan="{num}"><div><small></small></div><b>{location}</b><div>{end}'
    )

    def __init__(self, urls: list[str], **kwargs):
        self.f_out = "data/usa_spider_dump.json"
        super().__init__(urls, **kwargs)

    def enumerate_pages(self):
        self.urls = []
        for abbrev in STATE_ABBREVS:
            state_url = self.BASE_URL.replace("STATE_ABBREV", abbrev.lower()).replace(
                "PAGE_NUM", "1"
            )

            raw_html = self.load_url(state_url, cache=True, read_from_cache=-1)
            soup = BeautifulSoup(raw_html, "html.parser")
            lines = str(soup).split("\n")

            logger.info(abbrev)

            for idx, line in enumerate(lines):
                print(line)
                if "span" in line and "glyphicon-adjust-btn-group-sm" in line:
                    results = parse.parse(self.PATTERN_N_ENTRIES, line)
                    if not results:
                        continue
                    n_total = int(
                        results["n_total"]
                        .replace("(limited to 1000)", "")
                        .replace("**", "")
                        .strip()
                    )
                    n_total
                    n_pages = (n_total // self.N_PER_PAGE) + 1
                    for j in range(1, n_pages + 1):
                        self.urls.append(
                            self.BASE_URL.replace(
                                "STATE_ABBREV", abbrev.lower()
                            ).replace("PAGE_NUM", str(j))
                        )
                    logger.info(
                        "For state '{:s}', found {:d} total results over {:d} pages.".format(
                            abbrev, n_total, n_pages
                        )
                    )
        self.urls = sorted(list(set(self.urls)))
        random.shuffle(self.urls)

    @staticmethod
    def extract_tds(content: list[str]):
        tds = []

        start_td = False
        end_td = False
        td_content = ""
        for x in content:
            if "<td" in x:
                start_td = True
            if "</td>" in x:
                end_td = True
                td_content += x.replace("</td>", "").strip()
            if start_td and not end_td:
                td_content += x.strip()
            if end_td:
                tds.append(td_content)
                start_td = False
                end_td = False
                td_content = ""

        return tds

    def handle_redirects(self, url: str) -> str:
        n_tries = 0
        response = None
        while n_tries <= 2 and response is None:
            n_tries += 1
            try:
                response = self.session.head(
                    url,
                    allow_redirects=True,
                    headers=USASpider.REQUEST_HEADERS,
                    timeout=n_tries**2,
                )
            except Exception as err:  # noqa: F841
                pass

        if n_tries >= 3:
            logger.warning("Problem with url '{:s}'.".format(url))
            response = None

        if response is not None and hasattr(response, "url") and response.url:
            return response.url
        else:
            return url

    def crawl(self):
        self.enumerate_pages()

        chunk_size = 100000
        for i in tqdm(range(0, len(self.urls), chunk_size)):
            races = Parallel(n_jobs=8)(
                delayed(self.process_url)(url)
                for url in (self.urls[i : i + chunk_size])
            )
            for subraces in races:
                for race in subraces:
                    if race:
                        self.save_result(race["race_id"], race)

        # for url in tqdm(self.urls):
        #    race = self.process_url(url)
        #    if race:
        #        self.save_result(race["race_id"], race)

    def process_url(self, url):
        print("Processing: '{:s}'.".format(url))
        raw_html = self.load_url(url)

        if not raw_html:
            return

        soup = BeautifulSoup(raw_html, "html.parser")
        lines = str(soup).split("\n")

        races = []

        for idx, line in enumerate(lines):
            if '<tr style="background-color:inherit">' in line:
                race = self.empty_race()

                end_idx = None
                curr_idx = idx
                while not end_idx:
                    curr_line = lines[curr_idx]
                    curr_idx += 1
                    if "</tr>" in curr_line:
                        end_idx = curr_idx

                content = lines[idx:end_idx]
                tds = self.extract_tds(content)

                if len(tds) != 5:
                    # if "Boston Marathon Qualifier" in " ".join(tds):
                    #    race["bq"] = True
                    # else:
                    logger.debug(
                        "Could not extract race data table entries from content: '{:s}'. Skipping".format(
                            "\n".join(content)
                        )
                    )
                    continue

                id_info, date_info, race_info, location_info, options_info = tds

                date = parse.parse(self.PATTERN_DATE, date_info)
                if date and "date" in date:
                    race["date"] = date["date"]
                    if date["num"] == "2":
                        curr_idx = end_idx + 1
                        end_idx = None
                        while not end_idx:
                            curr_line = lines[curr_idx]
                            curr_idx += 1
                            if "</tr>" in curr_line:
                                end_idx = curr_idx
                        content = " ".join(lines[idx:end_idx]).lower()
                        if "women only" in content:
                            race["tags"].append("women_only")
                        if "boston marathon qualifier" in content:
                            race["tags"].append("bq")

                details = parse.parse(self.PATTERN_RACE, race_info)
                if details:
                    if "title" in details:
                        race["title"] = details["title"]
                        race_name = utils.slugify(race["title"])
                        # if race_name in self.races:
                        #    logger.info(
                        #        "Already have entry for race '{:s}' - skipping.".format(
                        #            race["title"]
                        #        )
                        #    )
                        #    continue

                    if "distances" in details:
                        race["distances"] = [
                            x.strip()
                            for x in re.split(
                                r"[,;|]",  # splits by any of , ; |
                                details["distances"],
                            )
                        ]

                    if "signup" in details:
                        url = None
                        cont = details["signup"]
                        if "RunSignUpLogo" in cont:
                            match = parse.parse('{begin}href="{url}"{end}', cont)
                            if match and "url" in match:
                                url = match["url"]
                        if url:
                            race["register"] = "https://runningintheusa.com" + url

                    if "website" in details:
                        web_raw_html = self.load_url(
                            "https://runningintheusa.com" + details["website"]
                        )
                        if not web_raw_html:
                            continue

                        web_soup = BeautifulSoup(web_raw_html, "html.parser")
                        web_lines = str(web_soup).split("\n")

                        found = False
                        url = None
                        for idx, line in enumerate(web_lines):
                            if "Race" in line and (
                                "Web" in line or "Information" in line
                            ):
                                curr_idx = 0
                                curr_line = line
                                while not found and curr_idx < idx and curr_idx < 10:
                                    if "href" in curr_line:
                                        match = parse.parse(
                                            '{begin}href="{url}"{end}', curr_line
                                        )
                                        if match and "url" in match:
                                            if not (
                                                "/about/" in match["url"]
                                                or "/more/" in match["url"]
                                            ):
                                                url = match["url"]
                                                found = True
                                    curr_idx += 1
                                    curr_line = web_lines[idx - curr_idx]

                        if found and url:
                            race["website"] = "https://runningintheusa.com" + url
                else:
                    logger.info(
                        "Could not extract from: '{:s}'.".format(str(race_info))
                    )

                loc = parse.parse(self.PATTERN_LOCATION, location_info)
                if loc is not None and "location" in loc:
                    race["location"] = loc["location"]
                    self.get_location(race["location"], race)

                for field in ["website", "register"]:
                    if field in race:
                        if "redirector" in race[field]:
                            race[field] = self.handle_redirects(race[field])

                if race and "title" in race and "date" in race and "city" in race:
                    race["race_id"] = (
                        race_name + "-" + str(race["date"]) + "-" + race["city"].lower()
                    )
                    races.append(race)
                    # self.save_result(race_name + "-" + str(race["date"]) + "-" + race["city"].lower(), race)
                else:
                    logger.info("Skipping : {:s}.".format(str(race)))

        return races
