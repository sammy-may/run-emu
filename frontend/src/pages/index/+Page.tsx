import { useContext, useEffect, useState } from "react";
import OptionsBar from "../../components/OptionsBar";
import RaceFeed from "../../components/RaceFeed";
import RaceMap from "../../components/RaceMap";
import { RaceContext } from "../../context/RaceFeedContext";
import RaceType from "../../types/race";
import type { Data } from "./+data.ts";
import { useData } from "vike-react/useData";
import { fetchRaces } from "../../api/races.ts";
import ActionButton from "../../components/ActionButton.tsx";

const Page = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);

    const name = useData<Data>();

    const fetch = async () => {
        if (name === undefined) {
            let races: RaceType[] = await fetchRaces(null, false);
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
        <>
            <div className="flex items-center place-content-center max-w-screen-2xl w-full px-3">
                {
                    <div className="flex flex-col items-center xl:items-start place-content-start xl:grid xl:grid-cols-2 xl:gap-4 max-w-screen-2xl w-full">
                        <div className="overflow-y-auto overflow-x-hidden max-h-[50vh] xl:max-h-[90vh] w-full px-6 max-w-screen-lg">
                            <OptionsBar />
                            <RaceFeed />
                        </div>
                        <div className="w-full pb-2 xl:pr-6 xl:pl-1 px-6 border-t-2 border-t-gray-700 pt-6 mt-6 xl:border-t-0 xl:pt-0 xl:mt-0 max-w-screen-lg">
                            <RaceMap />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Page;
