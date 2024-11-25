import glob
import json
import logging

import pandas
from tqdm import tqdm

logger = logging.getLogger(__name__)


class WeatherStationExplorer:
    FIELDS = {
        "high": "DLY-TMAX-NORMAL",
        "low": "DLY-TMIN-NORMAL",
        "rain": "DLY-PRCP-PCTALL-GE025HI",
    }

    def __init__(self, dir: str, **kwargs):
        self.dir = dir
        self.get_files()
        self.res = {}
        self.f_out = "data/weather/daily_normals.json"

    def get_files(self):
        self.files = glob.glob(self.dir + "/*.csv")
        logger.info(
            "Found {:d} csv files inside directory '{:s}'.".format(
                len(self.files), self.dir
            )
        )

    def parse_file(self, df: pandas.DataFrame):
        station_res = {"weather": {}}
        station_res["latitude"], station_res["longitude"] = (
            df["LATITUDE"][0],
            df["LONGITUDE"][0],
        )
        station_res["elevation"] = df["ELEVATION"][0]
        station_res["station"] = df["STATION"][0]
        station_res["location"] = df["NAME"][0]

        for index, row in df.iterrows():
            high = row[self.FIELDS["high"]]
            low = row[self.FIELDS["low"]]
            rain = row[self.FIELDS["rain"]]

            month = row["month"]
            day = row["day"]

            if month not in station_res["weather"]:
                station_res["weather"][month] = {}
            if day not in station_res["weather"][month]:
                station_res["weather"][month][day] = {
                    "high": high,
                    "low": low,
                    "rain": rain,
                }
                if day == 1:
                    logger.debug(
                        "Station '{:s}', month {:d}, day 1 : high ({:.1f}), low ({:.1f}), rain ({:.1f})".format(
                            station_res["station"], month, high, low, rain
                        )
                    )

        return station_res

    def parse(self):
        for f in tqdm(self.files):
            skip = False
            df = pandas.read_csv(f)
            for k, field in self.FIELDS.items():
                if field not in df.columns:
                    logger.debug(
                        "File '{:s}' missing field '{:s}', skipping.".format(f, field)
                    )
                    skip = True
            if skip:
                continue
            else:
                logger.info("Processing file '{:s}'".format(f))
            station_res = self.parse_file(df)
            self.res[station_res["station"]] = station_res

        with open(self.f_out, "w") as f_out:
            json.dump(self.res, f_out, indent=4, sort_keys=True)
