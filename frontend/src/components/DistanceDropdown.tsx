import { useContext, useState } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { PiPathBold } from "react-icons/pi";
import DistanceBadge from "./DistanceBadge";

const DistanceDropdown = () => {
    const {
        state: { distanceMin, distanceMax },
        updateDistanceMin,
        updateDistanceMax,
        setDistance,
        unsetDistance,
    } = useContext(RaceContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [activeDistance, setActiveDistance] = useState<number>(-1);
    const [distFilter, setDistFilter] = useState<boolean>(false);
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
                    <div className="absolute z-50 rounded-lg bg-gray-800 border border-gray-700 py-3 px-3 min-w-96 mt-1 space-y-1">
                        <div className="text-sm font-light text-gray-400 pb-2">
                            Choose distance:
                        </div>
                        <div className="flex items-center place-content-center rounded-full">
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
                                >
                                    <DistanceBadge
                                        title={dist.name}
                                        active={activeDistance === index}
                                        clickable={true}
                                    />
                                </button>
                            ))}
                        </div>
                        {/*                         <div className="py-0.5 rounded-lg text-center text-gray-400">
                            {" "}
                            OR{" "}
                        </div> */}
                        <div className="text-sm font-light text-gray-400 pt-2 text-center">
                            OR
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
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2 flex"
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
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2 flex"
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistanceDropdown;
