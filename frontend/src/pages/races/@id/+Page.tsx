import { FaLocationDot } from "react-icons/fa6";

import RaceTitle from "../../../components/Race/RaceTitle";
import DistanceBar from "../../../components/Race/DistanceBar";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import WeatherWidget from "../../../components/Race/WeatherWidget";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

const Page = () => {
    const { race, date } = useData<Data>();

    return (
        race && (
            <div className="px-3">
                <div className="w-full rounded-lg border bg-gray-800 border-gray-700 px-6 py-6 space-y-1 max-w-screen-lg">
                    <RaceTitle title={race.name} />
                    <div className="flex flex-col items-start place-content-start md:grid md:grid-cols-2 md:gap-4 md:pr-3">
                        <div className="space-y-1">
                            <h2 className="text-sm font-semibold text-gray-400 px-3">
                                Date
                            </h2>
                            <div className="flex items-center space-x-3 px-3 text-gray-400 pb-3">
                                <div>
                                    <FaRegCalendarAlt />
                                </div>
                                <div className="text-periwinkleBlue-50 text-xs font-semibold bg-periwinkleBlue-700 border border-periwinkleBlue-500 rounded-full px-2.5 py-0.5">
                                    {date}
                                </div>
                            </div>
                            <h2 className="text-sm font-semibold text-gray-400 px-3">
                                Location
                            </h2>
                            <div className="flex items-center space-x-3 px-3 text-gray-400 pb-3">
                                <div>
                                    <FaLocationDot />
                                </div>
                                <div className="text-periwinkleBlue-50 text-xs font-semibold bg-periwinkleBlue-700 border border-periwinkleBlue-500 rounded-full px-2.5 py-0.5">
                                    {race.location}
                                </div>
                            </div>

                            <h2 className="text-sm font-semibold text-gray-400 px-3">
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
                    <hr className="mx-3 pb-4" />
                    <div className="flex items-center">
                        <div className="font-normal text-gray-400 rounded-lg px-3">
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
