const SearchBar = ({
    search,
    setSearch,
}: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
