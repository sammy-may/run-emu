import {
    ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { PiPathBold } from "react-icons/pi";
import DistanceBadge from "./DistanceBadge";
import ActionButton from "./ActionButton";
import { useUserSettings } from "../context/UserSettingsContext";

const DistanceDropdown = () => {
    const {
        state: { distanceMin, distanceMax, distanceMenuOpen },
        setDistance,
        unsetDistance,
        toggleDistanceMenu,
        closeDistanceMenu,
    } = useContext(RaceContext);

    const { distUnits } = useUserSettings();
    const units: string = distUnits === "M" ? "Mi" : "Km";

    const [activeDistance, setActiveDistance] = useState<number>(-1);

    const wrapUnsetDistance = () => {
        toggleDistance(-1, -1, -1);
        unsetDistance();
    };

    const toggleDistance = (
        index: number,
        dist1: number | null,
        dist2: number | null = dist1,
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

    const setDistanceMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const val = evt.target.value ? Number(evt.target.value) : null;
            if (val === null) {
                setDistance(val, distanceMax === null ? null : distanceMax);
                return;
            }
            setDistance(
                distUnits === "M" ? val : val * 0.621,
                distanceMax === null ? null : distanceMax,
            );
        },
        [distUnits, distanceMin, distanceMax],
    );

    const setDistanceMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const val = evt.target.value ? Number(evt.target.value) : null;
            if (val === null) {
                setDistance(distanceMin === null ? null : distanceMin, null);
                return;
            }
            setDistance(
                distanceMin === null ? null : distanceMin,
                distUnits === "M" ? val : val * 0.621,
            );
        },
        [distUnits, distanceMin, distanceMax],
    );

    useEffect(() => {
        if (distanceMin && distanceMax) {
            if (distanceMin === distanceMax) {
                if (distanceMin === 3.1) setActiveDistance(0);
                else if (distanceMin === 6.2) setActiveDistance(1);
                else if (distanceMin === 13.1) setActiveDistance(2);
                else if (distanceMin === 26.2) setActiveDistance(3);
            } else if (distanceMin > 26.2 && distanceMax > 26.2) {
                setActiveDistance(4);
            }
        }
    }, [distanceMin, distanceMax]);

    return (
        <div className="relative pr-2 py-1">
            <div>
                <ActionButton
                    content={
                        <>
                            <div>
                                <PiPathBold />
                            </div>
                            <p className="max-w-0 absolute -top-96 md:max-w-36 md:relative md:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Distance
                            </p>
                        </>
                    }
                    dropdown={true}
                    onClick={toggleDistanceMenu}
                />

                {distanceMenuOpen && (
                    <div className="absolute z-50 rounded-lg dark:bg-gray-700 bg-gray-300 border dark:border-dustyRose-500 border-dustyRose-500 py-3 px-3 space-y-2 max-w-80 min-w-80 sm:max-w-96 sm:min-w-96">
                        <div className="flex items-start place-content-between">
                            <div className="text-sm font-light dark:text-gray-300 text-gray-700">
                                Select a distance:
                            </div>
                            {/*                             <button
                                onClick={closeDistanceMenu}
                                className="dark:text-gray-400 text-gray-600"
                            >
                                <FaRegTimesCircle />
                            </button> */}
                        </div>
                        <div className="flex flex-wrap items-center place-content-center rounded-full pb-1">
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
                                            dist.distance[1],
                                        )
                                    }
                                    key={"dist_button" + index}
                                    className="pb-1"
                                >
                                    <DistanceBadge
                                        title={dist.name}
                                        active={activeDistance === index}
                                        clickable={true}
                                        className={
                                            "dark:hover:bg-mintGreen-600 dark:hover:border-mintGreen-400 hover:bg-mintGreen-400 hover:border-mintGreen-600"
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                        {/*                         <hr /> */}
                        <div className="flex items-center">
                            <hr className="px-6 border dark:border-gray-500 border-gray-500 w-full" />
                            <div className="rounded-full dark:border-gray-500 border-gray-500 px-2 dark:text-gray-400 text-gray-600 text-sm font-semibold border-2">
                                OR
                            </div>
                            <hr className="px-6 border dark:border-gray-500 border-gray-500 w-full" />
                        </div>
                        <div className="pt-2 text-sm font-light dark:text-gray-300 text-gray-700">
                            Select a range:
                        </div>
                        <div className="rounded-lg">
                            <form
                                className="flex flex-wrap items-center"
                                action="#"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <div className="flex-col items-start px-1">
                                    <label
                                        htmlFor="min_distance"
                                        className="dark:text-gray-200 text-gray-800 font-medium text-sm m-1 block text-left"
                                    >
                                        Min Distance ({units})
                                    </label>
                                    <input
                                        type="text"
                                        name="min_distance"
                                        id="min_distance"
                                        placeholder="No Min"
                                        data-dropdown-toggle="dropdownInfoMin"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-2 flex"
                                        value={
                                            distanceMin === null
                                                ? ""
                                                : distUnits === "M"
                                                  ? Math.round(
                                                        distanceMin * 10,
                                                    ) / 10
                                                  : Math.round(
                                                        (distanceMin * 10) /
                                                            0.621,
                                                    ) / 10
                                        }
                                        onChange={setDistanceMin}
                                    />
                                    <span className="pl-12">to</span>
                                </div>
                                <div className="flex-col items-start px-1">
                                    <label
                                        htmlFor="max_distance"
                                        className="dark:text-gray-200 text-gray-800 font-medium text-sm m-1 block text-left"
                                    >
                                        Max Distance ({units})
                                    </label>
                                    <input
                                        type="text"
                                        name="max_distance"
                                        id="max_distance"
                                        placeholder="No Max"
                                        data-dropdown-toggle="dropdownInfoMax"
                                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-2 flex"
                                        value={
                                            distanceMax === null
                                                ? ""
                                                : distUnits === "M"
                                                  ? Math.round(
                                                        distanceMax * 10,
                                                    ) / 10
                                                  : Math.round(
                                                        (distanceMax * 10) /
                                                            0.621,
                                                    ) / 10
                                        }
                                        onChange={setDistanceMax}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={wrapUnsetDistance}
                                className="flex text-sm whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg py-1 px-3 text-center items-center dark:bg-dustyRose-600 hover:bg-dustyRose-400 border dark:border-dustyRose-400 hover:border-dustyRose-600 hover:dark:bg-dustyRose-700 bg-dustyRose-300 hover:dark:border-dustyRose-500 border-dustyRose-500"
                            >
                                <div>Clear</div>
                            </button>
                            <button
                                onClick={closeDistanceMenu}
                                className="flex text-sm whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg py-1 px-3 text-center items-center dark:bg-dustyRose-600 hover:bg-dustyRose-400 border dark:border-dustyRose-400 hover:border-dustyRose-600 hover:dark:bg-dustyRose-700 bg-dustyRose-300 hover:dark:border-dustyRose-500 border-dustyRose-500"
                            >
                                <div>Done</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistanceDropdown;
