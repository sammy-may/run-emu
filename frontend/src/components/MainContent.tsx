import OptionsBar from "../components/OptionsBar";
import RaceFeed from "../components/RaceFeed";
import RaceMap from "../components/RaceMap";
import RaceType from "../types/race";

const MainContent = ({ initResults }: { initResults: RaceType[] }) => {
    return (
        <>
            <div className="flex items-center place-content-center w-full px-3">
                {
                    <div className="flex flex-col items-center place-content-center lg:flex-row lg:items-start w-full">
                        <div className="overflow-y-auto overflow-x-hidden min-h-[42vh] lg:min-h-[90vh] max-h-[42vh] lg:max-h-[90vh] w-full lg:pl-6 lg:pr-2 sm:px-6 px-2 max-w-screen-xl">
                            <OptionsBar />
                            <RaceFeed initResults={initResults} />
                        </div>
                        <div className="w-full pb-2 lg:pr-6 lg:pl-2 px-2 sm:px-6 border-t-2 border-t-gray-700 pt-4 mt-4 lg:border-t-0 lg:pt-0 lg:mt-0 max-w-screen-xl">
                            <RaceMap />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default MainContent;
