import { useContext } from "react";
import { RaceContext } from "../context/RaceFeedContext";

const RangeSlider = () => {
    const { distanceMin, setDistanceMin, distanceMax, setDistanceMax } =
        useContext(DataContext);

    return (
        <div className="flex h-12 min-w-full items-center space-x-4">
            <label
                htmlFor="min-distance"
                className="block mb-2 text-sm font-medium text-white"
            >
                Minimum distance: {distanceMin}
            </label>
            <input
                id="min-distance"
                type="range"
                min="0"
                max="100"
                className="h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 max-w-30"
                value={distanceMin}
                onChange={(evt) => setDistanceMin(Number(evt.target.value))}
            ></input>
            <label
                htmlFor="max-distance"
                className="block mb-2 text-sm font-medium text-white"
            >
                Maximum distance: {distanceMax}
            </label>
            <input
                id="max-distance"
                type="range"
                min="0"
                max="100"
                className="h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 max-w-30"
                value={distanceMax}
                onChange={(evt) => setDistanceMax(Number(evt.target.value))}
            ></input>
        </div>
    );
};

export default RangeSlider;
