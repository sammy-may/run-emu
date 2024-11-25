import React from "react";
import { IoOptions } from "react-icons/io5";

const MoreDropdown = () => {
    return (
        <div>
            <button
                id="sortInfo"
                data-dropdown-toggle="dropdownInformation"
                type="button"
                className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
                <div>
                    <IoOptions />
                </div>
                <p>More</p>
                <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
        </div>
    );
};

export default MoreDropdown;
