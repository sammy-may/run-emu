import Button from "./Button";

const Header = () => {
    return (
        <>
            <ul className="card">
                <li>Run Emu</li>
                <li>
                    <Button name={"Home"}></Button>
                </li>
                <li>
                    <Button name={"Login"}></Button>
                </li>
            </ul>
        </>
    );
};

export default Header;
