import RaceType from "../types/race";

const RaceCard = ({ race }: { race: RaceType }) => {
    return (
        <article className="race_card">
            <h2>{race.name}</h2>
            <p>Distance: {race.distance}</p>
        </article>
    );
};

export default RaceCard;
