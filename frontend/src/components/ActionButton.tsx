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
            className="flex whitespace-nowrap space-x-2 text-white font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-700 hover:bg-blue-600 hover:border-blue-400"
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
