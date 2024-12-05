import OptionsBar from "../../components/OptionsBar";
import RaceFeed from "../../components/RaceFeed";
import RaceMap from "../../components/RaceMap";

const Page = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="overflow-scroll max-h-80p">
                    <OptionsBar />
                    <RaceFeed />
                </div>
                <div className="bg-gray-800 border-gray-700 border rounded-lg p-3">
                    <RaceMap />
                </div>
            </div>
        </div>
    );
};

export default Page;
