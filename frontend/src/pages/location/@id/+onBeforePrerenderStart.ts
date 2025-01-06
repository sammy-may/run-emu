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
            const url = `/location/${slugify(state.state)}`;
            const races: RaceType[] = await fetchRaces(state, false);
            if (races.length === 0) {
                return null;
            }
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

    const filteredRes = res.filter((item) => {return item !== null });

    return filteredRes;
}