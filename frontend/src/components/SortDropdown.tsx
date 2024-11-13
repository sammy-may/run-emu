import { useState, useContext } from "react";
import RaceType from "../types/race";
import DataContext from "../context/RaceFeedContext";

import { PiPathBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiSortAlphabetically } from "react-icons/ti";

const SortDropdown = () => {
    const { races, searchResults, setSearchResults } = useContext(DataContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const compareByDistance = (a: RaceType, b: RaceType) => {
        if (a.distance < b.distance) return -1;
        if (a.distance > b.distance) return 1;
        return 0;
    };

    const compareByName = (a: RaceType, b: RaceType) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    };

    const sortByDistance = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByDistance);
        races.sort(compareByDistance);
        setSearchResults(sortedRaces);
        toggleDropdown();
    };

    const sortByName = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByName);
        races.sort(compareByName);
        setSearchResults(sortedRaces);
        toggleDropdown();
    };

    return (
        <div className="relative">
            <button
                id="sortInfo"
                data-dropdown-toggle="dropdownInformation"
                type="button"
                onClick={toggleDropdown}
                className="flex text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 min-w-32"
            >
                Sort by
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdownInformation"
                    className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="sortInfo"
                    >
                        <li>
                            <button
                                onClick={() => sortByDistance()}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
