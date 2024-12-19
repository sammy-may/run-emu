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
                    className="block mb-2 text-sm font-medium text-white absolute -top-6"
                >
                    Search Races
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder=""
                    ref={inputRef}
                    className="border px-3 py-2 text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    onChange={updateSearch}
                />
                {!search && (
                    <div className="absolute top-0 py-2 px-3 text-sm rounded-lg flex items-center text-gray-400 space-x-2">
                        <div className="">
                            <IoSearchOutline />
                        </div>
                        <div className="block text-sm">
                            Type{" "}
                            <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-600 text-gray-100 border-gray-500">
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
