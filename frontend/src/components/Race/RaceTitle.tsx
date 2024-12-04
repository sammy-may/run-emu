import React from "react";

const RaceTitle = ({ title }: { title: string }) => {
    return (
        <h2 className="text-lg font-bold tracking-tighter text-gray-200 px-3 py-3 overflow-scroll w-full whitespace-nowrap">
            {title}
        </h2>
    );
};

export default RaceTitle;
