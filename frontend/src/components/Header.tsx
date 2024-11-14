import Button from "./Button";

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex h-12 min-w-full justify-end mb-8 bg-gray-800 rounded-lg">
                <div>
                    <Button
                        name={"Run Emu"}
                        onClick={() => {
                            navigate("/");
                        }}
                    ></Button>
                </div>
                <div>
                    <Button
                        name={"About"}
                        onClick={() => {
                            navigate("/about");
                        }}
                    ></Button>
                </div>
                <div>
                    <Button name={"Login"}></Button>
                </div>
            </div>
        </>
    );
};

export default Header;
