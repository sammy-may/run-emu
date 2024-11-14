type ButtonProps = {
    name: string;
    onClick?: () => void;
};

const Button = ({ name, onClick }: ButtonProps) => {
    return (
        <button className="rounded-full" onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;
