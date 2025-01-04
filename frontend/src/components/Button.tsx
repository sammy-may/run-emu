type ButtonProps = {
    name: string;
    icon: JSX.Element;
    href: string;
};

const Button = ({ name, icon, href }: ButtonProps) => {
    return (
        <a href={href}>
            <button className="h-full rounded-lg flex items-center space-x-3 px-3 py-2 border bg-gray-200 hover:text-dustyRose-900 hover:border-dustyRose-500 hover:bg-dustyRose-300 dark:border-gray-800 dark:bg-gray-800 hover:dark:border-dustyRose-500 border-gray-200 hover:dark:bg-dustyRose-700 dark:text-gray-200 text-gray-800 text-sm md:text-base">
                <div>{icon}</div>
                <div className="hidden sm:block">{name}</div>
            </button>
        </a>
    );
};

export default Button;
