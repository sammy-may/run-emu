import Button from "./Button";

const Header = () => {
    return (
        <>
            <div className="flex h-12 min-w-full justify-end">
                <div>
                    <Button name={"Run Emu"}></Button>
                </div>
                <div>
                    <Button name={"About"}></Button>
                </div>
                <div>
                    <Button name={"Login"}></Button>
                </div>
            </div>
        </>
    );
};

export default Header;
