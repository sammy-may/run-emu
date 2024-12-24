import MenuButton from "./MenuButton";

interface MenuCategoryProps {
    title: string;
    buttons: ReturnType<typeof MenuButton>[];
}

const MenuCategory = ({ title, buttons }: MenuCategoryProps) => {
    return (
        <div className="space-y-1 pb-2">
            <div className="px-4 text-sm font-semibold">{title}</div>
            <div className="flex flex-col items-start w-72">
                {buttons.map((butt) => {
                    return <>{butt}</>;
                })}
            </div>
        </div>
    );
};

export default MenuCategory;
