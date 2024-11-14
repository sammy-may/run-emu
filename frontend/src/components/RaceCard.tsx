import { PiPathBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import RaceType from "../types/race";

const getRandomInt = (max_val: number): number => {
    return Math.floor(Math.random() * max_val);
};

const RaceCard = ({ race }: { race: RaceType }) => {
    return (
        <div className="max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-600">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {race.name}
            </h2>
            <p className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-4">
                    <div>
                        <PiPathBold />
                    </div>
                    <div>{race.distance} mi</div>
                </div>
            </p>
            <p className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-4">
                    <div>
                        <FaRegCalendarAlt />
                    </div>
                    <div>
                        {getRandomInt(11) + 1}/{getRandomInt(30) + 1}/2025
                    </div>
                </div>
            </p>
            <p className="mb-3 font-normal text-gray-400 flex text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="flex items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Registration Open
                </span>
            </p>
        </div>
    );
};

export default RaceCard;
