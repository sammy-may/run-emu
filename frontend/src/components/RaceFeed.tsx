import RaceCard from "./RaceCard";
import SortDropdown from "./SortDropdown";

import DataContext from "../context/RaceFeedContext";
import { useContext } from "react";

const RaceFeed = () => {
    const { searchResults } = useContext(DataContext);

    return (
        <div className="mt-8 text-left">
            <SortDropdown />
            <div className="grid grid-cols-3 gap-3 my-4 z-0">
                {searchResults.map((race) => (
                    <RaceCard key={race.id} race={race} />
                ))}
            </div>
        </div>
    );
};

export default RaceFeed;
