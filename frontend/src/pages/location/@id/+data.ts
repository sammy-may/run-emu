import type { PageContext } from "vike/types";
import { fetchRaces } from "../../../api/races";
import RaceType from "../../../types/race";
import { StatesInit } from "../../../constants/States";
import { ActiveArea } from "../../../context/RaceFeedContext";
import { capitalize, slugify } from "../../../utils/url_utils";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContext) => {
    const name = pageContext.routeParams.id;

    const location: ActiveArea = StatesInit.filter((state) => {
        return (
            state && state.state && slugify(state.state) === slugify(name)
        );
    })[0];

    let races: RaceType[] = [];
    if (!name || name === "" || name === "all") {
        races = await fetchRaces(null, false);
    } else {
        races = await fetchRaces(location, true);
    }

    return { 
        name: name,
        races: races,
        title: "RunEmu | Upcoming races in " + capitalize(name),
    }
};
