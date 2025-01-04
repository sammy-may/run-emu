import { useContext, useRef, useEffect } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
    const {
        updateSearch,
        state: { search },
    } = useContext(RaceContext);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Define the keydown event handler
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/" && inputRef.current) {
                event.preventDefault(); // Prevent the default action of the `/` key (e.g., typing it in)
                inputRef.current.focus();
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="text-left relative w-full">
            <form onSubmit={(evt) => evt.preventDefault()}>
                <label
                    htmlFor="search"
                    className="block mb-2 text-base font-medium text-white absolute -top-6"
                >
                    Search Races
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder=""
                    value={search ?? ""}
                    ref={inputRef}
                    className="border px-3 py-2 text-base rounded-lg block w-full dark:bg-gray-700 bg-gray-300 dark:border-gray-600 border-gray-400 dark:placeholder-gray-400 placeholder-gray-600 dark:text-white text-black"
                    onChange={updateSearch}
                />
                {!search && (
                    <div className="absolute top-0 py-2 px-3 text-base rounded-lg flex items-center dark:text-gray-400 text-gray-600 space-x-2 pointer-events-none">
                        <div className="">
                            <IoSearchOutline />
                        </div>
                        <div className="block text-base m-auto">
                            Type{" "}
                            <kbd className="px-2 py-1.5 text-sm font-semibold border rounded-lg dark:bg-gray-600 bg-gray-400 dark:text-gray-100 text-gray-900 dark:border-gray-500 border-gray-500">
                                /
                            </kbd>{" "}
                            to search by name
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
