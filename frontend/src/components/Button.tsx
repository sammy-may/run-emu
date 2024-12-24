type ButtonProps = {
    name: string;
    icon: JSX.Element;
    href: string;
};

const Button = ({ name, icon, href }: ButtonProps) => {
    return (
        <a href={href}>
            <button className="h-full rounded-lg flex items-center space-x-3 px-3 py-2 border border-gray-800 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 text-gray-200 text-sm md:text-base">
                <div>{icon}</div>
                <div>{name}</div>
            </button>
        </a>
    );
};

export default Button;
