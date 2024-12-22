import RaceCard from "./RaceCard";

import { RaceContext } from "../context/RaceFeedContext";
import { useContext, useEffect, useState } from "react";
import RaceType from "../types/race";
import { useInView } from "react-intersection-observer";

const RaceFeed = () => {
    const {
        state: { searchResults },
    } = useContext(RaceContext);

    const [page, setPage] = useState<number>(0);
    const [pageResults, setPageResults] = useState<RaceType[]>([]);
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

    useEffect(() => {
        setIsLoading(true);
        setPageResults(getNRaces(page * 10));
        setIsLoading(false);
    }, [page, searchResults]);

    useEffect(() => {
        if (inView && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isLoading]);

    return (
        <div className="text-left">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-0">
                {pageResults.map((race) => {
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
                })}
                <div ref={ref} className="p-3 text-center"></div>
            </div>
        </div>
    );
};

export default RaceFeed;
