export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { StatesInit } from "../../../constants/States";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        return [
            ...StatesInit.map((state) => {
                const url = state.country.length > 0 ? `/location/${state.state}` : `/location/world_${state.state}`;
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
