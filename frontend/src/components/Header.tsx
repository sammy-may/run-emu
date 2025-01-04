import Button from "./Button";

import { FaInfoCircle } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { useUserSettings } from "../context/UserSettingsContext";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
    const { toggleTheme } = useUserSettings();
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false);

    const toggleSettingsMenu = () => {
        setSettingsMenuOpen((settingsMenuOpen) => !settingsMenuOpen);
    };

    return (
        <>
            <div className="flex items-center h-12 min-w-full max-w-full mb-3 bg-gray-800 place-content-between w-full py-2">
                <div className="flex items-center space-x-3 h-full">
                    <Button
                        name={"RunEmu"}
                        icon={
                            <img
                                src="/images/logos/emu_wb.svg"
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
                            className="h-full rounded-lg flex items-center space-x-3 px-3 py-2 border border-gray-800 bg-gray-800 hover:border-dustyRose-500 hover:bg-dustyRose-700 hover:text-dustyRose-50 text-gray-200 text-sm md:text-base"
                            onClick={toggleSettingsMenu}
                        >
                            <div>
                                <FiSettings />
                            </div>
                            <div>Settings</div>
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
                            <div className="absolute top-11 right-0 rounded-lg bg-gray-700 z-50 flex flex-col space-y-2">
                                <div
                                    className="py-2 px-3 flex items-center space-x-2 text-xl place-content-center hover:cursor-pointer hover:bg-gray-600 rounded-lg"
                                    onClick={toggleTheme}
                                >
                                    <div className="dark:text-white text-gray-400">
                                        <MdDarkMode />
                                    </div>
                                    <div className=" dark:text-gray-400 text-yellow-100">
                                        <MdLightMode />
                                    </div>
                                </div>
                                <div className="py-1 px-3">Miles/km</div>
                            </div>
                        )}
                    </div>
                    <div>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
