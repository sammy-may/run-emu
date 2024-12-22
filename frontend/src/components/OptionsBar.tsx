import SearchBar from "./SearchBar";
import DistanceDropdown from "./DistanceDropdown";
import DateDropdown from "./DateDropdown";
import SortDropdown from "./SortDropdown";
import MoreDropdown from "./MoreDropdown";

const OptionsBar = () => {
    return (
        <div>
            <div className="flex items-center min-w-full place-content-start space-x-6">
                <SearchBar></SearchBar>
            </div>
            <div className="flex flex-wrap items-center place-items-start md:place-content-between py-1">
                <div className="flex items-center space-x-2 py-1 pr-3">
                    <DistanceDropdown />
                    <DateDropdown />
                    <MoreDropdown />
                </div>
                <div className="py-1 pr-1">
                    <SortDropdown />
                </div>
            </div>
        </div>
    );
};

export default OptionsBar;
