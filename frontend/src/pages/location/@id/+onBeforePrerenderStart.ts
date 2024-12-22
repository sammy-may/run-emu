export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { StatesInit } from "../../../constants/States";
import { ActiveArea } from "../../../context/RaceFeedContext";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async () : ReturnType<OnBeforePrerenderStartAsync> => {
    let states: ActiveArea[] = StatesInit;
    return [
        ...states.map((state) => {
            const url = state.country.length > 0 ? `/location/${state.state}` : `/location/world_${state.state}`;
            return {
                url,
                pageContext: {
                    data: state.country.length > 0 ? `${state.state}` : `world_${state.state}`
                },
            }; 
        }),
    ];
}