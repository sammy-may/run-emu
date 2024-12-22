import Button from "./Button";

import { FaInfoCircle } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";

const Header = () => {
    return (
        <>
            <div className="flex items-center h-12 min-w-full max-w-full mb-8 bg-gray-800 place-content-between w-full py-2">
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
