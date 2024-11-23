import React from "react";

const DistanceBadge = ({ title }: { title: string }) => {
    return (
        <span className="flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-200">
            {title}
        </span>
    );
};

export default DistanceBadge;
