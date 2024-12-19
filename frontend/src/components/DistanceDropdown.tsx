import { useContext, useState } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { PiPathBold } from "react-icons/pi";
import DistanceBadge from "./DistanceBadge";

const DistanceDropdown = () => {
    const {
        state: { distanceMin, distanceMax, distanceMenuOpen },
        updateDistanceMin,
        updateDistanceMax,
        setDistance,
        unsetDistance,
        toggleDistanceMenu,
        closeDistanceMenu,
    } = useContext(RaceContext);

    const [activeDistance, setActiveDistance] = useState<number>(-1);

    const wrapUnsetDistance = () => {
        toggleDistance(-1, -1, -1);
        unsetDistance();
    };

    const toggleDistance = (
        index: number,
        dist1: number | null,
        dist2: number | null = dist1
    ) => {
        if (activeDistance !== index) {
            setActiveDistance(index);
            setDistance(dist1, dist2);
        } else {
            setActiveDistance(-1);
            unsetDistance();
        }
        /*         toggleDistanceMenu(); */
    };

    return (
        <div className="relative">
            <div>
                <button
                    id="sortInfo"
                    data-dropdown-toggle="dropdownInformation"
                    type="button"
                    onClick={toggleDistanceMenu}
                    className="flex whitespace-nowrap space-x-2 text-white font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
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

                {distanceMenuOpen && (
                    <div className="absolute z-50 rounded-lg bg-gray-700 border border-blue-500 py-3 px-3 min-w-96 mt-0.5 space-y-2">
                        <div className="flex items-start place-content-between">
                            <div className="text-sm font-light text-gray-300">
                                Select a distance:
                            </div>
                            {/*                             <button
                                onClick={closeDistanceMenu}
                                className="text-gray-400"
                            >
                                <FaRegTimesCircle />
                            </button> */}
                        </div>
                        <div className="flex items-center place-content-center rounded-full pb-2">
                            {[
                                { name: "5K", distance: [3.1, 3.1] },
                                { name: "10K", distance: [6.2, 6.2] },
                                {
                                    name: "1/2 Marathon",
                                    distance: [13.1, 13.1],
                                },
                                { name: "Marathon", distance: [26.2, 26.2] },
                                { name: "Ultra", distance: [26.3, 500] },
                            ].map((dist, index) => (
                                <button
                                    onClick={() =>
                                        toggleDistance(
                                            index,
                                            dist.distance[0],
                                            dist.distance[1]
                                        )
                                    }
                                    key={"dist_button" + index}
                                >
                                    <DistanceBadge
                                        title={dist.name}
                                        active={activeDistance === index}
                                        clickable={true}
                                    />
                                </button>
                            ))}
                        </div>
                        {/*                         <hr /> */}
                        <div className="flex items-center">
                            <hr className="px-6 border border-gray-500 w-full" />
                            <div className="rounded-full border-gray-500 px-2 text-gray-400 text-sm font-semibold border-2">
                                OR
                            </div>
                            <hr className="px-6 border border-gray-500 w-full" />
                        </div>
                        <div className="pt-2 text-sm font-light text-gray-300">
                            Select a range:
                        </div>
                        <div className="rounded-lg">
                            <form
                                className="flex items-center space-x-2"
                                action="#"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <div className="flex-col items-start">
                                    <label
                                        htmlFor="min_distance"
                                        className="text-gray-200 font-medium text-sm m-1 block text-left"
                                    >
                                        Min Distance (mi)
                                    </label>
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-2 flex"
                                        value={
                                            distanceMin === null
                                                ? ""
                                                : distanceMin
                                        }
                                        onChange={updateDistanceMin}
                                    />
                                </div>
                                <span className="pt-6">to</span>
                                <div className="flex-col items-start">
                                    <label
                                        htmlFor="max_distance"
                                        className="text-gray-200 font-medium text-sm m-1 block text-left"
                                    >
                                        Max Distance (mi)
                                    </label>
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-800 p-2 flex"
                                        value={
                                            distanceMax === null
                                                ? ""
                                                : distanceMax
                                        }
                                        onChange={updateDistanceMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={wrapUnsetDistance}
                                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 border border-blue-500 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeDistanceMenu}
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

export default DistanceDropdown;
