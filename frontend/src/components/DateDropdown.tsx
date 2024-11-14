import { useContext } from "react";
import DataContext from "../context/RaceFeedContext";

const DateDropdown = () => {
    const { setDateMin, setDateMax } = useContext(DataContext);
    return (
        <div className="min-w-24 text-left relative">
            <form
                className="flex items-center space-x-2"
                action="#"
                onSubmit={(evt) => evt.preventDefault()}
            >
                <div className="relative">
                    <label
                        htmlFor="min_date"
                        className="text-white font-medium text-sm mb-2 block text-left absolute -top-6"
                    >
                        Earliest Race Date
                    </label>
                    <input
                        type="date"
                        name="min_date"
                        id="min_date"
                        placeholder="No Min"
                        data-dropdown-toggle="dropdownInfoMin"
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                        onChange={(evt) =>
                            setDateMin(new Date(evt.target.value))
                        }
                    />
                </div>
                <div className="relative">
                    <p>--</p>
                </div>
                <div className="relative">
                    <label
                        htmlFor="max_date"
                        className="text-white font-medium text-sm mb-2 block text-left absolute -top-6"
                    >
                        Last Race Date
                    </label>
                    <input
                        type="date"
                        name="max_date"
                        id="max_date"
                        placeholder="No Max"
                        data-dropdown-toggle="dropdownInfoMax"
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 border-gray-600 bg-gray-700 p-2.5 w-full block"
                        onChange={(evt) =>
                            setDateMax(new Date(evt.target.value))
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default DateDropdown;
