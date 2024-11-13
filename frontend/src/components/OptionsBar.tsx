import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";
import SortDropdown from "./SortDropdown";

const OptionsBar = ({}: {}) => {
    return (
        <div className="flex h-12 min-w-full">
            <SearchBar></SearchBar>
            <SortDropdown></SortDropdown>
            <RangeSlider></RangeSlider>
        </div>
    );
};

export default OptionsBar;
