import { useContext, useState } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { PiPathBold } from "react-icons/pi";

const DistanceDropdown = () => {
    const {
        state: { distanceMin, distanceMax },
        updateDistanceMin,
        updateDistanceMax,
    } = useContext(RaceContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div>
                <button
                    id="sortInfo"
                    data-dropdown-toggle="dropdownInformation"
                    type="button"
                    onClick={toggleDropdown}
                    className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                    <div>
                        <PiPathBold />
                    </div>
                    <p>Distance</p>
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

                {isOpen && (
                    <div className="absolute z-50 rounded-lg bg-gray-800 border border-gray-700 py-3 px-2 min-w-96 mt-1">
                        <form
                            className="flex items-center space-x-2"
                            action="#"
                            onSubmit={(evt) => evt.preventDefault()}
                        >
                            <div className="flex-col items-start">
                                <label
                                    htmlFor="min_distance"
                                    className="text-white font-medium text-sm mb-2 block text-left"
                                >
                                    Minimum Distance (mi)
                                </label>
                                <input
                                    type="text"
                                    name="min_distance"
                                    id="min_distance"
                                    placeholder="No Min"
                                    data-dropdown-toggle="dropdownInfoMin"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 flex"
                                    value={
                                        distanceMin === null ? "" : distanceMin
                                    }
                                    onChange={updateDistanceMin}
                                />
                            </div>
                            <div className="flex-col items-start">
                                <label
                                    htmlFor="max_distance"
                                    className="text-white font-medium text-sm mb-2 block text-left"
                                >
                                    Maximum Distance (mi)
                                </label>
                                <input
                                    type="text"
                                    name="max_distance"
                                    id="max_distance"
                                    placeholder="No Max"
                                    data-dropdown-toggle="dropdownInfoMax"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 flex"
                                    value={
                                        distanceMax === null ? "" : distanceMax
                                    }
                                    onChange={updateDistanceMax}
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistanceDropdown;
