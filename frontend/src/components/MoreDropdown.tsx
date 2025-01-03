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
                    <div className="absolute z-50 rounded-lg bg-gray-700 border border-dustyRose-500 py-3 px-3 min-w-80 mt-0.5 -right-36 space-y-4">
                        <div className="rounded-lg">
                            <div className="text-gray-200 font-medium text-sm flex items-center space-x-2 pb-1">
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
                                <span className="text-sm text-gray-400 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={hitempMin ?? ""}
                                        onChange={updateHitempMin}
                                    />
                                </div>
                                <span className="text-sm text-gray-400">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={hitempMax ?? ""}
                                        onChange={updateHitempMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-gray-200 font-medium text-sm flex items-center space-x-2 pb-1">
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
                                <span className="text-sm text-gray-400 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={lotempMin ?? ""}
                                        onChange={updateLotempMin}
                                    />
                                </div>
                                <span className="text-sm text-gray-400">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={lotempMax ?? ""}
                                        onChange={updateLotempMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="rounded-lg">
                            <div className="text-gray-200 font-medium text-sm flex items-center space-x-2 pb-1">
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
                                <span className="text-sm text-gray-400 sm:pl-6">
                                    between
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={precipMin ?? ""}
                                        onChange={updatePrecipMin}
                                    />
                                </div>
                                <span className="text-sm text-gray-400">
                                    and
                                </span>
                                <div className="flex-col items-start">
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-1.5 flex w-full"
                                        value={precipMax ?? ""}
                                        onChange={updatePrecipMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={unsetWeather}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-dustyRose-600 border border-dustyRose-500 hover:bg-dustyRose-700 focus:ring-dustyRose-800"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeMoreMenu}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-dustyRose-500 bg-dustyRose-600 hover:bg-dustyRose-700 focus:ring-dustyRose-800"
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
