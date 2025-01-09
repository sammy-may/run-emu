import { useContext } from "react";
import { IoOptions } from "react-icons/io5";
import { RaceContext } from "../context/RaceFeedContext";

import {
    FaTemperatureArrowUp,
    FaTemperatureArrowDown,
    FaCloudShowersWater,
} from "react-icons/fa6";
import ActionButton from "./ActionButton";

const MoreDropdown = () => {
    const {
        state: {
            moreMenuOpen,
            hitempMin,
            hitempMax,
            lotempMin,
            lotempMax,
            precipMin,
            precipMax,
        },
        toggleMoreMenu,
        closeMoreMenu,
        updateHitempMin,
        updateHitempMax,
        updateLotempMin,
        updateLotempMax,
        updatePrecipMin,
        updatePrecipMax,
        unsetWeather,
    } = useContext(RaceContext);

    return (
        <div className="relative pr-2 py-1">
            <div>
                <ActionButton
                    content={
                        <>
                            <div>
                                <IoOptions />
                            </div>
                            <p className="max-w-0 absolute -top-96 md:max-w-36 md:relative md:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                More
                            </p>
                        </>
                    }
                    dropdown={true}
                    onClick={toggleMoreMenu}
                />
                {moreMenuOpen && (
                    <div className="absolute z-50 rounded-lg dark:bg-gray-700 bg-gray-300 border dark:border-dustyRose-500 border-dustyRose-500 py-3 px-3 min-w-80 -right-32 space-y-4">
                        <div className="rounded-lg">
                            <div className="dark:text-gray-200 text-gray-800 font-medium text-sm flex items-center space-x-2 pb-1">
                                <span>
                                    <FaTemperatureArrowUp />
                                </span>
                                <span>High Temperature ({`\u00B0`}F)</span>
                            </div>
                            <form
                                className="flex items-center space-x-2"
                                action="#"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <span className="text-sm dark:text-gray-400 text-gray-600 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={hitempMin ?? ""}
                                        onChange={updateHitempMin}
                                    />
                                </div>
                                <span className="text-sm dark:text-gray-400 text-gray-600">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={hitempMax ?? ""}
                                        onChange={updateHitempMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="rounded-lg">
                            <div className="dark:text-gray-200 text-gray-800 font-medium text-sm flex items-center space-x-2 pb-1">
                                <span>
                                    <FaTemperatureArrowDown />
                                </span>
                                <span>Low Temperature ({`\u00B0`}F)</span>
                            </div>
                            <form
                                className="flex items-center space-x-2"
                                action="#"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <span className="text-sm dark:text-gray-400 text-gray-600 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={lotempMin ?? ""}
                                        onChange={updateLotempMin}
                                    />
                                </div>
                                <span className="text-sm dark:text-gray-400 text-gray-600">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={lotempMax ?? ""}
                                        onChange={updateLotempMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="rounded-lg">
                            <div className="dark:text-gray-200 text-gray-800 font-medium text-sm flex items-center space-x-2 pb-1">
                                <span>
                                    <FaCloudShowersWater />
                                </span>
                                <span>Chance of Precipitation (%)</span>
                            </div>
                            <form
                                className="flex items-center space-x-2"
                                action="#"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <span className="text-sm dark:text-gray-400 text-gray-600 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={precipMin ?? ""}
                                        onChange={updatePrecipMin}
                                    />
                                </div>
                                <span className="text-sm dark:text-gray-400 text-gray-600">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-1.5 flex w-full"
                                        value={precipMax ?? ""}
                                        onChange={updatePrecipMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={unsetWeather}
                                className="flex whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center dark:bg-dustyRose-600 hover:bg-dustyRose-400 border dark:border-dustyRose-500 border-dustyRose-500 hover:dark:bg-dustyRose-700 bg-dustyRose-300 focus:dark:ring-dustyRose-800 ring-dustyRose-200"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeMoreMenu}
                                className="flex whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-600 hover:bg-dustyRose-400 hover:dark:bg-dustyRose-700 bg-dustyRose-300 focus:dark:ring-dustyRose-800 ring-dustyRose-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoreDropdown;
