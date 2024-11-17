import RaceCard from "./RaceCard";
import SortDropdown from "./SortDropdown";

import DataContext from "../context/RaceFeedContext";
import { useContext } from "react";

const RaceFeed = () => {
    const { searchResults } = useContext(DataContext);

    return (
        <div className="mt-3 text-left">
            <SortDropdown />
            <div className="grid grid-cols-2 gap-4 mt-3 z-0">
                {searchResults.map((race) => (
                    <RaceCard key={race.id} race={race} />
                ))}
            </div>
        </div>
    );
};

export default RaceFeed;
