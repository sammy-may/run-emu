import { useContext } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";
import { FaLocationDot } from "react-icons/fa6";

import RaceTitle from "../../../components/Race/RaceTitle";
import RaceType from "../../../types/race";
import DistanceBar from "../../../components/Race/DistanceBar";
import { FaLink, FaRegCalendarAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import WeatherWidget from "../../../components/Race/WeatherWidget";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

const Page = () => {
    const name = useData<Data>();

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
        <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700 p-6 space-y-1 mx-auto max-w-4xl">
            <RaceTitle title={race.name} />
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Location
                    </h2>
                    <div className="flex items-center space-x-3 px-3 text-gray-400 pb-3">
                        <div>
                            <FaLocationDot />
                        </div>
                        <div>{race.location}</div>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Date
                    </h2>
                    <div className="flex items-center space-x-3 px-3 text-gray-400 pb-3">
                        <div>
                            <FaRegCalendarAlt />
                        </div>
                        <div>{date}</div>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-200 px-3">
                        Distances
                    </h2>
                    <div className="pb-6">
                        <DistanceBar race={race} />
                    </div>
                </div>
                <WeatherWidget race={race} />
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
    );
};

export default Page;
