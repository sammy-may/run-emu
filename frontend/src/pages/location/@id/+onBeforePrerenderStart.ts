export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { StatesInit } from "../../../constants/States";
import { ActiveArea } from "../../../context/RaceFeedContext";
import { fetchRaces } from "../../../api/races";
import RaceType from "../../../types/race";
import type { Data } from "./+data";
import { slugify } from "../../../utils/url_utils";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync<Data> = async () : ReturnType<OnBeforePrerenderStartAsync<Data>> => {
    let states: ActiveArea[] = StatesInit;
    
    const allRaces: RaceType[] = await fetchRaces(null, false);

    const res = await Promise.all([
        {
            url: '/location/all',
            pageContext: {
                data: {
                    name: "all",
                    races: allRaces,
                }
            }
        },
        ...states.map(async (state) => {
            const url = state.country.length > 0 ? `/location/${slugify(state.state)}` : `/location/world_${slugify(state.state)}`;
            const races: RaceType[] = await fetchRaces(state, true);
            return {
                url,
                pageContext: {
                    data: {
                        name : state.country.length > 0 ? `${state.state}` : `world_${state.state}`,
                        races : races,
                    }
                },
            }; 
        }),
    ]);

    return res;
}