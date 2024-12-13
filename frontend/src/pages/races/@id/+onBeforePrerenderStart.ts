export { onBeforePrerenderStart };

import api from "../../../api/races";
import RaceType from "../../../types/race";
import type { OnBeforePrerenderStartAsync } from "vike/types";

import { fetchAllRaces } from "../../../context/RaceFeedContext";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        let races: RaceType[] = await fetchAllRaces();
        return [
            ...races.map((race) => {
                const url = `/races/${race.name_url}`;
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
