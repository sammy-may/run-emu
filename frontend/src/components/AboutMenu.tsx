import React from "react";
import { FiSettings } from "react-icons/fi";
import { FaBookOpen, FaHandshake, FaMedal } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoRocket } from "react-icons/io5";

import { FaB } from "react-icons/fa6";

const AboutMenu = () => {
    return (
        <div className="flex items-start text-gray-400 pr-6">
            <div className="w-2/5 p-3 flex flex-col items-start space-y-2">
                <div className="space-y-1 pb-2">
                    <div className="px-4 text-sm font-semibold">General</div>
                    <div className="flex flex-col items-start w-72">
                        <div className="flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
                            <div className="border-2 py-2 border-blue-500 rounded-lg"></div>
                            <FaMedal />
                            <div className="text-gray-200 font-semibold">
                                Mission
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
                            <div className="border-2 py-2 border-gray-900 rounded-lg"></div>
                            <FaBookOpen />
                            <div className="text-gray-200 font-semibold">
                                Our story
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
                            <div className="border-2 py-2 border-gray-900 rounded-lg"></div>
                            <CgProfile />
                            <div className="text-gray-200 font-semibold">
                                RunEmu team
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-1 pb-2">
                    <div className="px-4 text-sm font-semibold">
                        Race Organizers
                    </div>
                    <div className="flex flex-col items-start w-72">
                        <div className="flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
                            <div className="border-2 py-2 border-gray-900 rounded-lg"></div>
                            <IoRocket />
                            <div className="text-gray-200 font-semibold">
                                Promote your events
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-1 pb-2">
                    <div className="px-4 text-sm font-semibold ">
                        Advertisers/Sponsors
                    </div>
                    <div className="flex flex-col items-start w-72">
                        <div className="flex items-center space-x-3 hover:bg-gray-800 hover:border-gray-700 hover:cursor-pointer py-1 border border-gray-900 rounded-lg w-full">
                            <div className="border-2 py-2 border-gray-900 rounded-lg"></div>
                            <FaHandshake />
                            <div className="text-gray-200 font-semibold">
                                Partner with RunEmu
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start">
                    <img
                        src="/images/logos/emu_color_crop.webp.png"
                        alt="RunEmu Logo"
                        className=""
                    />
                </div>
            </div>
            <div className="w-3/5 p-3 border border-gray-800 rounded-lg">
                Mission
            </div>
        </div>
    );
};

export default AboutMenu;
