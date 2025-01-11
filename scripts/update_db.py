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

    parser.add_argument(
        "--dry_run",
        required=False,
        action="store_true",
        help="whether to perform upsertion to supabase",
    )

    parser.add_argument(
        "--output_dir",
        required=False,
        default="data/",
        type=str,
        help="output directory for merged json",
    )

    return parser.parse_args()


SOURCES = [
    "data/usu_spider_dump.json",
    "data/usa_spider_dump.json",
]

WEATHER = "data/weather/daily_normals.json"


def main(args):
    logger = setup_logger()
    logger.info("Running `update_db.py`.")

    lib = Librarian(
        sources=SOURCES,
        weather=WEATHER,
        output_dir=args.output_dir,
        dry_run=args.dry_run,
    )
    lib.build_database()


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
