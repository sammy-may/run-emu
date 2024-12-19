import argparse

from backend.database.librarian import Librarian
from backend.utils.logger_utils import setup_logger


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


SOURCES = ["data/rf_spider_dump.json", "data/usu_spider_dump.json"]

WEATHER = "data/weather/daily_normals.json"


def main(args):
    logger = setup_logger()
    logger.info("Running `update_db.py`.")

    lib = Librarian(sources=SOURCES, weather=WEATHER)
    lib.build_database()


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
