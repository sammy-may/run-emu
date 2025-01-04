import { useEffect, useState } from "react";
import { slugify } from "../../utils/url_utils";

interface MenuButtonProps {
    icon: JSX.Element;
    text: string;
    content: JSX.Element;
}

interface MenuCatProps {
    title: string;
    buttons: MenuButtonProps[];
}

interface FullMenuProps {
    cats: MenuCatProps[];
}

const FullMenu = ({ cats }: FullMenuProps) => {
    const MenuButton = ({ icon, text }: MenuButtonProps) => {
        const id = slugify(text);
        const active = id === visibleId;
        if (!active) {
            return (
                <a
                    id={id}
                    href={`#${id}`}
                    className="group flex items-center space-x-3 hover:dark:bg-gray-800 hover:dark:border-gray-700 border-white hover:cursor-pointer py-1 border dark:border-gray-900 rounded-lg w-full"
                >
                    <div className="border-2 py-2 dark:border-gray-900 rounded-lg group-hover:dark:border-gray-800 border-white"></div>
                    <div className="text-black dark:text-white">{icon}</div>
                    <div className="dark:text-gray-200 text-gray-800 font-semibold">
                        {text}
                    </div>
                </a>
            );
        } else {
            return (
                <a
                    id={id}
                    href={`#${id}`}
                    className="group flex items-center space-x-3 hover:dark:bg-gray-800 bg-white dark:bg-gray-900 hover:dark:border-gray-700 hover:cursor-pointer py-1 border dark:border-gray-900 border-white rounded-lg w-full"
                >
                    <div className="border-2 py-2 dark:border-dustyRose-500 border-dustyRose-500 rounded-lg"></div>
                    <div className="text-black dark:text-white">{icon}</div>
                    <div className="dark:text-gray-200 text-gray-800 font-semibold">
                        {text}
                    </div>
                </a>
            );
        }
    };

    const MenuCat = ({ title, buttons }: MenuCatProps) => {
        return (
            <div className="space-y-1 pb-2">
                <div className="px-4 text-sm font-semibold dark:text-gray-400 text-gray-600">
                    {title}
                </div>
                <div className="flex flex-col items-start min-w-40">
                    {buttons.map((butt) => {
                        return (
                            <MenuButton
                                icon={butt.icon}
                                text={butt.text}
                                content={butt.content}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    const [visibleId, setVisibleId] = useState<string | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash.replace("#", "");
            setVisibleId(currentHash);
        };

        // Set initial hash on page load
        handleHashChange();

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);

        // Cleanup event listener
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const contents = () => {
        const buttons: { id: string; content: JSX.Element }[] = [];
        cats.forEach((cat) => {
            cat.buttons.forEach((butt) => {
                const id = slugify(butt.text);
                buttons.push({
                    id: id,
                    content: butt.content,
                });
            });
        });
        return buttons;
    };

    return (
        <div className="flex items-start max-w-screen-lg w-full p-1 h-full">
            <div className="w-2/5 p-3 flex flex-col space-y-2 items-center place-content-between">
                <div className="flex flex-col items-start space-y-2">
                    {cats.map((cat) => {
                        return (
                            <MenuCat title={cat.title} buttons={cat.buttons} />
                        );
                    })}
                </div>
                <div className="">
                    <img
                        src="/images/logos/emu_color_crop.webp.png"
                        alt="RunEmu Logo"
                        className="h-24"
                    />
                </div>
            </div>
            <div className="w-3/5 p-3 h-full">
                {contents().map((cont, index) => {
                    const visible =
                        cont.id === visibleId ||
                        ((visibleId === null || visibleId === "") &&
                            index === 0);
                    if (visible) {
                        return <>{cont.content}</>;
                    } else {
                        return <div className="hidden">{cont.content}</div>;
                    }
                })}
            </div>
        </div>
    );
};

export default FullMenu;
