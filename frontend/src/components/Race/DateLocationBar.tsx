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
        <div className="flex flex-wrap px-3 flex-row items-center w-full">
            <div className="flex items-center space-x-3 text-gray-400 pr-6 pb-2 min-w-40">
                <div>
                    <FaRegCalendarAlt />
                </div>
                <div className="flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-700">
                    {date}
                </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-400 pb-2 min-w-44">
                <div>
                    <FaLocationDot />
                </div>
                <div className="flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-700">
                    {race.location}
                </div>
            </div>
        </div>
    );
};

export default DateLocationBar;
