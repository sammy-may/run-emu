import React from "react";
import RaceCard from "./RaceCard";

const RaceFeed = ({ races }) => {
    return (
        <>
            {races.map((race) => (
                <RaceCard
                    key={race.id}
                    name={race.name}
                    distance={race.distance}
                />
            ))}
        </>
    );
};

export default RaceFeed;
