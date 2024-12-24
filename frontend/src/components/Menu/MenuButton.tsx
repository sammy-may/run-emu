interface MenuButtonProps {
    icon: JSX.Element;
    text: string;
}

const MenuButton = ({ icon, text }: MenuButtonProps) => {
    return (
        <div className="group flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
            <div className="border-2 py-2 border-gray-900 rounded-lg group-hover:border-gray-800"></div>
            <div>{icon}</div>
            <div className="text-gray-200 font-semibold">{text}</div>
        </div>
    );
};

export default MenuButton;
