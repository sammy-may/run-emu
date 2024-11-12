import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";

const OptionsBar = ({
    search,
    setSearch,
    distanceMin,
    setDistanceMin,
    distanceMax,
    setDistanceMax,
}: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    distanceMin: number;
    setDistanceMin: React.Dispatch<React.SetStateAction<number>>;
    distanceMax: number;
    setDistanceMax: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="flex h-12 min-w-full">
            <SearchBar search={search} setSearch={setSearch}></SearchBar>
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
