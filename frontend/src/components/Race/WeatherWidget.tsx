import React from "react";
import RaceType from "../../types/race";
import {
    FaTemperatureArrowUp,
    FaTemperatureArrowDown,
    FaCloudShowersWater,
} from "react-icons/fa6";

const WeatherWidget = ({ race }: { race: RaceType }) => {
    const date = new Date(race.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const day_month = new Date(race.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });

    const dist = Math.round(race.station_distance ?? 0);
    const dist_str = dist > 0 ? String(dist) : "<1";
    return (
        <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3 ">
                Weather
            </h2>
            <p className="whitespace-nowrap text-sm font-light text-gray-400 px-3">
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
                    {Math.round(race.precip_chance ?? 0)}%
                </div>
            </div>
            {/*                     <div className="flex items-center space-x-3 px-8 text-gray-400">
                        <div>
                            <FaSnowflake />
                        </div>
                        <div className="font-medium  text-gray-200">8%</div>
                    </div> */}
            <p className="text-sm font-light text-gray-400 px-3">
                Based on historical data from weather station{" "}
                <span className="font-medium text-indigo-500">
                    {race.station_name}
                </span>{" "}
                ({dist_str} mi away).
            </p>
        </div>
    );
};

export default WeatherWidget;
