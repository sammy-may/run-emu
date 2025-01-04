import { useUserSettings } from "../context/UserSettingsContext";

const Footer = () => {
    const { theme } = useUserSettings();

    return (
        <footer className="rounded-lg shadow dark:bg-gray-900 bg-gray-100 m-4 w-full flex items-center place-content-center">
            <div className="w-full max-w-screen-xl p-4">
                <div className="flex flex-wrap items-center place-content-between w-full">
                    <a
                        href="#"
                        className="flex items-center mb-4 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={
                                theme === "dark"
                                    ? "/images/logos/emu_wb.svg"
                                    : "/images/logos/emu_bw.svg"
                            }
                            className="h-8 filter-"
                            alt="RunEmu Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-black">
                            RunEmu
                        </span>
                    </a>
                    <ul className="flex items-center text-sm font-medium dark:text-gray-400 text-gray-600">
                        <li>
                            <a href="/about" className="hover:underline me-4">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:underline me-4">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 dark:border-gray-700 border-gray-300" />
                <span className="block text-sm dark:text-gray-400 text-gray-600">
                    © 2024{" "}
                    <a href="#" className="hover:underline">
                        RunEmu™
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
