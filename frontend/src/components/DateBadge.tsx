const DateBadge = ({ title }: { title: string }) => {
    return (
        <span className="flex text-sm items-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 bg-green-100 dark:text-green-200 text-green-800 ">
            {title}
        </span>
    );
};

export default DateBadge;
