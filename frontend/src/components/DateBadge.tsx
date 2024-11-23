import React from "react";

const DateBadge = ({ title }: { title: string }) => {
    return (
        <span className="flex text-sm items-center font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-200 ">
            {title}
        </span>
    );
};

export default DateBadge;
