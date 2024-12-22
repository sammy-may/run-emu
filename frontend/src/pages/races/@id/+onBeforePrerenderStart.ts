export { onBeforePrerenderStart };

import RaceType from "../../../types/race";
import type { OnBeforePrerenderStartAsync } from "vike/types";

import { fetchRaces } from "../../../api/races";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        let races: RaceType[] = await fetchRaces(null, false);
        return [
            ...races.map((race) => {
                const url = `/races/${race.name_url}`.replace("#", "_");
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
