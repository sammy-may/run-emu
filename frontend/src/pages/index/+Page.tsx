import { useContext, useEffect } from "react";
import OptionsBar from "../../components/OptionsBar";
import RaceFeed from "../../components/RaceFeed";
import RaceMap from "../../components/RaceMap";
import { RaceContext } from "../../context/RaceFeedContext";
import RaceType from "../../types/race";
import type { Data } from "./+data.ts";
import { useData } from "vike-react/useData";
import { fetchRaces } from "../../api/races.ts";

const Page = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);

    const name = useData<Data>();

    const fetch = async () => {
        if (name === undefined) {
            let races: RaceType[] = await fetchRaces(null, false);
            //let races: RaceType[] = await fetchAllRaces(null);
            updateAllResults(races);
            updateActiveArea(null);
        }
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
                <div className="">
                    <RaceMap />
                </div>
            </div>
        </div>
    );
};

export default Page;
