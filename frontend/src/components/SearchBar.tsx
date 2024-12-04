import { useContext } from "react";
import { RaceContext } from "../context/RaceFeedContext";

const SearchBar = () => {
    const { updateSearch } = useContext(RaceContext);

    return (
        <div className="text-left relative w-full">
            <form onSubmit={(evt) => evt.preventDefault()}>
                <label
                    htmlFor="search"
                    className="block mb-2 text-sm font-medium text-white absolute -top-6"
                >
                    Search Races
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Try 'california international marathon'..."
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={updateSearch}
                />
            </form>
        </div>
    );
};

export default SearchBar;
