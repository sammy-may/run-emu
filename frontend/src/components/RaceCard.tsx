import { useContext } from "react";

import RaceType from "../types/race";
import { RaceContext } from "../context/RaceFeedContext";
import RaceTitle from "./Race/RaceTitle";
import DistanceBar from "./Race/DistanceBar";
import DateLocationBar from "./Race/DateLocationBar";
import {
    FaTemperatureArrowUp,
    FaTemperatureArrowDown,
    FaCloudShowersWater,
} from "react-icons/fa6";

const RaceCardContent = ({
    race,
    className,
}: {
    race: RaceType;
    className: string;
}) => {
    return (
        <div
            className={`rounded-lg mb-1 pb-3 shadow border hover:dark:border-dustyRose-600 border-dustyRose-400 hover:dark:bg-gray-700 bg-gray-200 ${className}`}
        >
            <a href={`/races/${race.name_url}`}>
                {/*                 <Carousel imgs={race.images.data} swiperClass="swiper"/> */}
                <RaceTitle title={race.name} className="whitespace-nowrap" />
                <DateLocationBar race={race} />
                <DistanceBar race={race} />
                <div className="flex items-center mt-2 flex-nowrap overflow-x-auto mr-2">
                    <div className="flex whitespace-nowrap items-center space-x-3 px-3 dark:text-gray-400 text-gray-600 text-sm font-light tracking-tight">
                        Typical weather
                    </div>
                    <div className="flex items-center space-x-3 px-3 dark:text-gray-400 text-gray-600">
                        <div>
                            <FaTemperatureArrowUp />
                        </div>
                        <div className="font-medium  dark:text-gray-200 text-gray-800">
                            {Math.round(race.typical_high ?? 0)}
                            {`\u00B0`}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 px-3 dark:text-gray-400 text-gray-600">
                        <div>
                            <FaTemperatureArrowDown />
                        </div>
                        <div className="font-medium  dark:text-gray-200 text-gray-800">
                            {Math.round(race.typical_low ?? 0)}
                            {`\u00B0`}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 px-3 dark:text-gray-400 text-gray-600 ">
                        <div>
                            <FaCloudShowersWater />
                        </div>
                        <div className="font-medium  dark:text-gray-200 text-gray-800">
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
                </div>
                {/*                 <div className="flex items-center place-content-start space-x-3 px-3 text-lg text-gray-50">
                    <div className="hover:dark:text-red-500 text-red-500">
                        <FaRegHeart />
                    </div>
                    <div className="hover:dark:text-gray-500 text-gray-500">
                        <FaRegEyeSlash />
                    </div>
                    <div className="hover:dark:text-blue-500 text-blue-500">
                        <LuSend />
                    </div>
                </div> */}
            </a>
        </div>
    );
};

const RaceCard = ({ index, race }: { index: number; race: RaceType }) => {
    const { updateHover } = useContext(RaceContext);

    return (
        <div
            onMouseEnter={() => {
                updateHover(index, true, false);
            }}
            onMouseLeave={() => {
                updateHover(index, false, false);
            }}
        >
            {race.isHovered && (
                <RaceCardContent
                    race={race}
                    className="dark:border-dustyRose-600 border-dustyRose-400 dark:bg-gray-700 bg-gray-300"
                />
            )}
            {!race.isHovered && (
                <RaceCardContent
                    race={race}
                    className="dark:bg-gray-800 bg-gray-200 dark:border-gray-600 border-gray-400"
                />
            )}
        </div>
    );
};

export default RaceCard;
