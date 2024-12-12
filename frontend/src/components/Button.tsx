type ButtonProps = {
    name: string;
    icon: JSX.Element;
    href: string;
    extras?: JSX.Element | null;
};

const Button = ({ name, icon, href, extras }: ButtonProps) => {
    return (
        <a href={href}>
            <button className="h-full rounded-lg flex items-center space-x-2 px-3 py-2 border border-gray-800 bg-gray-800 hover:border-blue-600 hover:bg-gray-700 ">
                <div>{icon}</div>
                <div>{name}</div>
                <div>{extras}</div>
            </button>
        </a>
    );
};

export default Button;
