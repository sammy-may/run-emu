import argparse
import glob
import re

from backend.utils.logger_utils import setup_logger


def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Rewrite tailwind css utility clases in ts and js files to add support for dark mode and light mode"
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


COLORS = [
    "gray",
    "blue",
    "red",
    "green",
    "black",
    "white",
    "dustyRose",
    "periwinkleBlue",
    "mintGreen",
    "deepIndigo",
    "magentaGlow",
    "coralBlush",
    "royalBlue",
    "slateBlue",
    "wineRed",
    "tealWave",
    "forestGreen",
    "lightSkyBlue",
    "aquaBlue",
    "lavenderPurple",
]
VALUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]


# Function to compute the new value based on the original value
def get_new_value(value):
    value_mapping = {
        50: 900,
        100: 900,
        200: 800,
        300: 700,
        400: 600,
        500: 500,
        600: 400,
        700: 300,
        800: 200,
        900: 100,
    }
    return value_mapping.get(value, value)  # Default to original value if not mapped


# Function to transform the string based on the pattern
def transform_string(input_str):
    # Regex pattern to match the desired format
    pattern = r"(\w+)-(" + "|".join(COLORS) + r")-(\d{3})"

    # Function to apply the transformation to each match
    def replacer(match):
        something = match.group(1)
        color = match.group(2)
        value = int(match.group(3))

        if value in VALUES:
            new_value = get_new_value(value)
            # Generate the transformed string
            return f"dark:{something}-{color}-{value} {something}-{color}-{new_value}"
        return match.group(0)  # If no transformation needed, return the original match

    # Perform the replacement using the regex
    transformed_str = re.sub(pattern, replacer, input_str)

    transformed_str.replace("text-white", "dark:text-white text-black").replace(
        "bg-white", "dark:bg-white bg-black"
    ).replace("text-black", "dark:text-black text-white").replace(
        "bg-black", "dark:bg-black bg-white"
    )

    return transformed_str


def rewrite_file(src: str):
    with open(src, "r") as f_in:
        lines = f_in.readlines()

    new_lines = []
    n_change = 0
    for idx, line in enumerate(lines):
        if "className" in line:
            new_lines.append(transform_string(line))
            n_change += 1
        else:
            new_lines.append(line)

    with open(src, "w") as f_out:
        for line in new_lines:
            f_out.write(line)

    return n_change


def main(args):
    logger = setup_logger()

    targets = []
    for ext in [".jsx", ".js", ".tsx", ".ts"]:
        files = glob.glob("frontend/src/**/*{:s}".format(ext), recursive=True)
        targets += files

    for x in targets:
        n_change = rewrite_file(x)
        logger.info(
            "Reformatted file '{:s}' with {:d} changed lines.".format(x, n_change)
        )


if __name__ == "__main__":
    args = parse_arguments()
    main(args)
