import { useContext } from "react";
import DataContext from "../context/RaceFeedContext";

const DistanceDropdown = () => {
    const { setDistanceMin, setDistanceMax } = useContext(DataContext);

    return (
        <div className="min-w-24 text-left relative">
            <form
                className="flex items-center space-x-2"
                action="#"
                onSubmit={(evt) => evt.preventDefault()}
            >
                <div className="relative">
                    <label
                        htmlFor="min_distance"
                        className="text-white font-medium text-sm mb-2 block text-left absolute -top-6"
                    >
                        Minimum Distance
                    </label>
                    <input
                        type="text"
                        name="min_distance"
                        id="min_distance"
                        placeholder="No Min"
                        data-dropdown-toggle="dropdownInfoMin"
                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                        onChange={(evt) =>
                            setDistanceMin(Number(evt.target.value))
                        }
                    />
                </div>
                <div className="relative">
                    <p>--</p>
                </div>
                <div className="relative">
                    <label
                        htmlFor="max_distance"
                        className="text-white font-medium text-sm mb-2 block text-left absolute -top-6"
                    >
                        Maximum Distance
                    </label>
                    <input
                        type="text"
                        name="max_distance"
                        id="max_distance"
                        placeholder="No Max"
                        data-dropdown-toggle="dropdownInfoMax"
                        className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                        onChange={(evt) =>
                            setDistanceMax(Number(evt.target.value))
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default DistanceDropdown;
