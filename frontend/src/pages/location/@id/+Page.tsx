import { useContext, useEffect } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import { ActiveArea } from "../../../context/RaceFeedContext";
import { StatesInit } from "../../../constants/States.tsx";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

import MainContent from "../../../components/MainContent.tsx";
import { loadGeoJson } from "../../../api/boundaries.ts";
import { slugify } from "../../../utils/url_utils.ts";

const LocPage = () => {
    const { updateAllResults, updateActiveArea, updateLocSearch } =
        useContext(RaceContext);

    const { name, races } = useData<Data>();

    const fetch = async () => {
        const location: ActiveArea = StatesInit.filter((state) => {
            return (
                state && state.state && slugify(state.state) === slugify(name)
            );
        })[0];

        updateLocSearch("");
        updateAllResults(races);

        if (location) {
            location.boundary = await loadGeoJson(
                location.state.toLowerCase().replace(/\s+/g, "_"),
            );
        }
        updateActiveArea(location ?? null);
    };

    useEffect(() => {
        fetch();
    }, [name]);

    return <MainContent initResults={races} />;
};

export default LocPage;
