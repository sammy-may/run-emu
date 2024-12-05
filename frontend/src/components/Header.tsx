import Button from "./Button";

import { FaInfoCircle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

const Header = () => {
    return (
        <>
            <div className="flex items-center h-12 min-w-full mb-8 bg-gray-800 rounded-lg place-content-between">
                <div>
                    <Button
                        name={"RunEmu"}
                        icon={
                            <img
                                src="/images/logos/emu_wb.svg"
                                className="h-8 filter-"
                                alt="RunEmu Logo"
                            />
                        }
                        href={"/"}
                    ></Button>
                </div>
                <div className="flex">
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
                            icon={<MdLogin />}
                            href={"/login"}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
