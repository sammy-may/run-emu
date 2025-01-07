export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { StatesInit } from "../../../constants/States";
import { ActiveArea } from "../../../context/RaceFeedContext";
import { fetchRaces } from "../../../api/races";
import RaceType from "../../../types/race";
import type { Data } from "./+data";
import { capitalize, slugify } from "../../../utils/url_utils";

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
                    title: "RunEmu | Upcoming races all over the world!"
                }
            }
        },
        ...states.map(async (state) => {
            const url = `/location/${slugify(state.state)}`;
            const races: RaceType[] = await fetchRaces(state, false);
            return {
                url,
                pageContext: {
                    data: {
                        name : state.state,
                        title: "RunEmu | Upcoming races in " + capitalize(state.state),
                        races : races,
                    }
                },
            }; 
        }),
    ]);

    const filteredRes = res.filter((item) => {return item !== null });

    return filteredRes;
}