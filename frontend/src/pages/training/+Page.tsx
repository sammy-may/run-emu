import { FaDumbbell } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { GoArrowRight } from "react-icons/go";

const Badge = ({ title, color }: { title: string; color: string }) => {
    return (
        <span
            className={`flex items-center text-xs font-semibold px-1 rounded-full bg-${color}-900 text-${color}-200 border border-${color}-700`}
        >
            {title}
        </span>
    );
};

const StrongBadge = ({ title, color }: { title: string; color: string }) => {
    return (
        <span
            className={`flex items-center text-xs font-semibold rounded-full px-1 bg-${color}-900 text-${color}-200 border border-${color}-700`}
        >
            {title}
        </span>
    );
};

/* const Dummy = () => {
    return (
        <div
            className="
        bg-zinc-900 border-zinc-700 text-zinc-200
        bg-blue-900 border-blue-700 text-blue-200
        bg-gray-900 border-gray-700 text-gray-200
        bg-orange-900 border-orange-700 text-orange-200
        bg-red-900 border-red-700 text-red-200
        bg-lime-900 border-lime-700 text-lime-200
        bg-yellow-900 border-yellow-700 text-yellow-200
        "
        ></div>
    );
}; */

const Page = () => {
    return (
        <main className="flex items-center place-content-center">
            <div className="flex flex-col items-start px-3 max-w-screen-xl w-full">
                <h1 className="text-gray-200 text-xl font-medium">
                    My Training Plan
                </h1>
                <div className="border border-gray-700 w-full my-3 mr-3 rounded-lg"></div>
                <div className="grid grid-cols-10 text-gray-400 text-sm w-full">
                    <div className="flex items-center place-content-center col-span-1">
                        <FaDumbbell />
                    </div>
                    <span className="text-xs col-span-9">
                        Workouts on Dec 15, 2024
                    </span>
                    <div className="flex items-center place-content-center">
                        <div className="h-full border border-gray-700 col-span-1 mt-3"></div>
                    </div>
                    <div className="col-span-9 border bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 rounded-lg p-2 m-2">
                        <div className="flex items-center">
                            <div className="text-gray-400 font-semibold py-1 text-xs">
                                AM
                            </div>
                            <div className="text-gray-200 font-semibold py-1 px-2">
                                Dancing with the Devil
                            </div>
                            <div className="">
                                <StrongBadge title="4.3 mi" color="blue" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center">
                                <div className="px-2">
                                    <LuDot />
                                </div>
                                <div className="flex items-center space-x-2 py-1">
                                    <span className="text-xs">run</span>{" "}
                                    <Badge title="800 meters" color="blue" />
                                    <span className="text-xs">at</span>{" "}
                                    <Badge title="aerobic pace" color="green" />
                                    <div className="text-xs">
                                        <GoArrowRight />
                                    </div>
                                    <span className="text-xs">rest</span>{" "}
                                    <Badge title="45 s" color="zinc" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="px-2">
                                    <LuDot />
                                </div>
                                <div className="flex items-center space-x-2 py-1">
                                    <span className="text-xs">run</span>{" "}
                                    <Badge title="500 meters" color="blue" />
                                    <span className="text-xs">at</span>{" "}
                                    <Badge
                                        title="lactate threshold pace"
                                        color="orange"
                                    />
                                    <div className="text-xs">
                                        <GoArrowRight />
                                    </div>
                                    <span className="text-xs">rest</span>{" "}
                                    <Badge title="90 s" color="zinc" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="px-2">
                                    <LuDot />
                                </div>
                                <div className="flex items-center space-x-2 py-1">
                                    <span className="text-xs">run</span>{" "}
                                    <Badge title="200 meters" color="blue" />
                                    <span className="text-xs">at</span>{" "}
                                    <Badge title="VO2 max pace" color="red" />
                                    <div className="text-xs">
                                        <GoArrowRight />
                                    </div>
                                    <span className="text-xs">rest</span>{" "}
                                    <Badge title="3 min" color="zinc" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center place-content-center">
                        <div className="h-full border border-gray-700 col-span-1"></div>
                    </div>
                    <div className="col-span-9 border bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 rounded-lg p-2 m-2">
                        <div className="flex items-center">
                            <div className="text-gray-400 font-semibold py-1 text-xs">
                                PM
                            </div>
                            <div className="text-gray-200 font-semibold py-1 px-2">
                                Recovery
                            </div>
                            <div className="">
                                <StrongBadge title="6 mi" color="blue" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center">
                                <div className="px-2">
                                    <LuDot />
                                </div>
                                <div className="flex items-center space-x-2 py-1">
                                    <span className="text-xs">run</span>{" "}
                                    <Badge title="6 mi" color="blue" />
                                    <span className="text-xs">at</span>{" "}
                                    <Badge title="aerobic pace" color="green" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;
