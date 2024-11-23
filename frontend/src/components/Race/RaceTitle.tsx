import React from "react";

const RaceTitle = ({ title }: { title: string }) => {
    return (
        <h2 className="text-xl font-bold tracking-tight text-gray-200 px-3 py-3 overflow-auto whitespace-nowrap">
            {title}
        </h2>
    );
};

export default RaceTitle;
