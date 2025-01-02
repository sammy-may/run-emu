const DistanceBadge = ({
    title,
    active,
    clickable = false,
}: {
    title: string;
    active: boolean;
    clickable?: boolean;
}) => {
    const hover = clickable
        ? "border border-gray-900 hover:border-green-700"
        : "";
    if (active) {
        return (
            <span
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-mintGreen-700 text-mintGreen-50 border-mintGreen-500 border ${hover}`}
            >
                {title}
            </span>
        );
    } else {
        return (
            <span
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-gray-900 border-gray-700 border text-gray-200`}
            >
                {title}
            </span>
        );
    }
};

export default DistanceBadge;
