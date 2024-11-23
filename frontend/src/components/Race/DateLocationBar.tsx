import React from "react";

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import RaceType from "../../types/race";

const DateLocationBar = ({ race }: { race: RaceType }) => {
    const date = new Date(race.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="px-3 pb-3 flex items-center whitespace-nowrap overflow-auto">
            <div className="flex items-center space-x-3">
                <div>
                    <FaRegCalendarAlt />
                </div>
                <div>{date}</div>
            </div>
            <div className="flex items-center space-x-3 px-6">
                <div>
                    <FaLocationDot />
                </div>
                <div>{race.location}</div>
            </div>
        </div>
    );
};

export default DateLocationBar;
