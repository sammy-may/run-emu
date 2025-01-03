import {
    useRef,
    useContext,
    useMemo,
    useEffect,
    useState,
    useCallback,
} from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
    FillLayer,
    Layer,
    LineLayer,
    MapLayerMouseEvent,
    MapRef,
    Marker,
    Source,
} from "react-map-gl/dist/es5/exports-maplibre.js";
import maplibregl, { StyleSpecification } from "maplibre-gl";

import { ActiveArea, RaceContext } from "../context/RaceFeedContext";
import { StatesInit } from "../constants/States";
import { TiDelete } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { Protocol } from "pmtiles";
import layers from "protomaps-themes-base";
import { loadAllGeoJson } from "../api/boundaries";
import { FaLocationDot } from "react-icons/fa6";
import { slugify } from "../utils/url_utils";

const RaceMap = () => {
    const {
        state: {
            searchResults,
            mapResults,
            mapCoords,
            stateMenuOpen,
            activeArea,
            states,
            locSearch,
        },
        updateSearchResults,
        updateHover,
        updateStates,
        updateStateHover,
        updateMapCoords,
        openStateMenu,
        updateLocSearch,
        closeStateMenu,
    } = useContext(RaceContext);

    useEffect(() => {
        let protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);
        return () => {
            maplibregl.removeProtocol("pmtiles");
        };
    }, []);

    // Hovered state
    const [hoveredState, setHoveredState] = useState<string>("");

    // Resize map based on window width
    const [windowWidth, setWindowWidth] = useState<number>(1024);

    useEffect(() => {
        // Function to update the window width
        const handleResize = () => {
            if (typeof window !== undefined) {
                setWindowWidth(window.innerWidth);
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const mapHeight = windowWidth >= 1024 ? "80vh" : "35vh";

    const [geoJsonData, setGeoJsonData] = useState<any>({
        type: "FeatureCollection",
        features: [],
    });
    useEffect(() => {
        const loadGeoJson = async () => {
            const data = await loadAllGeoJson();
            setGeoJsonData(data);
        };
        loadGeoJson();
    }, []);

    // for info button
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const handleInfoMouseOver = () => {
        setIsInfoHovered(true);
    };
    const handleInfoMouseOut = () => {
        setIsInfoHovered(false);
    };
    const handleInfoClick = () => {
        setIsInfoHovered(!isInfoHovered);
    };

    const [oneHover, setOneHover] = useState<boolean>(false);

    const mapRef = useRef<MapRef>(null);

    const pointInView = (lat: number, lon: number) => {
        return mapRef.current?.getBounds().contains([lon, lat]);
    };

    const filterOnMap = useCallback(() => {
        const races = searchResults;

        races.forEach((race, index) => {
            races[index].onMap = pointInView(race.latitude, race.longitude);
        });
        updateSearchResults([...races]);

        const lat =
            mapRef.current?.getCenter().lat ?? activeArea?.latitude ?? -40;
        const lon =
            mapRef.current?.getCenter().lng ?? activeArea?.longitude ?? 118;
        const zoom = mapRef.current?.getZoom() ?? 6;
        if (mapRef.current) {
            updateMapCoords({
                latitude: lat,
                longitude: lon,
                zoom: zoom,
            });
        }
    }, [searchResults, activeArea, mapCoords]);

    const fly = useCallback(() => {
        let state = activeArea;
        if (state === null || state === undefined) return;
        if (mapRef.current) {
            if (state.state !== "") {
                mapRef.current.flyTo({
                    center: [state.longitude, state.latitude],
                    zoom: 5,
                    essential: true,
                });
            }
        }
    }, [activeArea]);

    const flyAndFilter = useCallback(() => {
        fly();
        filterOnMap();
    }, [fly, filterOnMap]);

    useEffect(() => {
        fly();
    }, [activeArea]);

    const clearHover = useCallback(() => {
        setHoveredState("");
    }, [setHoveredState]);

    const loadGeoJson = async (state: string) => {
        if (
            state === "hawaii" ||
            state.toLowerCase().includes("canada") ||
            state.toLowerCase().includes("bissau") ||
            state.toLowerCase().includes("congo") ||
            state.toLowerCase().includes("ncipe")
            //!(country === "usa" || country === "canada")
        ) {
            return {};
        }
        const url = `https://hzbtbujyhfuhbtramttg.supabase.co/storage/v1/object/public/boundaries/${state}.json`;
        const resp = await fetch(url);
        const res = await resp.json();
        return res;
    };

    useEffect(() => {
        const fetchStates = async () => {
            const updated_states: ActiveArea[] = await Promise.all(
                StatesInit.map(async (state) => ({
                    ...state,
                    boundary: await loadGeoJson(
                        state.state.toLowerCase().replace(/\s+/g, "_"),
                    ),
                    isHovered: false,
                })),
            );
            updateStates([...updated_states]);
        };
        fetchStates();
    }, []);

    const Markers = useMemo(
        () =>
            mapResults.slice(0, 100).map((race) => (
                <div
                    onMouseEnter={() => {
                        updateHover(race.id!, true, true);
                        setOneHover(true);
                    }}
                    onMouseLeave={() => {
                        updateHover(race.id!, false, true);
                        setOneHover(false);
                    }}
                    key={"marker_div" + race.name}
                >
                    <Marker
                        key={"marker" + race.name}
                        longitude={race.longitude}
                        latitude={race.latitude}
                        anchor="bottom"
                        onClick={() => {
                            updateHover(race.id!, true, true);
                        }}
                        style={{ zIndex: race.isHovered ? 50 : "unset" }}
                    >
                        {race.isHovered ? (
                            <div className="text-4xl text-dustyRose-200">
                                <FaLocationDot />
                            </div>
                        ) : (
                            /*                             <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                                className="h-16"
                                alt="Point"
                            /> */
                            <div className="text-xl">
                                <FaLocationDot />
                            </div>
                            /*                             <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
                                className="h-8"
                                alt="Point"
                            /> */
                        )}
                    </Marker>
                </div>
            )),
        [mapResults],
    );

    const handleMouse = useCallback((evt: MapLayerMouseEvent) => {
        if (mapRef.current && evt.features && evt.features.length > 0) {
            evt.features.forEach((feat) => {
                const state = slugify(feat["properties"]["state"]);
                if (
                    !(state === "usa" || state === "canada") &&
                    state !== hoveredState
                ) {
                    console.log("hovering", state);
                    setHoveredState(state);
                }
            });
        }
    }, []);

    const clickLink = (url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_self";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    };

    const handleClick = useCallback(
        (evt: MapLayerMouseEvent) => {
            if (mapRef.current && evt.features && evt.features.length > 0) {
                evt.features.forEach((feat) => {
                    const state = slugify(feat["properties"]["state"]);
                    if (
                        !(state === "usa" || state === "canada") &&
                        state !== hoveredState
                    ) {
                        if (!oneHover) {
                            clickLink("/location/" + state);
                        }
                    }
                });
            }
        },
        [oneHover],
    );

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target) {
            openStateMenu();
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target) {
            //closeStateMenu();
            //updateLocSearch("");
        }
    };

    const highlightLayer: FillLayer = useMemo(
        () => ({
            id: "highlight-layer",
            type: "fill",
            source: "base-layer",
            paint: {
                "fill-color": "#b35e75", // dustyRose-600
                "fill-opacity": 0.5,
            },
            filter: ["==", "state", hoveredState], // Highlight only the hovered state
        }),
        [hoveredState],
    );

    const highlightBorder: LineLayer = useMemo(
        () => ({
            id: "highlight-border",
            type: "line",
            source: "line-layer",
            paint: {
                "line-color": "#ee728d", // dustyRose-400
                "line-width": 2,
            },
            filter: ["==", "state", hoveredState],
        }),
        [hoveredState],
    );

    const activeLayer: FillLayer = useMemo(
        () => ({
            id: "active-layer",
            type: "fill",
            source: "base-layer",
            paint: {
                "fill-color": "#8b4759", // dustyRose-700
                "fill-opacity": 0.5,
            },
            filter: [
                "==",
                "state",
                activeArea ? slugify(activeArea.state) : "sdffsdfd",
            ], // Highlight only the hovered state
        }),
        [activeArea],
    );

    const activeBorder: LineLayer = useMemo(
        () => ({
            id: "active-border",
            type: "line",
            source: "line-layer",
            paint: {
                "line-color": "#da7b93", // dustyRose-500
                "line-width": 2,
            },
            filter: [
                "==",
                "state",
                activeArea ? slugify(activeArea.state) : "sdffsdfd",
            ],
        }),
        [activeArea],
    );

    // Base layer for all states
    const baseLayer: FillLayer = useMemo(
        () => ({
            id: "base-layer",
            type: "fill",
            source: "",
            paint: {
                "fill-color": "#0080ff", // Default color
                "fill-opacity": 0.0,
            },
        }),
        [],
    );

    const baseBorder: LineLayer = useMemo(
        () => ({
            id: "line-layer",
            type: "line",
            source: "",
            paint: {
                "line-color": "#0080ff",
                "line-width": 0,
            },
        }),
        [],
    );

    const version: 8 = 8;
    const mapStyle: StyleSpecification = {
        version: version,
        glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
        sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/dark",
        sources: {
            protomaps: {
                attribution:
                    '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
                type: "vector",
                url: "pmtiles://https://hzbtbujyhfuhbtramttg.supabase.co/storage/v1/object/public/map-tiles/my_area.pmtiles?t=2024-12-31T19%3A58%3A20.088Z",
            },
        },
        layers: layers("protomaps", "dark", "en"),
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Define the keydown event handler
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "?" && inputRef.current) {
                event.preventDefault(); // Prevent the default action of the `/` key (e.g., typing it in)
                inputRef.current.focus();
            }
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex flex-col items-center relative w-full">
            <div className="flex flex-col items-end place-content-start w-full">
                <div className="flex items-center w-full">
                    <div className="text-left relative w-full">
                        <form onSubmit={(evt) => evt.preventDefault()}>
                            <input
                                id="search"
                                type="text"
                                placeholder=""
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={locSearch ?? ""}
                                className="border px-3 py-2 text-sm rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                onChange={updateLocSearch}
                            />
                            {!stateMenuOpen && (
                                <div className="absolute top-0 py-2 px-3 text-sm rounded-lg flex items-center text-gray-400 space-x-2 pointer-events-none">
                                    <div className="">
                                        <IoSearchOutline />
                                    </div>
                                    <div className="block text-sm">
                                        Type{" "}
                                        <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-600 text-gray-100 border-gray-500">
                                            ?
                                        </kbd>{" "}
                                        to search by region
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {activeArea && (
                        <div
                            className="absolute flex items-center space-x-2 z-50 rounded-lg border top-16 right-0 text-dustyRose-50 border-dustyRose-500 bg-dustyRose-700 px-3 py-1 text-sm font-semibold hover:bg-dustyRose-600 hover:border-dustyRose-400 hover:cursor-pointer m-6"
                            onClick={() => {
                                clickLink("/location/all");
                            }}
                            onMouseEnter={() => {
                                updateStateHover("", false);
                            }}
                        >
                            <div>{"Remove boundary : " + activeArea.state}</div>
                            <div className="text-lg">
                                <TiDelete />
                            </div>
                        </div>
                    )}

                    {stateMenuOpen && (
                        <div className="absolute z-50 rounded-lg bg-gray-700 border border-gray-600 top-9 left-0 divide-y divide-gray-600 shadow min-w-44">
                            <ul
                                className="py-2 text-sm text-gray-200 overflow-y-auto max-h-72"
                                aria-labelledby="sortInfo"
                            >
                                {states.map((state, index) => {
                                    if (
                                        (!locSearch &&
                                            (state.country === "USA" ||
                                                true ||
                                                state.country === "Canada")) ||
                                        (locSearch &&
                                            state.state
                                                .toLowerCase()
                                                .includes(
                                                    locSearch.toLowerCase(),
                                                ))
                                    ) {
                                        return (
                                            <a
                                                href={`/location/${slugify(state.state)}`}
                                                key={
                                                    "link" + state.state + index
                                                }
                                            >
                                                <li
                                                    className="flex px-4 py-2 hover:bg-gray-600 hover:text-white w-full hover:cursor-pointer"
                                                    key={
                                                        "li" +
                                                        state.state +
                                                        index
                                                    }
                                                >
                                                    {state.state}
                                                </li>
                                            </a>
                                        );
                                    }
                                })}
                            </ul>
                            <div className="place-content-center flex items-center w-full space-x-3 py-2">
                                {/*                                 <a href="/location/all">
                                    <button
                                        onClick={() => updateLocSearch("")}
                                        className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    >
                                        Clear
                                    </button>
                                </a> */}
                                <button
                                    onClick={() => {
                                        closeStateMenu();
                                        updateLocSearch("");
                                    }}
                                    className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="relative rounded-lg border mt-2 -mb-2.5 mx-3 px-3 text-xs font-medium bg-gray-800 border-gray-600 text-gray-400 items-center flex whitespace-nowrap overflow-x-auto z-10">
                    Showing{" "}
                    <span className="text-dustyRose-200 font-medium px-1">
                        {mapResults.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-periwinkleBlue-200 font-medium px-1">
                        {searchResults.length}
                    </span>
                    <span className="">races matching your criteria</span>
                    <span
                        className="hover:cursor-pointer pl-1 hover:text-indigo-200"
                        onMouseEnter={handleInfoMouseOver}
                        onMouseLeave={handleInfoMouseOut}
                        onClick={handleInfoClick}
                    >
                        <IoMdInformationCircleOutline />
                    </span>
                </p>
                {isInfoHovered && (
                    <div className="flex flex-col absolute top-16 right-8 z-50 bg-gray-800 border border-gray-600 rounded-lg space-y-3 text-sm text-gray-400 p-3">
                        <span>
                            There are{" "}
                            <span className="text-periwinkleBlue-200 font-medium">
                                {searchResults.length}
                            </span>{" "}
                            races in the RunEmu database that{" "}
                            <span className="text-periwinkleBlue-200 font-medium">
                                match your search criteria
                            </span>
                            .
                        </span>
                        <span>
                            Of those,{" "}
                            <span className="text-dustyRose-200 font-medium">
                                {mapResults.length}
                            </span>{" "}
                            are{" "}
                            <span className="text-dustyRose-200 font-medium">
                                within
                            </span>{" "}
                            the{" "}
                            <span className="text-dustyRose-200 font-medium">
                                map bounds and/or boundary
                            </span>
                            ; these races are shown in your feed .
                        </span>
                        <span>
                            <span className="text-blue-200 font-medium">
                                Map markers
                            </span>{" "}
                            are displayed for up to the next{" "}
                            <span className="text-blue-200 font-medium">
                                100
                            </span>{" "}
                            of these races. We limit the number of markers to
                            ensure a fast and responsive experience for all
                            users.
                        </span>
                        <span className="">
                            <span className="font-gray-200 font-medium pr-1">
                                Tips:
                            </span>
                            narrow your search results by
                            <ul className="list-disc px-6">
                                <li>
                                    selecting a region from the dropdown menu,
                                    by clicking or by typing{" "}
                                    <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-600 text-gray-100 border-gray-500">
                                        ?
                                    </kbd>
                                </li>
                                <li>
                                    selecting a region by clicking its
                                    highlighted border on the map
                                </li>
                                <li>
                                    zooming and dragging the map to your region
                                    of interest
                                </li>
                            </ul>
                        </span>
                    </div>
                )}
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg w-full py-4 px-2">
                <Map
                    initialViewState={mapCoords}
                    ref={mapRef}
                    maxZoom={9}
                    style={{ width: "100%", height: mapHeight }}
                    mapStyle={mapStyle}
                    onZoomEnd={filterOnMap}
                    onMoveEnd={filterOnMap}
                    //onIdle={() => filterOnMap()}
                    onMouseMove={handleMouse}
                    onMouseOut={clearHover}
                    onClick={handleClick}
                    interactiveLayerIds={["base-layer"]}
                    onLoad={flyAndFilter}
                >
                    {Markers}
                    {geoJsonData && (
                        <Source
                            id="state-boundaries"
                            type="geojson"
                            data={geoJsonData}
                        >
                            <Layer {...baseLayer} />
                            <Layer {...baseBorder} />
                            <Layer {...highlightLayer} />
                            <Layer {...highlightBorder} />
                            <Layer {...activeLayer} />
                            <Layer {...activeBorder} />
                        </Source>
                    )}
                </Map>
            </div>
        </div>
    );
};

export default RaceMap;
