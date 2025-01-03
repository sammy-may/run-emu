import type { PageContext } from "vike/types";
import { useConfig } from "vike-react/useConfig";

import { fetchByName } from "../../../api/races";
import RaceType from "../../../types/race";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContext) => {
    const config = useConfig();

    const name = pageContext.routeParams.id;
    config({
        title: "RunEmu | " + name,
    })

    let race: RaceType | null = await fetchByName(name);
    let date: string = "";
    if (race !== undefined && race !== null) {
        date = new Date(race.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return {
        name: name,
        race: race,
        date: date
    }
};
