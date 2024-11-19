import { PiPathBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdDiscount } from "react-icons/md";
import { useState, useContext } from "react";

import RaceType from "../types/race";
import { RaceContext } from "../context/RaceFeedContext";

const getRandomInt = (max_val: number): number => {
    return Math.floor(Math.random() * max_val);
};

const RaceCard = ({ index, race }: { index: number, race: RaceType }) => {
    const { updateHover } = useContext(RaceContext);

    const date = new Date(race.date).toLocaleDateString("en-US", {day: "numeric", month: "short", year: "numeric"});
    return (
        <div 
            onMouseLeave={() => {
                if (index >= 0) {
                    updateHover(index, false);
                }
            }}
            onMouseEnter={() => {
                if (index >= 0) {
                    updateHover(index, true);
                }
            }} 
        >
            {race.isHovered && (<div className="bg-gray-700 p-6 border rounded-lg shadow border-gray-700 hover:bg-gray-700">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
                {race.name} 
            </h2>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <PiPathBold />
                    </div>
                    <div>{race.distance} m</div>
                </div>
            </div>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <FaRegCalendarAlt />
                    </div>
                    <div>
                        {date} 
                    </div>
                </div>
            </div>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <FaLocationDot />
                    </div>
                    <div>
                        {race.location}
                    </div>
                </div>
            </div>
             <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <AiOutlineDollarCircle />
                    </div>
                    <div>
                        {(1 + getRandomInt(30)) * 10}.00
                    </div>
                </div>
            </div>  
            <div className="mb-3 font-normal text-gray-400 flex text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="flex items-center mb-3">
                <span className=" flex items-center space-x-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                    <div>
                        <FaCheckCircle/>
                    </div>
                    <div>
                        Registration Open
                    </div> 
                </span>
            </div>
            <div className="flex items-center mb-3">
                <span className=" flex items-center space-x-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                    <div>
                        <MdDiscount/>
                    </div>
                    <div>
                        Save 20% with code RUNEMU
                    </div> 
                </span>
            </div>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800">
                More details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
            </a>
        </div>)}
        {!race.isHovered && (<div className="bg-gray-800 p-6 border rounded-lg shadow border-gray-700 hover:bg-gray-700">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
                {race.name} 
            </h2>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <PiPathBold />
                    </div>
                    <div>{race.distance} m</div>
                </div>
            </div>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <FaRegCalendarAlt />
                    </div>
                    <div>
                        {date} 
                    </div>
                </div>
            </div>
            <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <FaLocationDot />
                    </div>
                    <div>
                        {race.location}
                    </div>
                </div>
            </div>
             <div className="mb-3 font-normal text-gray-400">
                <div className="flex items-center space-x-3">
                    <div>
                        <AiOutlineDollarCircle />
                    </div>
                    <div>
                        {(1 + getRandomInt(30)) * 10}.00
                    </div>
                </div>
            </div>  
            <div className="mb-3 font-normal text-gray-400 flex text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="flex items-center mb-3">
                <span className=" flex items-center space-x-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                    <div>
                        <FaCheckCircle/>
                    </div>
                    <div>
                        Registration Open
                    </div> 
                </span>
            </div>
            <div className="flex items-center mb-3">
                <span className=" flex items-center space-x-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">
                    <div>
                        <MdDiscount/>
                    </div>
                    <div>
                        Save 20% with code RUNEMU
                    </div> 
                </span>
            </div>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800">
                More details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
            </a>
        </div>)}
        </div>
    );
};

export default RaceCard;
