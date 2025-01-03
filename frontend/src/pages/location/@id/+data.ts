import type { PageContext } from "vike/types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContext) => {
    const config = useConfig();

    const name = pageContext.routeParams.id;

    config({
        title: "Upcoming Races | " + name,
    });

    return { 
        name: name,
    }
};
