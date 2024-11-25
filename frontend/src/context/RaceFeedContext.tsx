import {
    createContext,
    useEffect,
    useReducer,
    ReactElement,
    useCallback,
    ChangeEvent,
} from "react";
import RaceType from "../types/race";
import api from "../api/races";

enum RaceActionKind {
    UPDATE_DISTANCE_MIN = "UPDATE_DISTANCE_MIN",
    UPDATE_DISTANCE_MAX = "UPDATE_DISTANCE_MAX",
    UPDATE_DATE_MIN = "UPDATE_DATE_MIN",
    UPDATE_DATE_MAX = "UPDATE_DATE_MAX",
    UPDATE_SEARCH = "UPDATE_SEARCH",
    POPULATE_RACES = "POPULATE_RACES",
    UPDATE_MAP_RESULTS = "UPDATE_MAP_RESULTS",
    UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS",
    UPDATE_HOVER = "UPDATE_HOVER",
}
interface RaceAction {
    type: RaceActionKind;
    new_distance?: number | null;
    new_date?: Date | null;
    search?: string;
    new_races?: RaceType[];
    index?: number;
    new_bool?: boolean;
    sort?: boolean;
}
interface RaceState {
    allResults: RaceType[];
    searchResults: RaceType[];
    mapResults: RaceType[];
    search: string | null;
    distanceMin: number | null;
    distanceMax: number | null;
    dateMin: Date | null;
    dateMax: Date | null;
}

const initState: RaceState = {
    allResults: [],
    searchResults: [],
    mapResults: [],
    search: null,
    distanceMin: null,
    distanceMax: null,
    dateMin: new Date(),
    dateMax: null,
};

const compareByHover = (a: RaceType, b: RaceType) => {
    let a_hover = a.isHovered === undefined ? false : a.isHovered;
    let b_hover = b.isHovered === undefined ? false : b.isHovered;
    if (a_hover > b_hover) {
        return -1;
    }
    if (a_hover < b_hover) {
        return 1;
    }
    return 0;
};

const compareByNone = (a: RaceType, b: RaceType) => {
    return 0;
};

const raceReducer = (state: RaceState, action: RaceAction): RaceState => {
    switch (action.type) {
        case RaceActionKind.UPDATE_HOVER:
            return {
                ...state,
                searchResults: state.searchResults
                    .map((x) => {
                        if (x.id! == action.index!) {
                            return { ...x, isHovered: action.new_bool! };
                        } else if (action.new_bool && x.isHovered) {
                            return { ...x, isHovered: false };
                        } else {
                            return x;
                        }
                    })
                    .sort(action.sort! ? compareByHover : compareByNone),
            };
        case RaceActionKind.UPDATE_DISTANCE_MIN:
            return { ...state, distanceMin: action.new_distance! };
        case RaceActionKind.UPDATE_DISTANCE_MAX:
            return { ...state, distanceMax: action.new_distance! };
        case RaceActionKind.UPDATE_DATE_MIN:
            return { ...state, dateMin: action.new_date! };
        case RaceActionKind.UPDATE_DATE_MAX:
            return { ...state, dateMax: action.new_date! };
        case RaceActionKind.UPDATE_SEARCH:
            return { ...state, search: action.search! };
        case RaceActionKind.POPULATE_RACES:
            return {
                ...state,
                allResults: action.new_races!,
                searchResults: action.new_races!,
                mapResults: action.new_races!,
            };
        case RaceActionKind.UPDATE_MAP_RESULTS:
            return {
                ...state,
                mapResults: action.new_races!,
            };
        case RaceActionKind.UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.new_races!,
            };
        default:
            return state;
    }
};

const useRaceContext = (initState: RaceState) => {
    const [state, dispatch] = useReducer(raceReducer, initState);

    const updateHover = useCallback(
        (index: number, isHovered: boolean, sort: boolean) => {
            dispatch({
                type: RaceActionKind.UPDATE_HOVER,
                index: index,
                new_bool: isHovered,
                sort: sort,
            });
        },
        []
    );

    const setDistance = useCallback(
        (dist1: number | null, dist2: number | null = dist1) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MIN,
                new_distance: dist1,
            });
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MAX,
                new_distance: dist2,
            });
        },
        []
    );

    const unsetDistance = useCallback(() => {
        dispatch({
            type: RaceActionKind.UPDATE_DISTANCE_MIN,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_DISTANCE_MAX,
            new_distance: null,
        });
    }, []);

    const updateDistanceMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updateDistanceMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updateSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH,
            search: evt.target.value,
        });
    }, []);

    const updateDateMin = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: RaceActionKind.UPDATE_DATE_MIN,
            new_date: new Date(evt.target.value),
        });
    }, []);

    const updateDateMax = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value === "") {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MAX,
                new_date: new Date("3000-01-01"),
            });
        } else {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MAX,
                new_date: new Date(evt.target.value),
            });
        }
    }, []);

    const updateSearchResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH_RESULTS,
            new_races: races,
        });
        updateMapResults([...races.filter((race) => race.onMap)]);
    }, []);

    const updateMapResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_MAP_RESULTS,
            new_races: races,
        });
    }, []);

    const fetchRaces = async () => {
        try {
            const response = await api.get("", {
                params: { active_only: true },
            });
            let races: RaceType[] = response.data;
            races = races.map((race, index) => ({
                ...race,
                isHovered: false,
                onMap: false,
                id: index,
            }));
            dispatch({
                type: RaceActionKind.POPULATE_RACES,
                new_races: races,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const filterRaces = (races: RaceType[]) => {
        if (state.search !== null) {
            races = races.filter((race) =>
                race.name.toLowerCase().includes(state.search!.toLowerCase())
            );
        }

        races = races.filter((race) => race.valid_distance!);

        if (state.dateMax !== null) {
            races = races.filter(
                (race) => new Date(race.date) <= state.dateMax!
            );
        }

        if (state.dateMin !== null) {
            races = races.filter(
                (race) => new Date(race.date) >= state.dateMin!
            );
        }

        return races;
    };

    const filterDistances = (races: RaceType[]) => {
        let min_dist = state.distanceMin ?? -1;
        let max_dist = state.distanceMax ?? 99999999;
        races.forEach((race, r_index) => {
            race.distances.data.forEach((dist, d_index) => {
                races[r_index].distances.data[d_index] = {
                    ...dist,
                    match:
                        dist.distance >= min_dist && dist.distance <= max_dist,
                };
            });
            races[r_index].valid_distance = race.distances.data.some(
                (dist) => dist.match!
            );
        });
        return races;
    };

    const applyFilters = () => {
        const newSearch = filterRaces(state.allResults);
        updateSearchResults(newSearch);
    };

    const applyDistanceFilters = () => {
        const updatedRaces = filterDistances(state.allResults);
        const newSearch = filterRaces(updatedRaces);
        console.log(newSearch.length);
        updateSearchResults(newSearch);
    };

    useEffect(() => {
        fetchRaces();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [state.search, state.dateMin, state.dateMax]);

    useEffect(() => {
        applyDistanceFilters();
    }, [state.distanceMin, state.distanceMax]);

    return {
        state,
        updateDistanceMin,
        updateDistanceMax,
        setDistance,
        unsetDistance,
        updateSearch,
        updateDateMin,
        updateDateMax,
        updateMapResults,
        updateSearchResults,
        updateHover,
    };
};

type UseRaceContextType = ReturnType<typeof useRaceContext>;

const initContextState: UseRaceContextType = {
    state: initState,
    updateDistanceMin: () => {},
    updateDistanceMax: () => {},
    updateDateMin: () => {},
    updateDateMax: () => {},
    updateSearch: () => {},
    updateMapResults: () => {},
    updateSearchResults: () => {},
    updateHover: () => {},
};

export const RaceContext = createContext<UseRaceContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined;
};

export const RaceDataProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <RaceContext.Provider value={useRaceContext(initState)}>
            {children}
        </RaceContext.Provider>
    );
};
