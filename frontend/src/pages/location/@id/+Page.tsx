import { useContext, useEffect } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import { ActiveArea } from "../../../context/RaceFeedContext";
import { StatesInit } from "../../../constants/States.tsx";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.shared.ts";
import RaceType from "../../../types/race.ts";

import MainContent from "../../../components/MainContent.tsx";
import { fetchRaces } from "../../../api/races.ts";

const LocPage = () => {
    const { updateAllResults, updateActiveArea, updateLocSearch } =
        useContext(RaceContext);

    const name = useData<Data>();

    const fetch = async () => {
        const location: ActiveArea = StatesInit.filter((state) => {
            return state && state.state && state.state === name;
        })[0];

        let races: RaceType[] = [];
        if (!name || name === "" || name === "all") {
            races = await fetchRaces(null, false);
        } else {
            races = await fetchRaces(location, true);
        }

        console.log("active area", location);
        console.log("name", name);

        updateLocSearch("");
        updateAllResults(races);
        updateActiveArea(location ?? null);
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <MainContent />;
};

export default LocPage;
