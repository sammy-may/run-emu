import { PiPathBold } from "react-icons/pi";
import {
    FaExpandAlt,
    FaRegCalendarAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { IoIosAddCircle } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";


import { MdDiscount } from "react-icons/md";
import { useContext } from "react";

import RaceType from "../types/race";
import DistanceBadge from "./DistanceBadge";
import DateBadge from "./DateBadge";
import { RaceContext } from "../context/RaceFeedContext";
import { Link } from "react-router-dom";
import RaceTitle from "./Race/RaceTitle";
import Carousel from "./Race/Carousel";
import DistanceBar from "./Race/DistanceBar"; 
import DateLocationBar from "./Race/DateLocationBar";
import DetailsButton from "./Race/DetailsButton";

const RaceCardContent = ({race, className} : { race: RaceType; className: string;}) => {
    return (
        <div className={`rounded-lg pb-3 shadow border border-gray-700 hover:bg-gray-700 hover:border-indigo-400 ${className}`}>
            <Link to={`races/${race.name_url}`}>
                <Carousel imgs={race.images.data} swiperClass="swiper"/>
                        <RaceTitle title={race.name}/>
                        <DateLocationBar race={race} />
                        <DistanceBar race={race}/>
            </Link>
        </div>
    );
}

const RaceCard = ({index, race}: { index: number, race: RaceType}) => {
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
            {
                race.isHovered && (
                    <RaceCardContent race={race} className="bg-gray-700 border-indigo-400"/>
                )
            }
            {
                !race.isHovered && (
                    <RaceCardContent race={race} className="bg-gray-800"/>

            )
            }
        </div>
    );
};

export default RaceCard;