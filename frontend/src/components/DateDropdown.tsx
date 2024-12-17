import { useContext } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { FaRegCalendarAlt } from "react-icons/fa";

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
        <div className="relative">
            <div>
                <button
                    id="sortInfo"
                    data-dropdown-toggle="dropdownInformation"
                    type="button"
                    onClick={toggleDateMenu}
                    className="flex whitespace-nowrap space-x-2 text-white font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                    <div>
                        <FaRegCalendarAlt />
                    </div>
                    <p>Date</p>
                    <svg
                        className="w-2.5 h-2.5"
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

                {dateMenuOpen && (
                    <div className="absolute z-50 rounded-lg bg-gray-700 border border-indigo-400 py-3 px-3 mt-1 space-y-3">
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
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeDateMenu}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
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
