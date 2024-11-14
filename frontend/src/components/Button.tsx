import { IconType } from "react-icons";

type ButtonProps = {
    name: string;
    icon: JSX.Element;
    onClick: () => void;
};

const Button = ({ name, icon, onClick }: ButtonProps) => {
    return (
        <button
            className="rounded-full flex items-center space-x-2"
            onClick={onClick}
        >
            <div>{icon}</div>
            <div>{name}</div>
        </button>
    );
};

export default Button;
