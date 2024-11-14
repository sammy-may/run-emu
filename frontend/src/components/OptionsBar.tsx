import SearchBar from "./SearchBar";
import DistanceDropdown from "./DistanceDropdown";
import DateDropdown from "./DateDropdown";

const OptionsBar = () => {
    return (
        <div className="flex items-center h-12 min-w-full place-content-start space-x-12 mb-4">
            <SearchBar></SearchBar>
            <DistanceDropdown />
            <DateDropdown />
        </div>
    );
};

export default OptionsBar;
