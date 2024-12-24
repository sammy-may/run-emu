import { useContext, useEffect } from "react";
import { RaceContext } from "../../context/RaceFeedContext";
import RaceType from "../../types/race";
import type { Data } from "./+data.ts";
import { useData } from "vike-react/useData";
import { fetchRaces } from "../../api/races.ts";
import MainContent from "../../components/MainContent.tsx";

const Page = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);

    const name = useData<Data>();

    const fetch = async () => {
        console.log("fetchin");
        if (name === undefined) {
            let races: RaceType[] = await fetchRaces(null, false);
            updateAllResults(races);
            updateActiveArea(null);
        }
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <MainContent />;
};

export default Page;
