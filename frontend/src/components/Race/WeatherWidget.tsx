import { useState } from "react";
import RaceType from "../../types/race";
import {
    FaTemperatureArrowUp,
    FaTemperatureArrowDown,
    FaCloudShowersWater,
} from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";

const WeatherWidget = ({ race }: { race: RaceType }) => {
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const handleMouseOver = () => {
        setIsInfoHovered(true);
    };
    const handleMouseOut = () => {
        setIsInfoHovered(false);
    };
    const handleClick = () => {
        setIsInfoHovered(!isInfoHovered);
    };

    const day_month = new Date(race.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });

    const dist = Math.round(race.station_distance ?? 0);
    const dist_str = dist > 0 ? String(dist) : "<1";
    return (
        <div className="space-y-1 pr-3">
            <div className="flex items-center">
                <h2 className="text-sm font-semibold text-gray-400 px-3 ">
                    Weather
                </h2>
                <div
                    className="pr-3 relative cursor-pointer text-gray-400 text-sm font-semibold"
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseOut}
                    onClick={handleClick}
                >
                    <IoMdInformationCircleOutline />
                    {isInfoHovered && (
                        <div className="absolute rounded-lg p-3 font-light border border-indigo-400 bg-gray-700 space-y-3 text-gray-300 text-sm top-2 left-2">
                            <p>
                                Weather information is based on measurements
                                from over 15,000 weather stations over the past
                                30 years from the{" "}
                                <a
                                    href={
                                        "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
                                    }
                                    className="text-indigo-500 hover:underline"
                                >
                                    U.S. Climate Normals
                                </a>{" "}
                                dataset provided by <span>NCEI</span>.
                            </p>
                            <p className="flex items-center whitespace-nowrap space-x-2 px-2">
                                <span className="text-gray-200 font-semibold">
                                    <FaTemperatureArrowUp />
                                </span>
                                <span>
                                    indicates the{" "}
                                    <span className="text-gray-200 font-semibold">
                                        average high temperature
                                    </span>{" "}
                                    .
                                </span>
                            </p>
                            <p className="flex items-center whitespace-nowrap space-x-2 px-2">
                                <span className="text-gray-200 font-semibold">
                                    <FaTemperatureArrowDown />
                                </span>
                                <span>
                                    indicates the{" "}
                                    <span className="text-gray-200 font-semibold">
                                        average low temperature
                                    </span>{" "}
                                    .
                                </span>
                            </p>
                            <p className="flex items-center whitespace-nowrap space-x-2 px-2">
                                <span className="text-gray-200 font-semibold">
                                    <FaCloudShowersWater />
                                </span>
                                <span>
                                    indicates the{" "}
                                    <span className="text-gray-200 font-semibold">
                                        probability
                                    </span>{" "}
                                    of receiving{" "}
                                    <span className="text-gray-200 font-semibold">
                                        at least 0.25 inches of precipitation
                                    </span>{" "}
                                    .
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-sm font-light text-gray-400 px-3">
                Typical weather for{" "}
                <span className="font-medium text-gray-400">
                    {race.location}
                </span>{" "}
                on{" "}
                <span className="font-medium text-gray-400">{day_month}</span>:
            </p>
            <div className="flex items-center space-x-3 px-8 text-gray-400">
                <div>
                    <FaTemperatureArrowUp />
                </div>
                <div className="font-medium  text-gray-200">
                    {Math.round(race.typical_high ?? 0)}
                    {`\u00B0`}
                </div>
            </div>
            <div className="flex items-center space-x-3 px-8 text-gray-400">
                <div>
                    <FaTemperatureArrowDown />
                </div>
                <div className="font-medium  text-gray-200">
                    {Math.round(race.typical_low ?? 0)}
                    {`\u00B0`}
                </div>
            </div>
            <div className="flex items-center space-x-3 px-8 text-gray-400">
                <div>
                    <FaCloudShowersWater />
                </div>
                <div className="font-medium  text-gray-200">
                    {Math.round(
                        race.precip_chance
                            ? race.precip_chance > 0
                                ? race.precip_chance
                                : 0
                            : 0,
                    )}
                    %
                </div>
            </div>
            {/*                     <div className="flex items-center space-x-3 px-8 text-gray-400">
                        <div>
                            <FaSnowflake />
                        </div>
                        <div className="font-medium  text-gray-200">8%</div>
                    </div> */}
            <p className="text-sm font-light text-gray-400 px-3">
                Based on historical measurements from weather station{" "}
                <span className="font-medium text-indigo-500">
                    {race.station_name}
                </span>{" "}
                ({dist_str} mi away).
            </p>
        </div>
    );
};

export default WeatherWidget;
