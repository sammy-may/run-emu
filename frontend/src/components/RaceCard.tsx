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
import { FaRegHeart } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { LuSend } from "react-icons/lu";

const RaceCardContent = ({
    race,
    className,
}: {
    race: RaceType;
    className: string;
}) => {
    return (
        <div
            className={`rounded-lg mb-1 pb-3 shadow border border-gray-600 hover:bg-gray-700 hover:border-gray-500 ${className}`}
        >
            <a href={`/races/${race.name_url}`}>
                {/*                 <Carousel imgs={race.images.data} swiperClass="swiper"/> */}
                <RaceTitle title={race.name} />
                <DateLocationBar race={race} />
                <DistanceBar race={race} />
                <div className="flex items-center mt-2 flex-nowrap overflow-x-auto mr-2 pb-3">
                    <div className="flex whitespace-nowrap items-center space-x-3 px-3 text-gray-400 text-sm font-light tracking-tight">
                        Typical weather
                    </div>
                    <div className="flex items-center space-x-3 px-3 text-gray-400">
                        <div>
                            <FaTemperatureArrowUp />
                        </div>
                        <div className="font-medium  text-gray-200">
                            {Math.round(race.typical_high ?? 0)}
                            {`\u00B0`}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 px-3 text-gray-400">
                        <div>
                            <FaTemperatureArrowDown />
                        </div>
                        <div className="font-medium  text-gray-200">
                            {Math.round(race.typical_low ?? 0)}
                            {`\u00B0`}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 px-3 text-gray-400 ">
                        <div>
                            <FaCloudShowersWater />
                        </div>
                        <div className="font-medium  text-gray-200">
                            {Math.round(race.precip_chance ?? 0)}%
                        </div>
                    </div>
                </div>
                {/*                 <div className="px-6 pb-2">
                    <div className="border border-gray-500 w-full px-3"></div>
                </div> */}
                <div className="flex items-center place-content-start space-x-3 px-3 text-lg text-gray-50">
                    <div className="hover:text-red-500">
                        <FaRegHeart />
                    </div>
                    <div className="hover:text-gray-500">
                        <FaRegEyeSlash />
                    </div>
                    <div className="hover:text-blue-500">
                        <LuSend />
                    </div>
                </div>
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
                    className="bg-gray-700 border-blue-600"
                />
            )}
            {!race.isHovered && (
                <RaceCardContent race={race} className="bg-gray-800" />
            )}
        </div>
    );
};

export default RaceCard;
