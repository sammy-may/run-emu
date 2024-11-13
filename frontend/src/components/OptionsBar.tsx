import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";
import SortDropdown from "./SortDropdown";

import RaceType from "../types/race";

const OptionsBar = ({
    search,
    setSearch,
    distanceMin,
    setDistanceMin,
    distanceMax,
    setDistanceMax,
    searchResults,
    setSearchResults,
}: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    distanceMin: number;
    setDistanceMin: React.Dispatch<React.SetStateAction<number>>;
    distanceMax: number;
    setDistanceMax: React.Dispatch<React.SetStateAction<number>>;
    searchResults: RaceType[];
    setSearchResults: React.Dispatch<React.SetStateAction<RaceType[]>>;
}) => {
    return (
        <div className="flex h-12 min-w-full">
            <SearchBar search={search} setSearch={setSearch}></SearchBar>
            <SortDropdown
                searchResults={searchResults}
                setSearchResults={setSearchResults}
            ></SortDropdown>
            <RangeSlider
                distanceMin={distanceMin}
                setDistanceMin={setDistanceMin}
                distanceMax={distanceMax}
                setDistanceMax={setDistanceMax}
            ></RangeSlider>
        </div>
    );
};

export default OptionsBar;
