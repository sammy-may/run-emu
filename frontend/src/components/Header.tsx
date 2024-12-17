import Button from "./Button";

import { FaInfoCircle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <div className="flex items-center h-12 min-w-full mb-8 bg-gray-800 rounded-lg place-content-between">
                <div className="flex h-full">
                    <Button
                        name={"RunEmu"}
                        icon={
                            <img
                                src="/images/logos/emu_wb.svg"
                                className="h-6"
                                alt="RunEmu Logo"
                            />
                        }
                        href={"/"}
                    ></Button>
                </div>
                <div className="flex items-center space-x-3 h-full">
                    <div>
                        <Button
                            name={"Settings"}
                            icon={<FiSettings />}
                            href={"#"}
                        ></Button>
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
