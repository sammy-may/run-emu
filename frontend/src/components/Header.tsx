import Button from "./Button";

//import { FaInfoCircle } from "react-icons/fa";
//import { FaSignInAlt } from "react-icons/fa";
import { useUserSettings } from "../context/UserSettingsContext";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
    const { theme, toggleTheme } = useUserSettings();
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false);

    const toggleSettingsMenu = () => {
        setSettingsMenuOpen((settingsMenuOpen) => !settingsMenuOpen);
    };

    return (
        <>
            <div className="flex items-center h-12 min-w-full max-w-full mb-3 lg:mb-3 dark:bg-gray-800 bg-gray-200 place-content-between w-full py-2">
                <div className="flex items-center space-x-3 h-full">
                    <Button
                        name={"RunEmu"}
                        icon={
                            <img
                                src={
                                    theme === "dark"
                                        ? "/images/logos/emu_wb.svg"
                                        : "/images/logos/emu_bw.svg"
                                }
                                className="h-5"
                                alt="RunEmu Logo"
                            />
                        }
                        href={"/"}
                    ></Button>
                    {/*                     <div>
                        <Button
                            name={"Training"}
                            icon={<FaRunning />}
                            href={"/training"}
                        ></Button>
                    </div>
                    <div>
                        <Button
                            name={"Blog"}
                            icon={<MdOutlineArticle />}
                            href={"#"}
                        ></Button>
                    </div> */}
                </div>
                <div className="flex items-center space-x-3 h-full">
                    {/*                     <div>
                        <Button
                            name={"Settings"}
                            icon={<FiSettings />}
                            href={"#"}
                        ></Button>
                    </div> */}
                    <div className="relative flex">
                        <button
                            className="h-full rounded-lg flex items-center space-x-3 px-3 py-2 border dark:border-gray-800 border-gray-200 dark:bg-gray-800 bg-gray-200 hover:dark:border-dustyRose-500 hover:border-dustyRose-500 hover:dark:bg-dustyRose-700 hover:bg-dustyRose-300 hover:text-dustyRose-900 dark:text-gray-200 text-gray-800 text-sm md:text-base"
                            onClick={toggleSettingsMenu}
                        >
                            <div>
                                <FiSettings />
                            </div>
                            <div className="hidden sm:block">Settings</div>
                            <div>
                                <svg
                                    className="w-2.5 h-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </div>
                        </button>
                        {settingsMenuOpen && (
                            <div className="absolute top-8 sm:top-10 right-0 rounded-lg z-50 flex flex-col space-y-2">
                                <div className="py-2 px-3 flex items-center space-x-2 text-xl place-content-center dark:bg-gray-800 bg-gray-200 rounded-lg">
                                    <div className="dark:text-white text-gray-400">
                                        <MdDarkMode />
                                    </div>
                                    <div
                                        onClick={toggleTheme}
                                        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                                            theme === "light"
                                                ? "bg-blue-500"
                                                : "bg-blue-500"
                                        }`}
                                    >
                                        <div
                                            className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                                                theme === "light"
                                                    ? "transform translate-x-8"
                                                    : ""
                                            }`}
                                        ></div>
                                    </div>
                                    <div className=" dark:text-gray-500 text-black">
                                        <MdLightMode />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/*                     <div>
                        <Button
                            name={"About"}
                            icon={<FaInfoCircle />}
                            href={"/about"}
                        ></Button>
                    </div>
                    <div>
                        <Button
                            name={"Login"}
                            icon={<FaSignInAlt />}
                            href={"/login"}
                        ></Button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Header;
