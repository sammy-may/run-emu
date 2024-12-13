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
    UPDATE_HITEMP_MIN = "UPDATE_HITEMP_MIN",
    UPDATE_HITEMP_MAX = "UPDATE_HITEMP_MAX",
    UPDATE_LOTEMP_MIN = "UPDATE_LOTEMP_MIN",
    UPDATE_LOTEMP_MAX = "UPDATE_LOTEMP_MAX",
    UPDATE_PRECIP_MIN = "UPDATE_PRECIP_MIN",
    UPDATE_PRECIP_MAX = "UPDATE_PRECIP_MAX",
    UPDATE_DATE_MIN = "UPDATE_DATE_MIN",
    UPDATE_DATE_MAX = "UPDATE_DATE_MAX",
    UPDATE_SEARCH = "UPDATE_SEARCH",
    POPULATE_RACES = "POPULATE_RACES",
    UPDATE_MAP_RESULTS = "UPDATE_MAP_RESULTS",
    UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS",
    UPDATE_MAP_COORDS = "UPDATE_MAP_COORDS",
    UPDATE_HOVER = "UPDATE_HOVER",

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
}

export const fetchAllRaces = async (
    state: ActiveArea | null
): Promise<RaceType[]> => {
    let races: RaceType[] = [];
    try {
        const response = await api.get("", {
            params: { active_only: true },
        });
        races = response.data;
        races = races.map((race, index) => ({
            ...race,
            isHovered: false,
            onMap: false,
            id: index,
            valid_distance: true,
        }));
        if (state && state.state.length > 0) {
            races = races.filter((race) => {
                return race.state.toLowerCase() === state.state.toLowerCase();
            });
        }
    } catch (err) {
        console.log(err);
    }
    return races;
};

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
}

export const States: ActiveArea[] = [
    {
        city: "St. John's",
        state: "Newfoundland and Labrador",
        country: "Canada",
        latitude: 47.5615,
        longitude: -52.7126,
    },
    {
        city: "Halifax",
        state: "Nova Scotia",
        country: "Canada",
        latitude: 44.6488,
        longitude: -63.5752,
    },
    {
        city: "Charlottetown",
        state: "Prince Edward Island",
        country: "Canada",
        latitude: 46.2382,
        longitude: -63.1311,
    },
    {
        city: "Fredericton",
        state: "New Brunswick",
        country: "Canada",
        latitude: 45.9636,
        longitude: -66.6431,
    },
    {
        city: "Quebec City",
        state: "Quebec",
        country: "Canada",
        latitude: 46.8139,
        longitude: -71.2082,
    },
    {
        city: "Toronto",
        state: "Ontario",
        country: "Canada",
        latitude: 43.6511,
        longitude: -79.347,
    },
    {
        city: "Winnipeg",
        state: "Manitoba",
        country: "Canada",
        latitude: 49.8951,
        longitude: -97.1384,
    },
    {
        city: "Regina",
        state: "Saskatchewan",
        country: "Canada",
        latitude: 50.4452,
        longitude: -104.6189,
    },
    {
        city: "Edmonton",
        state: "Alberta",
        country: "Canada",
        latitude: 53.5461,
        longitude: -113.4938,
    },
    {
        city: "Victoria",
        state: "British Columbia",
        country: "Canada",
        latitude: 48.4284,
        longitude: -123.3656,
    },
    {
        city: "Whitehorse",
        state: "Yukon",
        country: "Canada",
        latitude: 60.7212,
        longitude: -135.0568,
    },
    {
        city: "Yellowknife",
        state: "Northwest Territories",
        country: "Canada",
        latitude: 62.454,
        longitude: -114.3718,
    },
    {
        city: "Iqaluit",
        state: "Nunavut",
        country: "Canada",
        latitude: 63.7467,
        longitude: -68.516,
    },
    {
        city: "Montgomery",
        state: "Alabama",
        country: "USA",
        latitude: 32.3668,
        longitude: -86.3,
    },
    {
        city: "Juneau",
        state: "Alaska",
        country: "USA",
        latitude: 58.3019,
        longitude: -134.4197,
    },
    {
        city: "Phoenix",
        state: "Arizona",
        country: "USA",
        latitude: 33.4484,
        longitude: -112.074,
    },
    {
        city: "Little Rock",
        state: "Arkansas",
        country: "USA",
        latitude: 34.7465,
        longitude: -92.2896,
    },
    {
        city: "Sacramento",
        state: "California",
        country: "USA",
        latitude: 38.5816,
        longitude: -121.4944,
    },
    {
        city: "Denver",
        state: "Colorado",
        country: "USA",
        latitude: 39.7392,
        longitude: -104.9903,
    },
    {
        city: "Hartford",
        state: "Connecticut",
        country: "USA",
        latitude: 41.7658,
        longitude: -72.6734,
    },
    {
        city: "Dover",
        state: "Delaware",
        country: "USA",
        latitude: 39.1582,
        longitude: -75.5244,
    },
    {
        city: "Tallahassee",
        state: "Florida",
        country: "USA",
        latitude: 30.4383,
        longitude: -84.2807,
    },
    {
        city: "Atlanta",
        state: "Georgia",
        country: "USA",
        latitude: 33.749,
        longitude: -84.388,
    },
    {
        city: "Honolulu",
        state: "Hawaii",
        country: "USA",
        latitude: 21.307,
        longitude: -157.8584,
    },
    {
        city: "Boise",
        state: "Idaho",
        country: "USA",
        latitude: 43.615,
        longitude: -116.2023,
    },
    {
        city: "Springfield",
        state: "Illinois",
        country: "USA",
        latitude: 39.7983,
        longitude: -89.6544,
    },
    {
        city: "Indianapolis",
        state: "Indiana",
        country: "USA",
        latitude: 39.7684,
        longitude: -86.1581,
    },
    {
        city: "Des Moines",
        state: "Iowa",
        country: "USA",
        latitude: 41.5868,
        longitude: -93.625,
    },
    {
        city: "Topeka",
        state: "Kansas",
        country: "USA",
        latitude: 39.0489,
        longitude: -95.678,
    },
    {
        city: "Frankfort",
        state: "Kentucky",
        country: "USA",
        latitude: 38.2009,
        longitude: -84.8733,
    },
    {
        city: "Baton Rouge",
        state: "Louisiana",
        country: "USA",
        latitude: 30.4515,
        longitude: -91.1871,
    },
    {
        city: "Augusta",
        state: "Maine",
        country: "USA",
        latitude: 44.3106,
        longitude: -69.7795,
    },
    {
        city: "Annapolis",
        state: "Maryland",
        country: "USA",
        latitude: 38.9784,
        longitude: -76.4922,
    },
    {
        city: "Boston",
        state: "Massachusetts",
        country: "USA",
        latitude: 42.3601,
        longitude: -71.0589,
    },
    {
        city: "Lansing",
        state: "Michigan",
        country: "USA",
        latitude: 42.7325,
        longitude: -84.5555,
    },
    {
        city: "Saint Paul",
        state: "Minnesota",
        country: "USA",
        latitude: 44.9537,
        longitude: -93.09,
    },
    {
        city: "Jackson",
        state: "Mississippi",
        country: "USA",
        latitude: 32.2988,
        longitude: -90.1848,
    },
    {
        city: "Jefferson City",
        state: "Missouri",
        country: "USA",
        latitude: 38.5767,
        longitude: -92.1735,
    },
    {
        city: "Helena",
        state: "Montana",
        country: "USA",
        latitude: 46.5891,
        longitude: -112.0391,
    },
    {
        city: "Lincoln",
        state: "Nebraska",
        country: "USA",
        latitude: 40.8136,
        longitude: -96.7026,
    },
    {
        city: "Carson City",
        state: "Nevada",
        country: "USA",
        latitude: 39.1638,
        longitude: -119.7674,
    },
    {
        city: "Concord",
        state: "New Hampshire",
        country: "USA",
        latitude: 43.2081,
        longitude: -71.5376,
    },
    {
        city: "Trenton",
        state: "New Jersey",
        country: "USA",
        latitude: 40.2171,
        longitude: -74.7429,
    },
    {
        city: "Santa Fe",
        state: "New Mexico",
        country: "USA",
        latitude: 35.687,
        longitude: -105.9378,
    },
    {
        city: "Albany",
        state: "New York",
        country: "USA",
        latitude: 42.6526,
        longitude: -73.7562,
    },
    {
        city: "Raleigh",
        state: "North Carolina",
        country: "USA",
        latitude: 35.7796,
        longitude: -78.6382,
    },
    {
        city: "Bismarck",
        state: "North Dakota",
        country: "USA",
        latitude: 46.8083,
        longitude: -100.7837,
    },
    {
        city: "Columbus",
        state: "Ohio",
        country: "USA",
        latitude: 39.9612,
        longitude: -82.9988,
    },
    {
        city: "Oklahoma City",
        state: "Oklahoma",
        country: "USA",
        latitude: 35.4676,
        longitude: -97.5164,
    },
    {
        city: "Salem",
        state: "Oregon",
        country: "USA",
        latitude: 44.9429,
        longitude: -123.0351,
    },
    {
        city: "Harrisburg",
        state: "Pennsylvania",
        country: "USA",
        latitude: 40.2732,
        longitude: -76.8867,
    },
    {
        city: "Providence",
        state: "Rhode Island",
        country: "USA",
        latitude: 41.824,
        longitude: -71.4128,
    },
    {
        city: "Columbia",
        state: "South Carolina",
        country: "USA",
        latitude: 34.0007,
        longitude: -81.0348,
    },
    {
        city: "Pierre",
        state: "South Dakota",
        country: "USA",
        latitude: 44.3683,
        longitude: -100.351,
    },
    {
        city: "Nashville",
        state: "Tennessee",
        country: "USA",
        latitude: 36.1627,
        longitude: -86.7816,
    },
    {
        city: "Austin",
        state: "Texas",
        country: "USA",
        latitude: 30.2672,
        longitude: -97.7431,
    },
    {
        city: "Salt Lake City",
        state: "Utah",
        country: "USA",
        latitude: 40.7608,
        longitude: -111.891,
    },
    {
        city: "Montpelier",
        state: "Vermont",
        country: "USA",
        latitude: 44.2601,
        longitude: -72.5754,
    },
    {
        city: "Richmond",
        state: "Virginia",
        country: "USA",
        latitude: 37.5407,
        longitude: -77.436,
    },
    {
        city: "Olympia",
        state: "Washington",
        country: "USA",
        latitude: 47.0379,
        longitude: -122.9007,
    },
    {
        city: "Charleston",
        state: "West Virginia",
        country: "USA",
        latitude: 38.3498,
        longitude: -81.6326,
    },
    {
        city: "Madison",
        state: "Wisconsin",
        country: "USA",
        latitude: 43.0731,
        longitude: -89.4012,
    },
    {
        city: "Cheyenne",
        state: "Wyoming",
        country: "USA",
        latitude: 41.14,
        longitude: -104.8202,
    },
].sort((a, b) => a.state.localeCompare(b.state));

interface RaceAction {
    type: RaceActionKind;
    new_distance?: number | null;
    new_date?: Date | null;
    search?: string;
    new_races?: RaceType[];
    index?: number;
    new_bool?: boolean;
    sort?: boolean;
    new_coords?: MapCoordsType;
    new_area?: ActiveArea | null;
}

const initMapState: MapCoordsType = {
    latitude: 40,
    longitude: -118,
    zoom: 6,
};

const getFromLocal = (name: string) => {
    if (typeof window !== "undefined") {
        try {
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
            sessionStorage.setItem(name, JSON.stringify(value));
        } catch {
            return;
        }
    }
};

interface RaceState {
    allResults: RaceType[];
    searchResults: RaceType[];
    mapResults: RaceType[];
    search: string | null;
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
    needLoad: boolean;
}

const initState: RaceState = {
    allResults: [],
    searchResults: [],
    mapResults: [],
    search: null,
    distanceMin: null,
    distanceMax: null,
    hitempMin: null,
    hitempMax: null,
    lotempMin: null,
    lotempMax: null,
    precipMin: null,
    precipMax: null,
    dateMin: new Date(),
    dateMax: null,
    mapCoords: getFromLocal("mapCoords") ?? initMapState,
    distanceMenuOpen: false,
    dateMenuOpen: false,
    moreMenuOpen: false,
    stateMenuOpen: false,
    activeArea: null,
    needLoad: true,
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
        case RaceActionKind.UPDATE_SEARCH:
            return { ...state, search: action.search! };
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
        case RaceActionKind.POPULATE_RACES:
            let searchResults: RaceType[] | null = [];
            let mapResults: RaceType[] | null = [];
            searchResults = getFromLocal("searchResults");
            mapResults = getFromLocal("mapResults");

            if (searchResults) {
                if (searchResults.length === 0) {
                    searchResults = action.new_races!;
                }
            } else {
                searchResults = action.new_races!;
            }

            if (mapResults) {
                if (mapResults.length === 0) {
                    mapResults = action.new_races!;
                }
            } else {
                mapResults = action.new_races!;
            }

            return {
                ...state,
                allResults: action.new_races!,
                searchResults: searchResults,
                mapResults: mapResults,
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

    const updateHitempMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_HITEMP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updateHitempMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_HITEMP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updateLotempMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_LOTEMP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updateLotempMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_LOTEMP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updatePrecipMin = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_PRECIP_MIN,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
    );

    const updatePrecipMax = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: RaceActionKind.UPDATE_PRECIP_MAX,
                new_distance: evt.target.value
                    ? Number(evt.target.value)
                    : null,
            });
        },
        []
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
        console.log("close");
    }, []);

    const openStateMenu = useCallback(() => {
        dispatch({
            type: RaceActionKind.OPEN_STATE_MENU,
        });
        console.log("open");
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

    const updateSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH,
            search: evt.target.value,
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
    }, []);

    const updateDateMin = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value === "") {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MIN,
                new_date: null,
            });
        } else {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MIN,
                new_date: new Date(evt.target.value),
            });
        }
    }, []);

    const updateDateMax = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value === "") {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MAX,
                new_date: null,
            });
        } else {
            dispatch({
                type: RaceActionKind.UPDATE_DATE_MAX,
                new_date: new Date(evt.target.value),
            });
        }
    }, []);

    const updateAllResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.POPULATE_RACES,
            new_races: races,
        });
    }, []);

    const updateSearchResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_SEARCH_RESULTS,
            new_races: races,
        });
        saveToLocal("searchResults", races);
        updateMapResults([...races.filter((race) => race.onMap)]);
    }, []);

    const updateMapResults = useCallback((races: RaceType[]) => {
        dispatch({
            type: RaceActionKind.UPDATE_MAP_RESULTS,
            new_races: races,
        });
        saveToLocal("mapResults", races);
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

    const fetchRaces = async () => {
        let races: RaceType[] = await fetchAllRaces(null);
        dispatch({
            type: RaceActionKind.POPULATE_RACES,
            new_races: races,
        });
    };

    const filterRaces = (races: RaceType[]) => {
        if (state.search !== null) {
            races = races.filter((race) =>
                race.name.toLowerCase().includes(state.search!.toLowerCase())
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
                (race) => new Date(race.date) <= state.dateMax!
            );
        }

        if (state.dateMin !== null) {
            races = races.filter(
                (race) => new Date(race.date) >= state.dateMin!
            );
        }

        if (state.hitempMin !== null) {
            races = races.filter(
                (race) => race.typical_high! >= state.hitempMin!
            );
        }

        if (state.hitempMax !== null) {
            races = races.filter(
                (race) => race.typical_high! <= state.hitempMax!
            );
        }

        if (state.lotempMin !== null) {
            races = races.filter(
                (race) => race.typical_low! >= state.lotempMin!
            );
        }

        if (state.lotempMax !== null) {
            races = races.filter(
                (race) => race.typical_low! <= state.lotempMax!
            );
        }

        if (state.precipMin !== null) {
            races = races.filter(
                (race) => race.precip_chance! >= state.precipMin!
            );
        }

        if (state.precipMax !== null) {
            races = races.filter(
                (race) => race.precip_chance! <= state.precipMax!
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
        updateSearchResults(newSearch);
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
    ]);

    useEffect(() => {
        applyDistanceFilters();
    }, [state.distanceMin, state.distanceMax]);

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
        updateDateMin,
        updateDateMax,
        clearDates,
        updateMapResults,
        updateSearchResults,
        updateAllResults,
        updateMapCoords,
        updateHover,
        updateActiveArea,

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
    updateMapResults: () => {},
    updateSearchResults: () => {},
    updateAllResults: () => {},
    updateMapCoords: () => {},
    updateHover: () => {},
    updateActiveArea: () => {},

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
