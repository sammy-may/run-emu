import RaceType from "../types/race";

const RaceCard = ({ race }: { race: RaceType }) => {
    return (
        <article className="race_card">
            <h2 className="bg-blue-400">{race.name}</h2>
            <p className="shadow-teal-500">Distance: {race.distance}</p>
        </article>
    );
};

export default RaceCard;
