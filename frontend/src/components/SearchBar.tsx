import { useContext } from "react";
import DataContext from "../context/RaceFeedContext";

const SearchBar = () => {
    const { search, setSearch } = useContext(DataContext);
    return (
        <>
            <form
                className="search_form"
                onSubmit={(evt) => evt.preventDefault()}
            >
                <label htmlFor="search"> Search Races </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Find a race..."
                    value={search}
                    onChange={(evt) => setSearch(evt.target.value)}
                />
            </form>
        </>
    );
};

export default SearchBar;
