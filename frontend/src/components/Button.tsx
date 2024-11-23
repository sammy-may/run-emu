import { IconType } from "react-icons";

type ButtonProps = {
    name: string;
    icon: JSX.Element;
    onClick: () => void;
};

const Button = ({ name, icon, onClick }: ButtonProps) => {
    return (
        <button
            className="rounded-full flex items-center space-x-2 py-1 px-3 border border-gray-800 bg-gray-800 hover:border-indigo-400 hover:bg-gray-700"
            onClick={onClick}
        >
            <div>{icon}</div>
            <div>{name}</div>
        </button>
    );
};

export default Button;
