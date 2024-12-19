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
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-200 border-green-700 ${hover}`}
            >
                {title}
            </span>
        );
    } else {
        return (
            <span
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-200 ${hover}`}
            >
                {title}
            </span>
        );
    }
};

export default DistanceBadge;
