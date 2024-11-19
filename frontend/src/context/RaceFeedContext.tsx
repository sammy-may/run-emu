import {
    createContext,
    useEffect,
    useState,
    useContext,
    useReducer,
    ReactElement,
    useCallback,
    ChangeEvent,
} from "react";
import RaceType from "../types/race";
import api from "../api/races";
import { useMap } from "react-leaflet";

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
    new_distance?: number;
    new_date?: Date;
    search?: string;
    new_races?: RaceType[];
    index?: number;
    new_bool?: boolean;
}
interface RaceState {
    allResults: RaceType[];
    nAll: number;
    searchResults: RaceType[];
    nSearch: number;
    mapResults: RaceType[];
    nMap: number;
    search: string;
    distanceMin: number;
    distanceMax: number;
    dateMin: Date;
    dateMax: Date;
}

const initState: RaceState = {
    allResults: [],
    searchResults: [],
    mapResults: [],
    nAll: 0,
    nSearch: 0,
    nMap: 0,
    search: "",
    distanceMin: 0,
    distanceMax: 1000,
    dateMin: new Date(),
    dateMax: new Date("3000-01-01"),
};

const raceReducer = (state: RaceState, action: RaceAction): RaceState => {
    switch (action.type) {
        case RaceActionKind.UPDATE_HOVER:
            return {
                ...state,
                mapResults: state.mapResults.map((x, idx) =>
                    idx == action.index!
                        ? { ...x, isHovered: action.new_bool! }
                        : x
                ),
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
                nAll: action.new_races!.length,
                nSearch: action.new_races!.length,
                nMap: action.new_races!.length,
            };
        case RaceActionKind.UPDATE_MAP_RESULTS:
            return {
                ...state,
                mapResults: action.new_races!,
                nMap: action.new_races!.length,
            };
        case RaceActionKind.UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.new_races!,
                nSearch: action.new_races!.length,
            };
        default:
            return state;
    }
};

const useRaceContext = (initState: RaceState) => {
    const [state, dispatch] = useReducer(raceReducer, initState);

    const updateHover = useCallback((index: number, isHovered: boolean) => {
        dispatch({
            type: RaceActionKind.UPDATE_HOVER,
            index: index,
            new_bool: isHovered,
        });
    }, []);

    const updateDistanceMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MIN,
                new_distance: Number(evt.target.value),
            });
        },
        []
    );

    const updateDistanceMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const new_distance = Number(evt.target.value);
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MAX,
                new_distance: new_distance > 0 ? new_distance : -1,
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
        dispatch({
            type: RaceActionKind.UPDATE_DATE_MAX,
            new_date: new Date(evt.target.value),
        });
    }, []);

    const updateSearchResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH_RESULTS,
            new_races: races,
        });
        updateMapResults(races.filter((race) => race.onMap));
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
            const races: RaceType[] = response.data;
            dispatch({
                type: RaceActionKind.POPULATE_RACES,
                new_races: races,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const filterRaces = (races: RaceType[]) => {
        if (state.distanceMax < 0) {
            races = races.filter(
                (race) =>
                    race.name
                        .toLowerCase()
                        .includes(state.search.toLowerCase()) &&
                    race.distance >= state.distanceMin &&
                    new Date(race.date) >= state.dateMin &&
                    new Date(race.date) <= state.dateMax
            );
        } else {
            races = races.filter(
                (race) =>
                    race.name
                        .toLowerCase()
                        .includes(state.search.toLowerCase()) &&
                    race.distance >= state.distanceMin &&
                    race.distance <= state.distanceMax &&
                    new Date(race.date) >= state.dateMin &&
                    new Date(race.date) <= state.dateMax
            );
        }
        return races;
    };

    const applyFilters = () => {
        const newSearch = filterRaces(state.allResults);
        updateSearchResults(newSearch);
    };

    useEffect(() => {
        fetchRaces();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [
        state.search,
        state.distanceMin,
        state.distanceMax,
        state.dateMin,
        state.dateMax,
    ]);

    return {
        state,
        updateDistanceMin,
        updateDistanceMax,
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
