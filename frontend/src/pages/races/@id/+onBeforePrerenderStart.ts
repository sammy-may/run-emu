export { onBeforePrerenderStart };

import RaceType from "../../../types/race";
import type { Data } from "./+data";
import type { OnBeforePrerenderStartAsync } from "vike/types";

import { fetchRaces } from "../../../api/races";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<Data> =
    async (): ReturnType<OnBeforePrerenderStartAsync<Data>> => {
        let races: RaceType[] = await fetchRaces(null, false);
        return [
            ...races.map((race) => {
                const url = `/races/${race.name_url}`.replace("#", "_");
                return {
                    url,
                    pageContext: {
                        data : {
                            name : `${race.name_url}`.replace("#", "_"),
                            race: race,
                            date: new Date(race.date).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                             year: "numeric"
                            })
                        }
                    },
                };
            })
        ]
    };
