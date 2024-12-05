type ButtonProps = {
    name: string;
    icon: JSX.Element;
    href: string;
};

const Button = ({ name, icon, href }: ButtonProps) => {
    return (
        <a href={href}>
            <button className="rounded-full flex items-center space-x-2 py-1 px-3 border border-gray-800 bg-gray-800 hover:border-indigo-400 hover:bg-gray-700">
                <div>{icon}</div>
                <div>{name}</div>
            </button>
        </a>
    );
};

export default Button;
