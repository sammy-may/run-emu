export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { StatesInit } from "../../../constants/States";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        return [
            ...StatesInit.map((state) => {
                const url = `/location/${state.state}`;
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
