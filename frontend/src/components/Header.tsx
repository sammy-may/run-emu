import Button from "./Button";

import { useNavigate } from "react-router-dom";

import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex h-12 min-w-full mb-8 bg-gray-800 rounded-lg place-content-between">
                <div>
                    <Button
                        name={"Run Emu"}
                        icon={<FaHome />}
                        onClick={() => {
                            navigate("/");
                        }}
                    ></Button>
                </div>
                <div className="flex">
                    <div>
                        <Button
                            name={"About"}
                            icon={<FaInfoCircle />}
                            onClick={() => {
                                navigate("/about");
                            }}
                        ></Button>
                    </div>
                    <div>
                        <Button
                            name={"Login"}
                            icon={<MdLogin />}
                            onClick={() => {
                                navigate("/login");
                            }}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
