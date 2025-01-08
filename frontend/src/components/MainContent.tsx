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
        <>
            <div className="flex items-center place-content-start w-full px-3">
                {
                    <div className="flex flex-col-reverse items-center place-content-start lg:flex-row lg:items-start w-full">
                        <div className="overflow-x-hidden min-h-[42vh] lg:min-h-[90vh] max-h-[42vh] lg:max-h-[90vh] w-full lg:pl-6 lg:pr-2 sm:px-6 px-2 max-w-screen-xl relative">
                            <div ref={topRef}></div>
                            {!topInView && (
                                <div className="sticky top-0 left-1/2 z-50 flex items-center place-content-center">
                                    <div
                                        onClick={scrollToTop}
                                        className="text-center flex items-center place-content-center p-2 m-1 rounded-full z-50 dark:bg-gray-700 bg-gray-300 border border-gray-300 dark:border-gray-700 w-min hover:cursor-pointer text-black dark:text-white hover:border-dustyRose-500 dark:hover:border-dustyRose-500"
                                    >
                                        {" "}
                                        <FaAngleUp />{" "}
                                    </div>
                                </div>
                            )}
                            <div className="overflow-y-auto">
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
        </>
    );
};

export default MainContent;
