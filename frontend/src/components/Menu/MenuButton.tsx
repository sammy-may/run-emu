interface MenuButtonProps {
    icon: JSX.Element;
    text: string;
}

const MenuButton = ({ icon, text }: MenuButtonProps) => {
    return (
        <div className="group flex items-center space-x-3 hover:dark:bg-gray-800 bg-gray-200 hover:dark:border-gray-700 border-gray-300 hover:cursor-pointer py-1 border dark:border-gray-900 border-gray-100 rounded-lg w-full">
            <div className="border-2 py-2 dark:border-gray-900 border-gray-100 rounded-lg group-hover:dark:border-gray-800 border-gray-200"></div>
            <div>{icon}</div>
            <div className="dark:text-gray-200 text-gray-800 font-semibold">{text}</div>
        </div>
    );
};

export default MenuButton;
