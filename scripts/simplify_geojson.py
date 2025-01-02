import argparse
import glob
import json
import os

from backend.utils.logger_utils import setup_logger


def parse_arguments():
    parser = argparse.ArgumentParser(description="Simplify geojson boundaries.")

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
        "--input_dir",
        required=True,
        type=str,
        help="input directory to glob for json files",
    )

    parser.add_argument(
        "--output_dir",
        required=True,
        type=str,
        help="output directory to place simplified files in",
    )

    parser.add_argument(
        "--simplify_percent",
        required=False,
        default="10%",
        type=str,
        help="argument for -simplify option of mapshaper",
    )

    return parser.parse_args()


def main(args):
    logger = setup_logger()

    merged_data = {"type": "FeatureCollection", "features": []}

    inputs = glob.glob(args.input_dir + "/*.json")
    logger.info(
        "Found {:d} input json files in directory '{:s}'.".format(
            len(inputs), args.input_dir
        )
    )

    if not os.path.exists(args.output_dir):
        os.mkdir(args.output_dir)

    outputs = []
    for x in inputs:
        name = x.split("/")[-1]
        if name == "usa" or name == "canada":
            continue
        target = args.output_dir + "/" + name
        command = "mapshaper {:s} -simplify {:s} -o {:s}".format(
            x, args.simplify_percent, target
        )
        logger.info("Running command: {:s}".format(command))
        os.system(command)
        outputs.append(target)

    for x in outputs:
        with open(x, "r") as f_in:
            data = json.load(f_in)
            res = {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": data["geometries"][0]["coordinates"],
                },
                "properties": {"state": x.split("/")[-1].replace(".json", "")},
            }
            merged_data["features"].append(res)

    with open(args.output_dir + "/merged_boundaries.json", "w") as f_out:
        json.dump(merged_data, f_out)


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
