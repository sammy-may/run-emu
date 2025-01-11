import { TiDelete } from "react-icons/ti";
import { IoMdInformationCircleOutline } from "react-icons/io";

const SubHeader = () => {
    return (
        <div className="flex items-center space-x-2 h-12 min-w-full max-w-full -mt-3 mb-3 lg:mb-3 dark:bg-periwinkleBlue-900 dark:text-periwinkleBlue-200 bg-periwinkleBlue-200 text-periwinkleBlue-900 place-content-between w-full py-1 text-sm font-semibold">
            <div className="pl-4 flex items-center space-x-2">
                <div>How does RunEmu work?</div>
                <div className="px-2 rounded-lg hover:cursor-pointer flex items-center sm:space-x-2 border border-periwinkleBlue-200 dark:border-periwinkleBlue-900 dark:hover:bg-periwinkleBlue-800 dark:hover:border-periwinkleBlue-600 hover:border-periwinkleBlue-600 hover:bg-periwinkleBlue-400 py-2">
                    <div className="hidden sm:block">Open Tutorial</div>
                    <div className="text-lg">
                        <IoMdInformationCircleOutline />
                    </div>
                </div>
            </div>
            <div className="px-2">
                <div className="px-2 rounded-lg hover:cursor-pointer flex items-center border border-periwinkleBlue-200 dark:border-periwinkleBlue-900 dark:hover:bg-periwinkleBlue-800 dark:hover:border-periwinkleBlue-600 hover:border-periwinkleBlue-600 hover:bg-periwinkleBlue-400 py-2">
                    <div className="hidden sm:block sm:px-1">Dismiss</div>
                    <div className="text-lg">
                        <TiDelete />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
