import SearchBar from "./SearchBar";
import DistanceDropdown from "./DistanceDropdown";
import DateDropdown from "./DateDropdown";
import SortDropdown from "./SortDropdown";

const OptionsBar = () => {
    return (
        <div>
            <div className="flex items-center h-12 min-w-full place-content-start space-x-6 mb-3">
                <SearchBar></SearchBar>
            </div>
            <div className="flex items-center space-x-3 place-content-start">
                <SortDropdown />
                <DistanceDropdown />
                <DateDropdown />
            </div>
        </div>
    );
};

export default OptionsBar;
