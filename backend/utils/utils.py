import re


def slugify(text: str) -> str:
    return re.sub(
        r"(^-|-?$)",
        "",
        re.sub(r"[^a-z0-9]+", "-", text.replace("&amp;", "and").lower()),
    )
