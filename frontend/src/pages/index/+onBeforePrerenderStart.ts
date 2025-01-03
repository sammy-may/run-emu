export { onBeforePrerenderStart };

import RaceType from "../../types/race"; 
import type { Data } from "./+data";
import type { OnBeforePrerenderStartAsync } from "vike/types";

import { fetchRaces } from "../../api/races"; 

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<Data> =
    async (): ReturnType<OnBeforePrerenderStartAsync<Data>> => {
        let races: RaceType[] = await fetchRaces(null, false);
        return [
            {
                url: '/',
                pageContext: {
                    data: {
                        name: "",
                        races: races,

                    }
                }
            }
        ]
    };