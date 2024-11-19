import RaceCard from "./RaceCard";
import SortDropdown from "./SortDropdown";

import { RaceContext } from "../context/RaceFeedContext";
import { useContext } from "react";

const RaceFeed = () => {
    const {
        state: { mapResults },
    } = useContext(RaceContext);

    return (
        <div className="mt-3 text-left">
            <SortDropdown />
            <div className="grid grid-cols-2 gap-4 mt-3 z-0">
                {mapResults.map((race, index) => (
                    <RaceCard index={index} race={race} />
                ))}
            </div>
        </div>
    );
};

export default RaceFeed;
