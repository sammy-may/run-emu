const Footer = () => {
    return (
        <footer className="rounded-lg shadow bg-gray-900 m-4 w-full flex items-center place-content-center">
            <div className="w-full max-w-screen-xl p-4">
                <div className="flex flex-wrap items-center place-content-between w-full">
                    <a
                        href="#"
                        className="flex items-center mb-4 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="/images/logos/emu_wb.svg"
                            className="h-8 filter-"
                            alt="RunEmu Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            RunEmu
                        </span>
                    </a>
                    <ul className="flex items-center text-sm font-medium text-gray-400">
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
                <hr className="my-6 border-gray-700" />
                <span className="block text-sm text-gray-400">
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
