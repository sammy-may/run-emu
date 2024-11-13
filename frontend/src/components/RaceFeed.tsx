import RaceCard from "./RaceCard";

import DataContext from "../context/RaceFeedContext";
import { useContext } from "react";

const RaceFeed = () => {
    const { searchResults } = useContext(DataContext);

    return (
        <div className="grid grid-cols-3 gap-3">
            {searchResults.map((race) => (
                <RaceCard key={race.id} race={race} />
            ))}
        </div>
    );
};

export default RaceFeed;
