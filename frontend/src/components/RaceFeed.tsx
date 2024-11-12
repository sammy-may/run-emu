import RaceCard from "./RaceCard";
import RaceType from "../types/race";

const RaceFeed = ({ races }: { races: RaceType[] }) => {
    return (
        <>
            {races.map((race) => (
                <RaceCard race={race} />
            ))}
        </>
    );
};

export default RaceFeed;
