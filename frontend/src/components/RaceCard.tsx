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

import Carousel from "./Race/Carousel";

const RaceCardContent = ({
    race,
    className,
}: {
    race: RaceType;
    className: string;
}) => {
    return (
        <div
            className={`rounded-lg pb-3 shadow border border-gray-700 hover:bg-gray-700 hover:border-blue-600 ${className}`}
        >
            <a href={`/races/${race.name_url}`}>
                {/*                 <Carousel imgs={race.images.data} swiperClass="swiper"/> */}
                <RaceTitle title={race.name} />
                <DateLocationBar race={race} />
                <DistanceBar race={race} />
                <div className="flex items-center mt-3">
                    <div className="flex items-center space-x-3 px-3 text-gray-400 text-sm font-light">
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
                    <div className="flex items-center space-x-3 px-3 text-gray-400">
                        <div>
                            <FaCloudShowersWater />
                        </div>
                        <div className="font-medium  text-gray-200">
                            {Math.round(race.precip_chance ?? 0)}%
                        </div>
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
