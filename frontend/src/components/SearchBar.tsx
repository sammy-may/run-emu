import { useContext } from "react";
import DataContext from "../context/RaceFeedContext";

const SearchBar = () => {
    const { search, setSearch } = useContext(DataContext);
    return (
        <div className="min-w-48 text-left relative">
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
                    placeholder="Try 'marathon'..."
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    value={search}
                    onChange={(evt) => setSearch(evt.target.value)}
                />
            </form>
        </div>
    );
};

export default SearchBar;
