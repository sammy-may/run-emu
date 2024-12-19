import { useContext, useEffect } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import { States, ActiveArea } from "../../../context/RaceFeedContext";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";
import RaceType from "../../../types/race.ts";

import PageContent from "../../index/+Page.tsx";
import { fetchRaces } from "../../../api/races.ts";

const LocPage = () => {
    const { updateAllResults, updateActiveArea } = useContext(RaceContext);
    const name = useData<Data>();

    const fetch = async () => {
        const location: ActiveArea = States.filter((state) => {
            return state.state == name;
        })[0];

        let races: RaceType[] = [];
        if (name === "all") {
            races = await fetchRaces(null, false);
        } else {
            races = await fetchRaces(location, true);
        }

        updateAllResults(races);
        updateActiveArea(location ?? null);
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <PageContent />;
};

export default LocPage;
