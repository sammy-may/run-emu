import argparse

from backend.utils.logger_utils import setup_logger
from backend.weather.weather_stations import WeatherStationExplorer


def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Crawl race directories to build database."
    )

    parser.add_argument(
        "--log-level",
        required=False,
        default="INFO",
        type=str,
        help="Level of information printed by the logger",
    )

    parser.add_argument(
        "--log-file", required=False, type=str, help="Name of the log file"
    )

    return parser.parse_args()


def main(args):
    logger = setup_logger()

    logger.debug("Launching spiders...")

    args = {k: v for k, v in vars(args).items() if v is not None}
    args["dir"] = (
        "/Users/samuelmay/Downloads/us-climate-normals_2006-2020_v1.0.1_daily_multivariate_by-station_c20230404/"
    )
    explorer = WeatherStationExplorer(**args)
    explorer.parse()


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
