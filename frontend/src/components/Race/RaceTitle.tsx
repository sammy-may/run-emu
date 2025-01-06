const RaceTitle = ({
    title,
    className,
}: {
    title: string;
    className: string;
}) => {
    return (
        <h2
            className={`text-lg font-bold dark:text-gray-200 text-gray-800 px-3 py-3 w-full overflow-x-auto ${className}`}
        >
            {title}
        </h2>
    );
};

export default RaceTitle;
