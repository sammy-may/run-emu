import { useContext, useEffect } from "react";
import { RaceContext } from "../../../context/RaceFeedContext";

import { States, ActiveArea } from "../../../context/RaceFeedContext";

import { useData } from "vike-react/useData";
import type { Data } from "./+data.ts";

import Page from "../../index/+Page.tsx";

const LocPage = () => {
    const name = useData<Data>();

    const location: ActiveArea = States.filter((state) => {
        return state.state == name;
    })[0];

    const { updateActiveArea } = useContext(RaceContext);

    const update = () => {
        updateActiveArea(location);
    };

    useEffect(() => {
        update();
    }, []);

    return <Page />;
};

export default LocPage;
