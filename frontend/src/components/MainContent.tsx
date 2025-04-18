import { useInView } from "react-intersection-observer";
import OptionsBar from "../components/OptionsBar";
import RaceFeed from "../components/RaceFeed";
import RaceMap from "../components/RaceMap";
import RaceType from "../types/race";
import { useRef } from "react";
import { FaAngleUp } from "react-icons/fa";

const MainContent = ({ initResults }: { initResults: RaceType[] }) => {
    const { ref: topRef, inView: topInView } = useInView();
    const optionsBoxRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        optionsBoxRef.current?.scrollIntoView({
            block: "end",
            behavior: "smooth", // Enables smooth scrolling
        });
    };

    return (
        <div className="flex items-center place-content-start w-full px-3 h-full">
            {
                <div className="flex flex-col-reverse items-center place-content-start lg:flex-row lg:items-start w-full">
                    <div className="overflow-x-hidden min-h-[42vh] lg:min-h-[90vh] max-h-[42vh] lg:max-h-[90vh] w-full lg:pl-6 lg:pr-2 sm:px-6 px-2 max-w-screen-xl relative">
                        {!topInView && (
                            <div className="sticky top-4 left-1/2 z-50 -mt-4 flex items-center place-content-center overflow-y-visible">
                                <div
                                    onClick={scrollToTop}
                                    className="text-center overflow-y-visible flex items-center place-content-center p-2 -mt-4 rounded-full z-[1000] dark:bg-gray-700 bg-gray-300 border border-gray-200 dark:border-gray-800 w-min hover:cursor-pointer text-black dark:text-white hover:border-dustyRose-500 dark:hover:border-dustyRose-500"
                                >
                                    {" "}
                                    <FaAngleUp />{" "}
                                </div>
                            </div>
                        )}
                        <div className="overflow-y-auto min-h-[42vh] lg:min-h-[90vh] max-h-[42vh] lg:max-h-[90vh] overflow-x-hidden">
                            <div ref={topRef} className=""></div>
                            <div ref={optionsBoxRef}>
                                <OptionsBar />
                            </div>

                            <RaceFeed initResults={initResults} />
                        </div>
                    </div>
                    <div className="w-full pb-2 lg:pr-6 lg:pl-2 px-2 sm:px-6 lg:pt-0 lg:mt-0 max-w-screen-xl">
                        <RaceMap />
                    </div>
                </div>
            }
        </div>
    );
};

export default MainContent;
