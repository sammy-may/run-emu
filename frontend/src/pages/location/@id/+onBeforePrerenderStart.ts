export { onBeforePrerenderStart };

import type { OnBeforePrerenderStartAsync } from "vike/types";
import { States } from "../../../context/RaceFeedContext";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        return [
            ...States.map((state) => {
                const url = `/location/${state.state}`;
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
