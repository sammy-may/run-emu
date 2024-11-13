import RaceCard from "./RaceCard";
import RaceType from "../types/race";

const RaceFeed = ({ races }: { races: RaceType[] }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            {races.map((race) => (
                <RaceCard race={race} />
            ))}
        </div>
    );
};

export default RaceFeed;
