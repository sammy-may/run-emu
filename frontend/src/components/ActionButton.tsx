type ActionButtonProps = {
    content: JSX.Element;
    dropdown: boolean;
    onClick: () => any;
};

const ActionButton = ({ content, dropdown, onClick }: ActionButtonProps) => {
    return (
        <button
            id="sortInfo"
            type="button"
            onClick={onClick}
            className="flex whitespace-nowrap space-x-2 dark:text-dustyRose-50 text-dustyRose-900 font-medium rounded-lg text-sm py-1 px-3 text-center items-center border dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-700 bg-dustyRose-300 hover:dark:bg-dustyRose-600 hover:bg-dustyRose-400 hover:dark:border-dustyRose-400 hover:border-dustyRose-600"
        >
            {content}
            {dropdown && (
                <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            )}
        </button>
    );
};

export default ActionButton;
