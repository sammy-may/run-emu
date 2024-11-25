import RaceCard from "./RaceCard";

import { RaceContext } from "../context/RaceFeedContext";
import { useContext, useEffect, useRef, useState } from "react";
import RaceType from "../types/race";
import { divIcon } from "leaflet";
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
            console.log("incrementing");
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isLoading]);

    /*     useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                console.log("intersecting");
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []); */

    return (
        <div className="mt-3 text-left">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 mt-3 z-0">
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
