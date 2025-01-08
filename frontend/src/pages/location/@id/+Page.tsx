import { useContext, useEffect } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import { ActiveArea } from "../../../context/RaceFeedContext";
import { StatesInit } from "../../../constants/States.tsx";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

import MainContent from "../../../components/MainContent.tsx";
import { slugify } from "../../../utils/url_utils.ts";
import { fetchRaces } from "../../../api/races.ts";

const LocPage = () => {
    const {
        updateAllResults,
        updateGlobalResults,
        updateActiveArea,
        updateLocSearch,
    } = useContext(RaceContext);

    const { name, races } = useData<Data>();

    const fetch = async () => {
        const location: ActiveArea = StatesInit.filter((state) => {
            return (
                state && state.state && slugify(state.state) === slugify(name)
            );
        })[0];

        updateLocSearch("");
        updateAllResults(races);

        const allRaces = await fetchRaces(null, false);
        updateGlobalResults(allRaces);

        updateActiveArea(location ?? null);
    };

    useEffect(() => {
        fetch();
    }, [name, races]);

    return <MainContent initResults={races} />;
};

export default LocPage;
