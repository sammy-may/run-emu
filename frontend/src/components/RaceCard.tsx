import RaceType from "../types/race";

const RaceCard = ({ race }: { race: RaceType }) => {
    return (
        <div className="race_card max-w-48">
            <h2 className="bg-blue-400">{race.name}</h2>
            <p className="shadow-teal-500">Distance: {race.distance}</p>
        </div>
    );
};

export default RaceCard;
