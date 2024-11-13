import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";
import SortDropdown from "./SortDropdown";

const OptionsBar = () => {
    return (
        <div className="flex items-center h-12 min-w-full space-x-4">
            <SearchBar></SearchBar>
            <SortDropdown></SortDropdown>
            <RangeSlider></RangeSlider>
        </div>
    );
};

export default OptionsBar;
