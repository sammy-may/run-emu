import type { PageContext } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import RaceType from "../../types/race";
import { fetchRaces } from "../../api/races";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContext) => {
    const config = useConfig();

    const name = pageContext.routeParams.id;
    const races: RaceType[] = await fetchRaces(null, false);

    config({
        title: name,
    });

    return {
        name: name,
        races: races,
    }
};
