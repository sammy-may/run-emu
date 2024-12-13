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
            <div className="flex items-end space-x-3 place-content-between py-3">
                <div className="flex items-center space-x-3">
                    <DistanceDropdown />
                    <DateDropdown />
                    <MoreDropdown />
                </div>
                <div>
                    <SortDropdown />
                </div>
            </div>
        </div>
    );
};

export default OptionsBar;
