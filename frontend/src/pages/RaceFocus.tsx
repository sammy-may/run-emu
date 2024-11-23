import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RaceContext } from "../context/RaceFeedContext";
import { FaLocationDot } from "react-icons/fa6";

import RaceTitle from "../components/Race/RaceTitle";
import RaceType from "../types/race";
import Carousel from "../components/Race/Carousel";
import DateLocationBar from "../components/Race/DateLocationBar";
import DistanceBar from "../components/Race/DistanceBar";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";

const RaceFocus = () => {
    const { name } = useParams();
    const {
        state: { allResults },
    } = useContext(RaceContext);

    const race: RaceType | undefined = allResults.find(
        (race) => race.name_url === name
    );

    if (!race) {
        return <div>Missing</div>;
    }

    const date = new Date(race.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700 p-3 space-y-1 mx-auto max-w-4xl pb-6">
            <RaceTitle title={race.name} />
            <div className="px-3 pb-3">
                <Carousel imgs={race.images.data} swiperClass="swiper-big" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Location
                    </h2>
                    <div className="flex items-center space-x-3 px-8 text-gray-400 pb-3">
                        <div>
                            <FaLocationDot />
                        </div>
                        <div>{race.location}</div>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Date
                    </h2>
                    <div className="flex items-center space-x-3 px-8 text-gray-400 pb-3">
                        <div>
                            <FaRegCalendarAlt />
                        </div>
                        <div>{date}</div>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Distances
                    </h2>
                    <div className="px-5 pb-6">
                        <DistanceBar race={race} />
                    </div>
                </div>
                <div className="space-y-1">
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Historical Weather
                    </h2>
                    <div className="flex items-center space-x-3 px-8 text-gray-400 pb-3">
                        <div>
                            <FaTemperatureHigh />
                        </div>
                        <div>Hot</div>
                    </div>
                </div>
            </div>
            <hr className="mx-3 pb-4" />
            <div className="flex items-center">
                <div className="font-normal text-gray-400 rounded-lg px-3">
                    <a
                        href={race.website}
                        className="flex items-center space-x-3 text-indigo-400 font-medium"
                    >
                        <div>
                            <FaLink />
                        </div>
                        <div className="text-s">Race Website</div>
                    </a>
                </div>
                <div className="flex items-center rounded-lg px-3">
                    <a
                        href={race.register}
                        className="flex items-center space-x-3 text-indigo-400 font-medium"
                    >
                        <div>
                            <LuClipboardEdit />
                        </div>
                        <div className="text-s">Register</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RaceFocus;
