import { useState, useContext } from "react";
import RaceType from "../types/race";
import DataContext from "../context/RaceFeedContext";

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
    };

    const sortByName = () => {
        const sortedRaces = [...searchResults];
        sortedRaces.sort(compareByName);
        races.sort(compareByName);
        setSearchResults(sortedRaces);
    };

    return (
        <div>
            <button
                id="sortInfo"
                data-dropdown-toggle="dropdownInformation"
                type="button"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div>Ascending?</div>
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="sortInfo"
                    >
                        <li>
                            <button
                                onClick={() => sortByDistance()}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Distance
                            </button>
                        </li>
                        <li>
                            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Date
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => sortByName()}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Alphabetical
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
