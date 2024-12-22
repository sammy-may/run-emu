import { useState, useContext } from "react";
import RaceType from "../types/race";
import { RaceContext } from "../context/RaceFeedContext";

import { PiPathBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiSortAlphabetically } from "react-icons/ti";
import { LuArrowDownUp } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import ActionButton from "./ActionButton";

const SortDropdown = () => {
    const {
        state: { allResults, searchResults, mapResults },
        updateSearchResults,
    } = useContext(RaceContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [sortText, setSortText] = useState<string>("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const compareByDistance = (a: RaceType, b: RaceType) => {
        if (a.distance_max < b.distance_max) return -1;
        if (a.distance_max > b.distance_max) return 1;
        return 0;
    };

    const compareByName = (a: RaceType, b: RaceType) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    };

    const compareByDate = (a: RaceType, b: RaceType) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    };

    const sortByDistance = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByDistance);
        allResults.sort(compareByDistance);
        mapResults.sort(compareByDistance);
        updateSearchResults(sortedRaces);
        setSortText(": Distance");
        toggleDropdown();
    };

    const sortByName = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByName);
        allResults.sort(compareByName);
        mapResults.sort(compareByName);
        updateSearchResults(sortedRaces);
        setSortText(": A-Z");
        toggleDropdown();
    };

    const sortByDate = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByDate);
        allResults.sort(compareByDate);
        mapResults.sort(compareByDate);
        updateSearchResults(sortedRaces);
        setSortText(": Date");
        toggleDropdown();
    };

    const reverse = () => {
        const reversedRaces = [...searchResults];
        reversedRaces.reverse();
        allResults.reverse();
        mapResults.reverse();
        updateSearchResults(reversedRaces);
    };

    return (
        <div className="relative">
            <div className="flex items-center shadow-sm space-x-2">
                <ActionButton
                    content={
                        <>
                            <div>
                                <FaSort />
                            </div>
                            <span className="max-w-0 absolute -top-96 sm:max-w-36 sm:relative sm:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Sort by {sortText}
                            </span>
                        </>
                    }
                    dropdown={true}
                    onClick={toggleDropdown}
                />
                <ActionButton
                    content={
                        <>
                            <LuArrowDownUp />
                            <p className="max-w-0 absolute -top-96 sm:max-w-36 sm:relative sm:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Reverse
                            </p>
                        </>
                    }
                    dropdown={false}
                    onClick={reverse}
                />
            </div>

            {isOpen && (
                <div
                    id="dropdownInformation"
                    className=" divide-y divide-gray-600 rounded-lg shadow w-44 bg-gray-700 absolute z-50"
                >
                    <ul
                        className="py-2 text-sm text-gray-200"
                        aria-labelledby="sortInfo"
                    >
                        <li>
                            <button
                                onClick={() => sortByDistance()}
                                className="flex px-4 py-2 hover:bg-gray-600 hover:text-white w-full"
                            >
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <PiPathBold />
                                    </div>{" "}
                                    <div>Distance</div>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => sortByDate()}
                                className="flex px-4 py-2 hover:bg-gray-600 hover:text-white w-full"
                            >
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <FaRegCalendarAlt />
                                    </div>
                                    <div>Date</div>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => sortByName()}
                                className="flex px-4 py-2 hover:bg-gray-600 hover:text-white w-full"
                            >
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <TiSortAlphabetically />
                                    </div>
                                    <div>Alphabetical</div>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
