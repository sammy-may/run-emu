import { useContext } from "react";
import DataContext from "../context/RaceFeedContext";

const RangeSlider = () => {
    const { distanceMin, setDistanceMin, distanceMax, setDistanceMax } =
        useContext(DataContext);

    return (
        <div className="flex h-12 min-w-full">
            <label htmlFor="min-distance">
                Minimum distance: {distanceMin}
            </label>
            <input
                id="min-distance"
                type="range"
                min="0"
                max="100"
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 max-w-30"
                value={distanceMin}
                onChange={(evt) => setDistanceMin(Number(evt.target.value))}
            ></input>
            <label htmlFor="max-distance">
                Maximum distance: {distanceMax}
            </label>
            <input
                id="max-distance"
                type="range"
                min="0"
                max="100"
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 max-w-30"
                value={distanceMax}
                onChange={(evt) => setDistanceMax(Number(evt.target.value))}
            ></input>
        </div>
    );
};

export default RangeSlider;
