import React from "react";
import { FaLink } from "react-icons/fa";

type HeadingProps = {
    text: string;
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const LinkableHeading: React.FC<HeadingProps> = ({ text }) => {
    const id = slugify(text);

    return (
        <div className="flex flex-col items-start">
            <div className="w-full border border-gray-400 mt-6"></div>
            <h2
                id={id}
                className="flex items-center space-x-2 pt-6 pb-5 text-xl font-semibold text-white"
            >
                <span>{text} </span>
                <a
                    href={`#${id}`}
                    aria-label={`Link to ${text}`}
                    className="text-base"
                >
                    <FaLink />
                </a>
            </h2>
        </div>
    );
};

export default LinkableHeading;
