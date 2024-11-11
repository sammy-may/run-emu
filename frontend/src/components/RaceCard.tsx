import React from "react";

const RaceCard = ({ name, distance }) => {
    return (
        <article className="race_card">
            <h2>{name}</h2>
            <p>Distance: {distance}</p>
        </article>
    );
};

export default RaceCard;
