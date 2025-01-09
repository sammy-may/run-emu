import {
    ChangeEvent,
    createContext,
    ReactElement,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import RaceType from "../types/race";
import { StatesInit } from "../constants/States";
import { fetchRaces } from "../api/races";

enum RaceActionKind {
    UPDATE_DISTANCE_MIN = "UPDATE_DISTANCE_MIN",
    UPDATE_DISTANCE_MAX = "UPDATE_DISTANCE_MAX",
    UPDATE_HITEMP_MIN = "UPDATE_HITEMP_MIN",
    UPDATE_HITEMP_MAX = "UPDATE_HITEMP_MAX",
    UPDATE_LOTEMP_MIN = "UPDATE_LOTEMP_MIN",
    UPDATE_LOTEMP_MAX = "UPDATE_LOTEMP_MAX",
    UPDATE_PRECIP_MIN = "UPDATE_PRECIP_MIN",
    UPDATE_PRECIP_MAX = "UPDATE_PRECIP_MAX",
    UPDATE_DATE_MIN = "UPDATE_DATE_MIN",
    UPDATE_DATE_MAX = "UPDATE_DATE_MAX",
    UPDATE_SEARCH = "UPDATE_SEARCH",
    UPDATE_SORT_METHOD = "UPDATE_SORT_METHOD",
    UPDATE_HOVERED_STATE = "UPDATE_HOVERED_STATE",
    UPDATE_LOC_SEARCH = "UPDATE_LOC_SEARCH",
    POPULATE_RACES = "POPULATE_RACES",
    UPDATE_GLOBAL_RESULTS = "UPDATE_GLOBAL_RESULTS",
    UPDATE_GLOBAL_SEARCH_RESULTS = "UPDATE_GLOBAL_SEARCH_RESULTS",
    UPDATE_MAP_RESULTS = "UPDATE_MAP_RESULTS",
    UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS",
    UPDATE_MAP_COORDS = "UPDATE_MAP_COORDS",
    UPDATE_HOVER = "UPDATE_HOVER",
    UPDATE_STATE_HOVER = "UPDATE_STATE_HOVER",
    UPDATE_STATES = "UPDATE_STATES",

    UPDATE_ACTIVE_AREA = "UPDATE_ACTIVE_AREA",

    CLOSE_DISTANCE_MENU = "CLOSE_DISTANCE_MENU",
    OPEN_DISTANCE_MENU = "OPEN_DISTANCE_MENU",
    CLOSE_DATE_MENU = "CLOSE_DATE_MENU",
    OPEN_DATE_MENU = "OPEN_DATE_MENU",
    CLOSE_MORE_MENU = "CLOSE_MORE_MENU",
    OPEN_MORE_MENU = "OPEN_MORE_MENU",
    CLOSE_STATE_MENU = "CLOSE_STATE_MENU",
    OPEN_STATE_MENU = "OPEN_STATE_MENU",
    UPDATE_NEED_LOAD = "UPDATE_NEED_LOAD",
    UPDATE_NEED_SORT = "UPDATE_NEED_SORT",
}

interface MapCoordsType {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface ActiveArea {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    n_races?: number;
    isHovered?: boolean;
}

interface RaceAction {
    type: RaceActionKind;
    new_distance?: number | null;
    new_date?: Date | null;
    search?: string;
    new_races?: RaceType[];
    new_states?: ActiveArea[];
    index?: number;
    new_bool?: boolean;
    sort?: boolean;
    new_coords?: MapCoordsType;
    new_area?: ActiveArea | null;
}

const initMapState: MapCoordsType = {
    latitude: 38,
    longitude: -118,
    zoom: 4,
};

const getFromLocal = (name: string) => {
    if (typeof window !== "undefined") {
        try {
            if (name === "dateMin" || name === "dateMax") {
                const value = JSON.parse(sessionStorage.getItem(name) ?? "");
                if (value) return new Date(value);
                else return null;
            }
            return JSON.parse(sessionStorage.getItem(name) ?? "");
        } catch {
            return null;
        }
    }
    return null;
};

const saveToLocal = (name: string, value: any) => {
    if (typeof window !== "undefined") {
        try {
            if (name === "dateMax") {
                console.log("setting", value);
            }
            sessionStorage.setItem(name, JSON.stringify(value));
        } catch {
            return;
        }
    }
};

interface RaceState {
    allResults: RaceType[];
    globalResults: RaceType[];
    globalSearchResults: RaceType[];
    searchResults: RaceType[];
    mapResults: RaceType[];
    sortMethod: string | null;
    search: string | null;
    hoveredState: string;
    locSearch: string | null;
    distanceMin: number | null;
    distanceMax: number | null;
    hitempMin: number | null;
    hitempMax: number | null;
    lotempMin: number | null;
    lotempMax: number | null;
    precipMin: number | null;
    precipMax: number | null;
    dateMin: Date | null;
    dateMax: Date | null;
    mapCoords: MapCoordsType;
    distanceMenuOpen: boolean;
    dateMenuOpen: boolean;
    moreMenuOpen: boolean;
    stateMenuOpen: boolean;
    activeArea: ActiveArea | null;
    states: ActiveArea[];
    needLoad: boolean;
    needSort: boolean;
}

const initState: RaceState = {
    allResults: [],
    globalResults: [],
    globalSearchResults: [],
    searchResults: [],
    mapResults: [],
    sortMethod: getFromLocal("sortMethod") ?? "date",
    search: null,
    locSearch: null,
    hoveredState: "",
    distanceMin: getFromLocal("distanceMin") ?? null,
    distanceMax: getFromLocal("distanceMax") ?? null,
    hitempMin: getFromLocal("hitempMin") ?? null,
    hitempMax: getFromLocal("hitempMax") ?? null,
    lotempMin: getFromLocal("lotempMin") ?? null,
    lotempMax: getFromLocal("lotempMax") ?? null,
    precipMin: getFromLocal("precipMin") ?? null,
    precipMax: getFromLocal("precipMax") ?? null,
    dateMin: new Date(),
    dateMax: getFromLocal("dateMax") ?? null,
    mapCoords: getFromLocal("mapCoords") ?? initMapState,
    distanceMenuOpen: false,
    dateMenuOpen: false,
    moreMenuOpen: false,
    stateMenuOpen: false,
    activeArea: null,
    states: StatesInit,
    needLoad: true,
    needSort: true,
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

const compareByNone = () => {
    return 0;
};

const raceReducer = (state: RaceState, action: RaceAction): RaceState => {
    switch (action.type) {
        case RaceActionKind.UPDATE_HOVER:
            return {
                ...state,
                mapResults: state.mapResults
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
        case RaceActionKind.UPDATE_STATE_HOVER:
            return {
                ...state,
                states: state.states.map((x) => {
                    if (action.search! === x.state) {
                        return { ...x, isHovered: action.new_bool! };
                    } else {
                        return { ...x, isHovered: false };
                    }
                }),
            };
        case RaceActionKind.UPDATE_STATES:
            return {
                ...state,
                states: action.new_states!,
            };
        case RaceActionKind.UPDATE_DISTANCE_MIN:
            return { ...state, distanceMin: action.new_distance! };
        case RaceActionKind.UPDATE_DISTANCE_MAX:
            return { ...state, distanceMax: action.new_distance! };
        case RaceActionKind.UPDATE_HITEMP_MIN:
            return { ...state, hitempMin: action.new_distance! };
        case RaceActionKind.UPDATE_HITEMP_MAX:
            return { ...state, hitempMax: action.new_distance! };
        case RaceActionKind.UPDATE_LOTEMP_MIN:
            return { ...state, lotempMin: action.new_distance! };
        case RaceActionKind.UPDATE_LOTEMP_MAX:
            return { ...state, lotempMax: action.new_distance! };
        case RaceActionKind.UPDATE_PRECIP_MIN:
            return { ...state, precipMin: action.new_distance! };
        case RaceActionKind.UPDATE_PRECIP_MAX:
            return { ...state, precipMax: action.new_distance! };
        case RaceActionKind.UPDATE_DATE_MIN:
            return { ...state, dateMin: action.new_date! };
        case RaceActionKind.UPDATE_DATE_MAX:
            return { ...state, dateMax: action.new_date! };
        case RaceActionKind.UPDATE_LOC_SEARCH:
            return { ...state, locSearch: action.search! };
        case RaceActionKind.UPDATE_SEARCH:
            return { ...state, search: action.search! };
        case RaceActionKind.UPDATE_HOVERED_STATE:
            return { ...state, search: action.search! };
        case RaceActionKind.UPDATE_SORT_METHOD:
            return { ...state, sortMethod: action.search! };
        case RaceActionKind.CLOSE_DISTANCE_MENU:
            return { ...state, distanceMenuOpen: false };
        case RaceActionKind.OPEN_DISTANCE_MENU:
            return { ...state, distanceMenuOpen: true };
        case RaceActionKind.CLOSE_DATE_MENU:
            return { ...state, dateMenuOpen: false };
        case RaceActionKind.OPEN_DATE_MENU:
            return { ...state, dateMenuOpen: true };
        case RaceActionKind.CLOSE_MORE_MENU:
            return { ...state, moreMenuOpen: false };
        case RaceActionKind.OPEN_MORE_MENU:
            return { ...state, moreMenuOpen: true };
        case RaceActionKind.CLOSE_STATE_MENU:
            return { ...state, stateMenuOpen: false };
        case RaceActionKind.OPEN_STATE_MENU:
            return { ...state, stateMenuOpen: true };
        case RaceActionKind.UPDATE_ACTIVE_AREA:
            return { ...state, activeArea: action.new_area! };
        case RaceActionKind.UPDATE_NEED_LOAD:
            return { ...state, needLoad: !state.needLoad };
        case RaceActionKind.UPDATE_NEED_SORT:
            return { ...state, needSort: !state.needSort };
        case RaceActionKind.POPULATE_RACES:
            return {
                ...state,
                allResults: action.new_races!,
            };
        case RaceActionKind.UPDATE_GLOBAL_RESULTS:
            return {
                ...state,
                globalResults: action.new_races!,
            };
        case RaceActionKind.UPDATE_GLOBAL_SEARCH_RESULTS:
            return {
                ...state,
                globalSearchResults: action.new_races!,
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
        case RaceActionKind.UPDATE_MAP_COORDS:
            return {
                ...state,
                mapCoords: action.new_coords!,
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
        [],
    );

    const updateStateHover = useCallback(
        (state: string, isHovered: boolean) => {
            dispatch({
                type: RaceActionKind.UPDATE_STATE_HOVER,
                search: state,
                new_bool: isHovered,
            });
        },
        [],
    );

    const updateStates = useCallback((states: ActiveArea[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_STATES,
            new_states: states,
        });
    }, []);

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
            saveToLocal("distanceMin", dist1);
            saveToLocal("distanceMax", dist2);
        },
        [],
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
        saveToLocal("distanceMin", null);
        saveToLocal("distanceMax", null);
    }, []);

    const unsetWeather = useCallback(() => {
        dispatch({
            type: RaceActionKind.UPDATE_HITEMP_MIN,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_HITEMP_MAX,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_LOTEMP_MIN,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_LOTEMP_MAX,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_PRECIP_MIN,
            new_distance: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_PRECIP_MAX,
            new_distance: null,
        });
        saveToLocal("hitempMin", null);
        saveToLocal("hitempMax", null);
        saveToLocal("lotempMin", null);
        saveToLocal("lotempMax", null);
        saveToLocal("precipMin", null);
        saveToLocal("precipMax", null);
    }, []);

    const updateDistanceMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "distanceMin",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateDistanceMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_DISTANCE_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "distanceMax",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateHitempMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_HITEMP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "hitempMin",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateHitempMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_HITEMP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "hitempMax",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateLotempMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_LOTEMP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "lotempMin",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateLotempMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_LOTEMP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "lotempMax",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updatePrecipMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_PRECIP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "precipMin",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updatePrecipMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_PRECIP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
            saveToLocal(
                "precipMax",
                evt.target.value ? Number(evt.target.value) : null,
            );
        },
        [],
    );

    const updateActiveArea = useCallback((area: ActiveArea | null) => {
        dispatch({
            type: RaceActionKind.UPDATE_ACTIVE_AREA,
            new_area: area,
        });
        closeStateMenu();
        if (area) {
            const lat = area.latitude;
            const lon = area.longitude;
            updateMapCoords({
                latitude: lat,
                longitude: lon,
                zoom: 7,
            });
        }
    }, []);

    const toggleDistanceMenu = () => {
        state.distanceMenuOpen ? closeDistanceMenu() : openDistanceMenu();
    };

    const closeDistanceMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.CLOSE_DISTANCE_MENU,
        });
    }, []);

    const openDistanceMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.OPEN_DISTANCE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_DATE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_MORE_MENU,
        });
    }, []);

    const toggleDateMenu = () => {
        state.dateMenuOpen ? closeDateMenu() : openDateMenu();
    };

    const closeStateMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.CLOSE_STATE_MENU,
        });
    }, []);

    const openStateMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.OPEN_STATE_MENU,
        });
    }, []);

    const toggleStateMenu = () => {
        state.stateMenuOpen ? closeStateMenu() : openStateMenu();
    };

    const closeDateMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.CLOSE_DATE_MENU,
        });
    }, []);

    const openDateMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.OPEN_DATE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_DISTANCE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_MORE_MENU,
        });
    }, []);

    const toggleMoreMenu = () => {
        state.moreMenuOpen ? closeMoreMenu() : openMoreMenu();
    };

    const closeMoreMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.CLOSE_MORE_MENU,
        });
    }, []);

    const openMoreMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.OPEN_MORE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_DATE_MENU,
        });
        dispatch({
            type: RaceActionKind.CLOSE_DISTANCE_MENU,
        });
    }, []);

    const updateLocSearch = useCallback(
        (evt: ChangeEvent<HTMLInputElement> | string) => {
            if (typeof evt === "string") {
                dispatch({
                    type: RaceActionKind.UPDATE_LOC_SEARCH,
                    search: evt,
                });
            } else {
                dispatch({
                    type: RaceActionKind.UPDATE_LOC_SEARCH,
                    search: evt.target.value,
                });
            }
        },
        [],
    );

    const updateSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH,
            search: evt.target.value,
        });
    }, []);

    const updateHoveredState = useCallback((state: string) => {
        dispatch({
            type: RaceActionKind.UPDATE_HOVERED_STATE,
            search: state,
        });
    }, []);

    const updateSortMethod = useCallback((method: string) => {
        dispatch({
            type: RaceActionKind.UPDATE_SORT_METHOD,
            search: method,
        });
    }, []);

    const clearDates = useCallback(() => {
        dispatch({
            type: RaceActionKind.UPDATE_DATE_MIN,
            new_date: null,
        });
        dispatch({
            type: RaceActionKind.UPDATE_DATE_MAX,
            new_date: null,
        });
        saveToLocal("dateMin", null);
        saveToLocal("dateMax", null);
    }, []);

    const updateDateMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement> | string) => {
            if (typeof evt === "string") {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MIN,
                    new_date: new Date(evt),
                });
                saveToLocal("dateMin", evt);
            } else if (evt.target.value === "") {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MIN,
                    new_date: null,
                });
                saveToLocal("dateMin", null);
            } else {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MIN,
                    new_date: new Date(evt.target.value),
                });
                saveToLocal("dateMin", evt.target.value);
            }
        },
        [],
    );

    const updateDateMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement> | string) => {
            if (typeof evt === "string") {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MAX,
                    new_date: new Date(evt),
                });
                saveToLocal("dateMax", evt);
            } else if (evt.target.value === "") {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MAX,
                    new_date: null,
                });
                saveToLocal("dateMax", null);
            } else {
                dispatch({
                    type: RaceActionKind.UPDATE_DATE_MAX,
                    new_date: new Date(evt.target.value),
                });
                saveToLocal("dateMax", evt.target.value);
            }
        },
        [],
    );

    const updateAllResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.POPULATE_RACES,
            new_races: races,
        });
        let searchRaces: RaceType[] = races;
        searchRaces = filterDistances(searchRaces);
        searchRaces = filterRaces(searchRaces);
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH_RESULTS,
            new_races: searchRaces,
        });
    }, []);

    const updateGlobalResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_GLOBAL_RESULTS,
            new_races: races,
        });
        let globalSearchRaces: RaceType[] = races;
        globalSearchRaces = filterDistances(globalSearchRaces);
        globalSearchRaces = filterRaces(globalSearchRaces);
        dispatch({
            type: RaceActionKind.UPDATE_GLOBAL_SEARCH_RESULTS,
            new_races: globalSearchRaces,
        });
    }, []);

    const updateGlobalSearchResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_GLOBAL_SEARCH_RESULTS,
            new_races: races,
        });
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

    const updateMapCoords = useCallback((coords: MapCoordsType) => {
        dispatch({
            type: RaceActionKind.UPDATE_MAP_COORDS,
            new_coords: coords,
        });
        saveToLocal("mapCoords", coords);
    }, []);

    const updateNeedLoad = useCallback(() => {
        dispatch({
            type: RaceActionKind.UPDATE_NEED_LOAD,
        });
    }, []);

    const updateNeedSort = useCallback(() => {
        dispatch({
            type: RaceActionKind.UPDATE_NEED_SORT,
        });
    }, []);

    const compareByDistance = (a: RaceType, b: RaceType) => {
        if (a.distance_max < b.distance_max) return -1;
        if (a.distance_max > b.distance_max) return 1;
        return 0;
    };

    const compareByName = (a: RaceType, b: RaceType) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    };

    const compareByDate = (a: RaceType, b: RaceType) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    };

    const sortRaces = (races: RaceType[]) => {
        let compareFn = compareByName;
        if (!state.sortMethod) {
            return races;
        } else if (state.sortMethod === "distance") {
            compareFn = compareByDistance;
        } else if (state.sortMethod === "date") {
            compareFn = compareByDate;
        } else if (state.sortMethod === "name") {
            compareFn = compareByName;
        }
        return races.sort(compareFn);
    };

    const filterRaces = (races: RaceType[]) => {
        if (state.search !== null) {
            races = races.filter((race) =>
                race.name.toLowerCase().includes(state.search!.toLowerCase()),
            );
        }

        /*         if (state.activeArea !== null) {
            if (state.activeArea!.state.length > 0) {
                races = races.filter((race) =>
                    race.state
                        .toLowerCase()
                        .includes(state.activeArea!.state.toLowerCase())
                );
            }
        } */

        races = races.filter((race) => race.valid_distance!);

        if (state.dateMax !== null) {
            races = races.filter(
                (race) => new Date(race.date) <= state.dateMax!,
            );
        }

        if (state.dateMin !== null) {
            races = races.filter(
                (race) => new Date(race.date) >= state.dateMin!,
            );
        }

        if (state.hitempMin !== null) {
            races = races.filter(
                (race) => race.typical_high! >= state.hitempMin!,
            );
        }

        if (state.hitempMax !== null) {
            races = races.filter(
                (race) => race.typical_high! <= state.hitempMax!,
            );
        }

        if (state.lotempMin !== null) {
            races = races.filter(
                (race) => race.typical_low! >= state.lotempMin!,
            );
        }

        if (state.lotempMax !== null) {
            races = races.filter(
                (race) => race.typical_low! <= state.lotempMax!,
            );
        }

        if (state.precipMin !== null) {
            races = races.filter(
                (race) => race.precip_chance! >= state.precipMin!,
            );
        }

        if (state.precipMax !== null) {
            races = races.filter(
                (race) => race.precip_chance! <= state.precipMax!,
            );
        }

        races = sortRaces(races);

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
                (dist) => dist.match!,
            );
        });
        return races;
    };

    const applySort = () => {
        if (state.searchResults.length >= 2) {
            const races = sortRaces(state.searchResults);
            updateSearchResults(races);
        }
    };

    useEffect(() => {
        applySort();
    }, [state.needSort]);

    const applyFilters = () => {
        if (state.allResults.length >= 1) {
            const newSearch = filterRaces(state.allResults);
            updateSearchResults(newSearch);
        }
        if (state.globalResults.length >= 1) {
            const newGlobalSearch = filterRaces(state.globalResults);
            updateGlobalSearchResults(newGlobalSearch);
        }
    };

    const applyDistanceFilters = () => {
        if (state.allResults.length >= 1) {
            const updatedRaces = filterDistances(state.allResults);
            const newSearch = filterRaces(updatedRaces);
            updateSearchResults(newSearch);
        }
        if (state.globalSearchResults.length >= 1) {
            const updatedGlobalRaces = filterDistances(state.globalResults);
            const newGlobalSearch = filterRaces(updatedGlobalRaces);
            updateGlobalSearchResults(newGlobalSearch);
        }
    };

    /*     useEffect(() => {
        fetchRaces();
        applyFilters();
    }, []); */

    useEffect(() => {
        applyFilters();
    }, [
        state.search,
        state.dateMin,
        state.dateMax,
        state.hitempMin,
        state.hitempMax,
        state.lotempMin,
        state.lotempMax,
        state.precipMin,
        state.precipMax,
        state.activeArea,
        state.allResults,
    ]);

    useEffect(() => {
        applyDistanceFilters();
    }, [
        state.distanceMin,
        state.distanceMax,
        state.activeArea,
        state.allResults,
    ]);

    const sortByRaces = useCallback((a: ActiveArea, b: ActiveArea) => {
        if (!a.n_races) return 1;
        if (!b.n_races) return -1;
        if (a.n_races > b.n_races) {
            return -1;
        } else if (a.n_races < b.n_races) {
            return 1;
        }
        return 0;
    }, []);

    useEffect(() => {
        const loadGlobalResults = async () => {
            const data = await fetchRaces(null, false);
            updateGlobalResults(data);
        };
        loadGlobalResults();
    }, []);

    useEffect(() => {
        const updated_states: ActiveArea[] = StatesInit.map((reg) => ({
            ...reg,
            isHovered: false,
            n_races: state.globalSearchResults.filter(
                (race) => race.state.toLowerCase() === reg.state.toLowerCase(),
            ).length,
        })).sort((a, b) => sortByRaces(a, b));
        updateStates(updated_states);
    }, [state.globalSearchResults]);

    return {
        state,
        updateDistanceMin,
        updateDistanceMax,
        updateHitempMin,
        updateHitempMax,
        updateLotempMin,
        updateLotempMax,
        updatePrecipMin,
        updatePrecipMax,
        unsetWeather,
        setDistance,
        unsetDistance,
        updateSearch,
        updateHoveredState,
        updateSortMethod,
        updateLocSearch,
        updateDateMin,
        updateDateMax,
        clearDates,
        updateMapResults,
        updateGlobalResults,
        updateGlobalSearchResults,
        updateSearchResults,
        updateAllResults,
        updateMapCoords,
        updateHover,
        updateStates,
        updateStateHover,
        updateActiveArea,
        applyFilters,
        applyDistanceFilters,

        toggleDistanceMenu,
        closeDistanceMenu,
        openDistanceMenu,
        toggleDateMenu,
        closeDateMenu,
        openDateMenu,
        toggleMoreMenu,
        closeMoreMenu,
        openMoreMenu,
        closeStateMenu,
        openStateMenu,
        toggleStateMenu,
        updateNeedLoad,
        updateNeedSort,
    };
};

type UseRaceContextType = ReturnType<typeof useRaceContext>;

const initContextState: UseRaceContextType = {
    state: initState,
    updateDistanceMin: () => {},
    updateDistanceMax: () => {},
    updateHitempMin: () => {},
    updateHitempMax: () => {},
    updateLotempMin: () => {},
    updateLotempMax: () => {},
    updatePrecipMin: () => {},
    updatePrecipMax: () => {},
    unsetWeather: () => {},
    setDistance: () => {},
    unsetDistance: () => {},
    updateDateMin: () => {},
    updateDateMax: () => {},
    clearDates: () => {},
    updateSearch: () => {},
    updateHoveredState: () => {},
    updateSortMethod: () => {},
    updateLocSearch: () => {},
    updateMapResults: () => {},
    updateGlobalResults: () => {},
    updateGlobalSearchResults: () => {},
    updateSearchResults: () => {},
    updateAllResults: () => {},
    updateMapCoords: () => {},
    updateHover: () => {},
    updateStates: () => {},
    updateStateHover: () => {},
    updateActiveArea: () => {},
    applyFilters: () => {},
    applyDistanceFilters: () => {},

    toggleDistanceMenu: () => {},
    closeDistanceMenu: () => {},
    openDistanceMenu: () => {},
    toggleDateMenu: () => {},
    closeDateMenu: () => {},
    openDateMenu: () => {},
    toggleMoreMenu: () => {},
    closeMoreMenu: () => {},
    openMoreMenu: () => {},
    closeStateMenu: () => {},
    openStateMenu: () => {},
    toggleStateMenu: () => {},
    updateNeedLoad: () => {},
    updateNeedSort: () => {},
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
