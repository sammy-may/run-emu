export { onBeforePrerenderStart };

import api from "../../../api/races";
import RaceType from "../../../types/race";
import type { OnBeforePrerenderStartAsync } from "vike/types";

const onBeforePrerenderStart: OnBeforePrerenderStartAsync =
    async (): ReturnType<OnBeforePrerenderStartAsync> => {
        let races: RaceType[] = [];
        try {
            const response = await api.get("", {
                params: { active_only: true },
            });
            races = response.data;
            races = races.map((race, index) => ({
                ...race,
                isHovered: false,
                onMap: false,
                id: index,
                valid_distance: true,
            }));
        } catch (err) {
            console.log(err);
        }

        return [
            ...races.map((race) => {
                const url = `/races/${race.name_url}`;
                return {
                    url,
                    pageContext: {},
                };
            }),
        ];
    };
