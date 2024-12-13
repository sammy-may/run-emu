import { useContext, useEffect } from "react";
import OptionsBar from "../../components/OptionsBar";
import RaceFeed from "../../components/RaceFeed";
import RaceMap from "../../components/RaceMap";
import { RaceContext, fetchAllRaces } from "../../context/RaceFeedContext";
import RaceType from "../../types/race";
import type { Data } from "./+data.ts";
import { useData } from "vike-react/useData";

const Page = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);

    const name = useData<Data>();

    const fetch = async () => {
        let races: RaceType[] = await fetchAllRaces(null);
        updateAllResults(races);
        updateActiveArea(null);
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <PageContent />;
};

export const PageContent = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="overflow-y-auto overflow-x-hidden max-h-80p">
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
