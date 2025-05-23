import { useState, useContext } from "react";
import { RaceContext } from "../context/RaceFeedContext";

import { PiPathBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiSortAlphabetically } from "react-icons/ti";
import { LuArrowDownUp } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import ActionButton from "./ActionButton";

const SortDropdown = () => {
    const {
        state: { allResults, searchResults, mapResults, sortMethod },
        updateSearchResults,
        updateSortMethod,
        updateNeedSort,
    } = useContext(RaceContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
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
                            <span className="max-w-0 absolute -top-96 md:max-w-36 md:relative md:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Sort by :{" "}
                                {sortMethod
                                    ? sortMethod?.charAt(0).toUpperCase() +
                                      sortMethod?.slice(1)
                                    : ""}
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
                            <p className="max-w-0 absolute -top-96 md:max-w-36 md:relative md:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
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
                    className=" divide-y dark:divide-gray-600 divide-gray-400 rounded-lg shadow w-44 dark:bg-gray-700 bg-gray-300 absolute z-50 right-0 xl:left-0"
                >
                    <ul
                        className="py-2 text-sm dark:text-gray-200 text-gray-800"
                        aria-labelledby="sortInfo"
                    >
                        <li>
                            <button
                                onClick={() => {
                                    updateSortMethod("distance");
                                    updateNeedSort();
                                    closeDropdown();
                                }}
                                className="flex px-4 py-2 dark:hover:bg-gray-600 dark:bg-gray-700 bg-gray-300 hover:text-black hover:bg-gray-400 dark:hover:text-white w-full"
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
                                onClick={() => {
                                    updateSortMethod("date");
                                    updateNeedSort();
                                    closeDropdown();
                                }}
                                className="flex px-4 py-2 hover:dark:bg-gray-600 dark:bg-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-black dark:hover:text-white w-full"
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
                                onClick={() => {
                                    updateSortMethod("name");
                                    updateNeedSort();
                                    closeDropdown();
                                }}
                                className="flex px-4 py-2 hover:dark:bg-gray-600 dark:bg-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-black dark:hover:text-white w-full"
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
