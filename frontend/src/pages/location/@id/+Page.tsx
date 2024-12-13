import { useContext, useEffect, useMemo } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import {
    States,
    ActiveArea,
    fetchAllRaces,
} from "../../../context/RaceFeedContext";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";
import RaceType from "../../../types/race.ts";

import PageContent from "../../index/+Page.tsx";

const LocPage = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);
    const name = useData<Data>();

    const fetch = async () => {
        const location: ActiveArea = States.filter((state) => {
            return state.state == name;
        })[0];

        let races: RaceType[] = await fetchAllRaces(location);
        updateActiveArea(location ?? null);
        updateAllResults(races);
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <PageContent />;
};

export default LocPage;
