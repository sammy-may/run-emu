import { useContext, useEffect } from "react";
import { RaceContext } from "../../context/RaceFeedContext";
import type { Data } from "./+data.ts";
import { useData } from "vike-react/useData";
import MainContent from "../../components/MainContent.tsx";

const Page = () => {
    const { updateAllResults, updateGlobalResults, updateActiveArea } =
        useContext(RaceContext);

    const { name, races } = useData<Data>();

    const fetch = async () => {
        updateAllResults(races);
        updateGlobalResults(races);
        updateActiveArea(null);
    };

    useEffect(() => {
        fetch();
    }, [name, races]);

    return <MainContent initResults={races} />;
};

export default Page;
