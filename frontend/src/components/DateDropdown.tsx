import { useContext } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { FaRegCalendarAlt } from "react-icons/fa";
import ActionButton from "./ActionButton";

const DateDropdown = () => {
    const {
        state: { dateMin, dateMax, dateMenuOpen },
        updateDateMin,
        updateDateMax,
        toggleDateMenu,
        closeDateMenu,
        clearDates,
    } = useContext(RaceContext);

    return (
        <div className="relative pr-2 py-1">
            <div>
                <ActionButton
                    content={
                        <>
                            <div>
                                <FaRegCalendarAlt />
                            </div>
                            <p className="max-w-0 absolute -top-96 sm:max-w-36 sm:relative sm:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Date
                            </p>
                        </>
                    }
                    dropdown={true}
                    onClick={toggleDateMenu}
                />
                {dateMenuOpen && (
                    <div className="absolute z-50 rounded-lg bg-gray-700 border border-blue-500 py-3 px-3 mt-0.5 space-y-3">
                        <form
                            className="flex items-center space-x-2 place-content-between"
                            action="#"
                            onSubmit={(evt) => evt.preventDefault()}
                        >
                            <div className="flex-col items-start">
                                <label
                                    htmlFor="min_date"
                                    className="text-white font-medium text-sm mb-2 block text-left px-1"
                                >
                                    From
                                </label>
                                <input
                                    type="date"
                                    name="min_date"
                                    id="min_date"
                                    placeholder="No Min"
                                    data-dropdown-toggle="dropdownInfoMin"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-2.5 w-full block"
                                    value={
                                        dateMin === null
                                            ? ""
                                            : dateMin.toISOString().slice(0, 10)
                                    }
                                    onChange={updateDateMin}
                                />
                            </div>
                            <div className="flex-col items-start">
                                <label
                                    htmlFor="max_date"
                                    className="text-white font-medium text-sm mb-2 block text-left px-1"
                                >
                                    To
                                </label>
                                <input
                                    type="date"
                                    name="max_date"
                                    id="max_date"
                                    placeholder="No Max"
                                    data-dropdown-toggle="dropdownInfoMax"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-2.5 w-full block"
                                    value={
                                        dateMax === null
                                            ? ""
                                            : dateMax.toISOString().slice(0, 10)
                                    }
                                    onChange={updateDateMax}
                                />
                            </div>
                        </form>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={clearDates}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 border border-blue-500 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeDateMenu}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 border border-blue-500 hover:bg-blue-700 focus:ring-blue-800"
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

export default DateDropdown;
