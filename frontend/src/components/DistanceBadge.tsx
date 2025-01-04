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
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-mintGreen-700 bg-mintGreen-300 text-mintGreen-50 dark:border-mintGreen-500 border-mintGreen-500 border ${hover}`}
            >
                {title}
            </span>
        );
    } else {
        return (
            <span
                className={`flex items-center whitespace-nowrap text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 border dark:text-gray-200 text-gray-800`}
            >
                {title}
            </span>
        );
    }
};

export default DistanceBadge;
