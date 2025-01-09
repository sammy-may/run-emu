import { FaLocationDot } from "react-icons/fa6";

import RaceTitle from "../../../components/Race/RaceTitle";
import DistanceBar from "../../../components/Race/DistanceBar";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";

import WeatherWidget from "../../../components/Race/WeatherWidget";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

const Page = () => {
    const { race, date } = useData<Data>();

    return (
        race && (
            <div className="px-3">
                <div className="w-full rounded-lg border text-black dark:text-white dark:hover:text-dustyRose-50 hover:text-dustyRose-900 dark:bg-gray-800 bg-gray-200 dark:border-gray-700 border-gray-300 px-6 py-6 space-y-1 max-w-screen-lg">
                    <div className="px-3 flex items-center">
                        <a
                            href="/"
                            className="px-2 py-0.5 rounded-lg flex items-center space-x-2 dark:bg-gray-800 bg-gray-200 border dark:border-gray-800 border-gray-200 dark:hover:bg-dustyRose-600 dark:hover:border-dustyRose-400 hover:bg-dustyRose-400 hover:border-dustyRose-600"
                        >
                            <div>
                                <IoArrowBack />
                            </div>
                            <div>Explore more races</div>
                        </a>
                    </div>
                    <RaceTitle title={race.name} className="" />
                    <div className="flex flex-col items-start place-content-start md:grid md:grid-cols-2 md:gap-4 md:pr-3">
                        <div className="space-y-1">
                            <h2 className="text-sm font-semibold dark:text-gray-400 text-gray-600 px-3">
                                Date
                            </h2>
                            <div className="flex items-center space-x-3 px-3 dark:text-gray-400 text-gray-600 pb-3">
                                <div>
                                    <FaRegCalendarAlt />
                                </div>
                                <div className="dark:text-periwinkleBlue-50 text-periwinkleBlue-900 text-xs font-semibold dark:bg-periwinkleBlue-700 bg-periwinkleBlue-300 border dark:border-periwinkleBlue-500 border-periwinkleBlue-500 rounded-full px-2.5 py-0.5">
                                    {date}
                                </div>
                            </div>
                            <h2 className="text-sm font-semibold dark:text-gray-400 text-gray-600 px-3">
                                Location
                            </h2>
                            <div className="flex items-center space-x-3 px-3 dark:text-gray-400 text-gray-600 pb-3">
                                <div>
                                    <FaLocationDot />
                                </div>
                                <div className="dark:text-periwinkleBlue-50 text-periwinkleBlue-900 text-xs font-semibold dark:bg-periwinkleBlue-700 bg-periwinkleBlue-300 border dark:border-periwinkleBlue-500 border-periwinkleBlue-500 rounded-full px-2.5 py-0.5">
                                    {race.location}
                                </div>
                            </div>

                            <h2 className="text-sm font-semibold dark:text-gray-400 text-gray-600 px-3">
                                Distances
                            </h2>
                            <div className="pb-6">
                                <DistanceBar race={race} />
                            </div>
                        </div>
                        <div className="pb-4">
                            <WeatherWidget race={race} />
                        </div>
                    </div>
                    <hr className="mx-3 pb-4 border-black dark:border-white" />
                    <div className="flex items-center">
                        <div className="font-normal dark:text-gray-400 text-gray-600 rounded-lg px-3">
                            <a
                                href={race.website}
                                className="flex items-center space-x-3 text-indigo-400 font-medium hover:underline"
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
                                className="flex items-center space-x-3 text-indigo-400 font-medium hover:underline"
                            >
                                <div>
                                    <LuClipboardEdit />
                                </div>
                                <div className="text-s">Register</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Page;
