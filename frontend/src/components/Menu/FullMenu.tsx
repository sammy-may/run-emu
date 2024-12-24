import { useEffect, useState } from "react";

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

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

const FullMenu = ({ cats }: FullMenuProps) => {
    const MenuButton = ({ icon, text }: MenuButtonProps) => {
        const id = slugify(text);
        const active = id === visibleId;
        if (!active) {
            return (
                <a
                    id={id}
                    href={`#${id}`}
                    className="group flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full"
                >
                    <div className="border-2 py-2 border-gray-900 rounded-lg group-hover:border-gray-800"></div>
                    <div>{icon}</div>
                    <div className="text-gray-200 font-semibold">{text}</div>
                </a>
            );
        } else {
            return (
                <a
                    id={id}
                    href={`#${id}`}
                    className="group flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full"
                >
                    <div className="border-2 py-2 border-blue-500 rounded-lg"></div>
                    <div>{icon}</div>
                    <div className="text-gray-200 font-semibold">{text}</div>
                </a>
            );
        }
    };

    const MenuCat = ({ title, buttons }: MenuCatProps) => {
        return (
            <div className="space-y-1 pb-2">
                <div className="px-4 text-sm font-semibold text-gray-400">
                    {title}
                </div>
                <div className="flex flex-col items-start w-72">
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
        <div className="flex items-start px-6 max-w-screen-lg min-w-[1024px]">
            <div className="w-2/5 p-3 flex flex-col space-y-2 items-start">
                <div className="flex flex-col items-start space-y-2">
                    {cats.map((cat) => {
                        return (
                            <MenuCat title={cat.title} buttons={cat.buttons} />
                        );
                    })}
                </div>
                <div className="flex items-start">
                    <img
                        src="/images/logos/emu_color_crop.webp.png"
                        alt="RunEmu Logo"
                        className=""
                    />
                </div>
            </div>
            <div className="w-3/5 p-3">
                {contents().map((cont) => {
                    const visible = cont.id === visibleId;
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
