import RaceCard from "./RaceCard";

import { RaceContext } from "../context/RaceFeedContext";
import { useContext, useEffect, useMemo, useState } from "react";
import RaceType from "../types/race";
import { useInView } from "react-intersection-observer";

const RaceFeed = ({ initResults }: { initResults: RaceType[] }) => {
    const {
        state: { searchResults },
        updateAllResults,
        updateSearchResults,
    } = useContext(RaceContext);

    const [page, setPage] = useState<number>(0);
    const [pageResults, setPageResults] = useState<RaceType[]>(
        initResults.slice(0, 20),
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { ref, inView } = useInView();

    const getNRaces = (n_races: number) => {
        let count: number = 0;
        const results = searchResults.filter((race) => {
            if (race.onMap && count < n_races) {
                count = count + 1;
                return true;
            } else {
                return false;
            }
        });
        return results;
    };

    const Results = useMemo(() => {
        return pageResults.map((race) => {
            if (race.onMap) {
                return (
                    <RaceCard
                        key={"card" + race.name}
                        index={race.id!}
                        race={race}
                    />
                );
            } else {
                return null;
            }
        });
    }, [pageResults]);

    useEffect(() => {
        setIsLoading(true);
        let pageRaces: RaceType[] = getNRaces(page * 10);
        setPageResults(pageRaces);
        setIsLoading(false);
    }, [page, searchResults]);

    useEffect(() => {
        if (inView && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isLoading]);

    return (
        <div className="text-left h-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-1 z-0 h-full">
                {Results}
                <div ref={ref} className="p-3 text-center"></div>
            </div>
        </div>
    );
};

export default RaceFeed;
