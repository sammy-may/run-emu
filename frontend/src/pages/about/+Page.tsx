const Page = () => {
    return (
        <main className="flex flex-row place-content-evenly items-center px-3">
            <div className="basis-1/2">
                <img src="/images/logos/emu_color.webp" alt="RunEmu Logo" />
            </div>
            <div className="basis-1/2">
                <div className="text-xl text-justify border rounded-lg bg-gray-800 border-gray-700 p-12">
                    <p className="text-3xl font-medium py-4">
                        RunEmu wants you to run more.
                    </p>
                    <hr />
                    <p className="py-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Page;
