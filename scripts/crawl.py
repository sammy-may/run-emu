import argparse

from backend.spiders.rf_spider import RFSpider
from backend.spiders.usa_spider import USASpider
from backend.spiders.usu_spider import USUSpider
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
        "--site", required=False, default="USU", type=str, help="Which website to parse"
    )

    parser.add_argument(
        "--reuse", action="store_true", help="reuse already-dumped results"
    )

    return parser.parse_args()


def main(args):
    logger = setup_logger()

    args = {k: v for k, v in vars(args).items() if v is not None}
    args["urls"] = ["https://ultrasignup.com/register.aspx?did=1XXXXX"]
    if args["site"] == "USU":
        spider = USUSpider(**args)
        logger.info("Launching USU spiders.")
    elif args["site"] == "RF":
        spider = RFSpider(**args)
        logger.info("Launching RF spiders.")
    elif args["site"] == "USA":
        spider = USASpider(**args)
        logger.info("Launching USA spiders.")
    spider.crawl()


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
