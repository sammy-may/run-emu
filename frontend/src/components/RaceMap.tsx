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

import { RaceContext } from "../context/RaceFeedContext";
import { TiDelete } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";

import { Protocol } from "pmtiles";
import layers from "protomaps-themes-base";
import { loadAllGeoJson } from "../api/boundaries";
import { FaLocationDot } from "react-icons/fa6";
import { slugify } from "../utils/url_utils";
import { useUserSettings } from "../context/UserSettingsContext";

const RaceMap = () => {
    const {
        state: {
            allResults,
            searchResults,
            globalResults,
            mapResults,
            mapCoords,
            stateMenuOpen,
            activeArea,
            locSearch,
            states,
        },
        updateSearchResults,
        updateHover,
        updateStateHover,
        updateMapCoords,
        openStateMenu,
        updateLocSearch,
        closeStateMenu,
    } = useContext(RaceContext);

    const { theme } = useUserSettings();

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
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        // Function to update the window width
        const handleResize = () => {
            if (typeof window !== undefined) {
                setWindowWidth(window.innerWidth);
            }
        };
        handleResize();

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

    // for indicator when 0 races
    const [isDismissed, setIsDismissed] = useState<boolean>(false);

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

        if (searchResults.length >= 1) {
            races.forEach((race, index) => {
                races[index].onMap = pointInView(race.latitude, race.longitude);
            });
            updateSearchResults([...races]);
        }

        const lat =
            mapRef.current?.getCenter().lat ?? activeArea?.latitude ?? -38;
        const lon =
            mapRef.current?.getCenter().lng ?? activeArea?.longitude ?? 120;
        const zoom = mapRef.current?.getZoom() ?? 4;
        if (mapRef.current) {
            updateMapCoords({
                latitude: lat,
                longitude: lon,
                zoom: zoom,
            });
        }
    }, [searchResults, activeArea, mapCoords, allResults]);

    const zoomOut = useCallback(() => {
        if (mapRef.current) {
            setIsDismissed(true);
            clickLink("/location/all");
            mapRef.current.flyTo({
                center: [0, 0],
                zoom: 1,
                essential: true,
            });
        }
    }, []);

    useEffect(() => {
        setIsDismissed(false);
    }, [activeArea]);

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

    const HighlightMarkers = useMemo(() => {
        if (slugify(activeArea?.state ?? "") === hoveredState) return [];
        return globalResults
            .filter((race) => {
                return slugify(race.state) === hoveredState;
            })
            .slice(0, 100)
            .map((race) => {
                return (
                    <div key={"hl_marker_div" + race.name}>
                        <Marker
                            key={"hl_marker" + race.name}
                            longitude={race.longitude}
                            latitude={race.latitude}
                            anchor="bottom"
                            style={{ zIndex: race.isHovered ? 50 : "unset" }}
                        >
                            {race.isHovered ? (
                                <div className="text-4xl dark:text-dustyRose-200 text-dustyRose-700">
                                    <FaLocationDot />
                                </div>
                            ) : (
                                /*                             <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                                className="h-16"
                                alt="Point"
                            /> */
                                <div className="text-xl text-gray-600 dark:text-white">
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
                );
            });
    }, [hoveredState, activeArea]);

    const Markers = useMemo(() => {
        return mapResults
            .filter((race) => {
                return pointInView(race.latitude, race.longitude);
            })
            .slice(0, 100)
            .map((race) => (
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
                            <div className="text-4xl dark:text-dustyRose-200 text-dustyRose-700">
                                <FaLocationDot />
                            </div>
                        ) : (
                            /*                             <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                                className="h-16"
                                alt="Point"
                            /> */
                            <div className="text-xl text-gray-600 dark:text-white">
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
            ));
    }, [mapResults, searchResults, allResults, activeArea]);

    const handleMouse = useCallback((evt: MapLayerMouseEvent) => {
        if (mapRef.current && evt.features && evt.features.length > 0) {
            evt.features.forEach((feat) => {
                const state = slugify(feat["properties"]["state"]);
                if (
                    !(state === "usa" || state === "canada") &&
                    state !== hoveredState
                ) {
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
                        !(state === "usa" || state === "canada")
                        // && state !== hoveredState
                    ) {
                        if (!oneHover) {
                            clickLink("/location/" + slugify(state));
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
                "fill-color": theme === "dark" ? "#b35e75" : "#ee728d", // dustyRose-600/400
                "fill-opacity": oneHover ? 0.0 : 0.5,
            },
            filter: ["==", "state", hoveredState], // Highlight only the hovered state
        }),
        [hoveredState, oneHover, theme],
    );

    const highlightBorder: LineLayer = useMemo(
        () => ({
            id: "highlight-border",
            type: "line",
            source: "line-layer",
            paint: {
                "line-color": theme === "dark" ? "#ee728d" : "#b35e75", // dustyRose-400/600
                "line-width": oneHover ? 0 : 2,
            },
            filter: ["==", "state", hoveredState],
        }),
        [hoveredState, oneHover, theme],
    );

    const activeLayer: FillLayer = useMemo(
        () => ({
            id: "active-layer",
            type: "fill",
            source: "base-layer",
            paint: {
                "fill-color": theme === "dark" ? "#8b4759" : "#f296a9", // dustyRose-700/300
                "fill-opacity": 0.0,
            },
            filter: [
                "==",
                "state",
                activeArea ? slugify(activeArea.state) : "sdffsdfd",
            ], // Highlight only the hovered state
        }),
        [activeArea, theme],
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

    /*     const Sources1 = useMemo(() => {
        return (
            <Source
                id="state-boundaries-highlight"
                type="geojson"
                data={geoJsonData}
            >
                <Layer {...highlightLayer} />
                <Layer {...highlightBorder} />
            </Source>
        );
    }, [highlightLayer, highlightBorder]);

    const Sources2 = useMemo(() => {
        return (
            <Source id="state-boundaries" type="geojson" data={geoJsonData}>
                <Layer {...baseLayer} />
                <Layer {...baseBorder} />
                <Layer {...activeLayer} />
                <Layer {...activeBorder} />
            </Source>
        );
    }, [baseLayer, baseBorder, activeLayer, activeBorder]); */

    const version: 8 = 8;
    const mapStyle: StyleSpecification = useMemo(
        () => ({
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
            layers: layers("protomaps", theme, "en"),
        }),
        [theme, version],
    );

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
                                className="border px-3 py-2 text-base rounded-lg block w-full dark:bg-gray-700 bg-gray-300 dark:border-gray-600 border-gray-400 dark:placeholder-gray-400 placeholder-gray-600 dark:text-white text-black hover:border-dustyRose-500 focus:border-dustyRose-500 focus:ring-0 focus:outline-none dark:hover:border-dustyRose-500 dark:focus:border-dustyRose-500"
                                onChange={updateLocSearch}
                            />
                            {!stateMenuOpen && !locSearch && (
                                <div className="absolute top-0 py-2 px-3 text-base rounded-lg flex items-center dark:text-gray-400 text-gray-600 space-x-2 pointer-events-none">
                                    <div className="">
                                        <IoSearchOutline />
                                    </div>
                                    <div className="hidden md:block text-base">
                                        Type{" "}
                                        <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg dark:bg-gray-600 bg-gray-400 dark:text-gray-100 text-gray-900 dark:border-gray-500 border-gray-500">
                                            ?
                                        </kbd>{" "}
                                        to search by region
                                    </div>
                                    <div className="block md:hidden text-base">
                                        Search by region
                                    </div>
                                    <div>
                                        <svg
                                            className="w-2.5 h-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="absolute flex flex-col items-end space-y-2 top-16 right-0 px-3 pt-4">
                        {activeArea && (
                            <div
                                className="relative flex items-center place-content-end w-fit space-x-2 z-50 rounded-lg border dark:text-dustyRose-50 text-dustyRose-900 dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-700 bg-dustyRose-300 px-3 py-1 text-sm font-semibold hover:dark:bg-dustyRose-600 hover:bg-dustyRose-400 hover:dark:border-dustyRose-400 hover:border-dustyRose-600 hover:cursor-pointer"
                                onClick={() => {
                                    clickLink("/location/all");
                                }}
                                onMouseEnter={() => {
                                    updateStateHover("", false);
                                }}
                            >
                                <div>
                                    {"Remove boundary : " + activeArea.state}
                                </div>
                                <div className="text-lg">
                                    <TiDelete />
                                </div>
                            </div>
                        )}

                        {(searchResults.length === 0 ||
                            mapResults.length === 0) &&
                            !isDismissed && (
                                <div className="flex items-center place-content-end z-50 dark:bg-gray-700 bg-gray-300 p-2 rounded-xl">
                                    <div className="relative flex flex-wrap z-50 place-content-center w-min">
                                        <div className="relative flex items-center space-x-1 z-50 border dark:bg-gray-900 dark:border-gray-700 bg-gray-100 border-gray-200 px-2 py-0.5 rounded-full text-sm text-gray-700 dark:text-gray-200 ">
                                            <div className="text-lg">
                                                {" "}
                                                <IoMdInformationCircleOutline />{" "}
                                            </div>
                                            <div className="font-semibold whitespace-nowrap">
                                                {" "}
                                                No races within map boundary.{" "}
                                            </div>
                                        </div>
                                        <div className="relative flex items-center space-x-2 mt-2 mb-1">
                                            <div
                                                onClick={zoomOut}
                                                className="space-x-2 flex items-center rounded-lg px-2 py-0.5 dark:text-dustyRose-50 text-dustyRose-900 dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-700 bg-dustyRose-300 text-sm font-semibold hover:dark:bg-dustyRose-600 hover:bg-dustyRose-400 hover:dark:border-dustyRose-400 hover:border-dustyRose-600 hover:cursor-pointer"
                                            >
                                                <div>Zoom Out</div>
                                                <div>
                                                    <MdZoomOutMap />
                                                </div>
                                            </div>
                                            <div className="font-semibold">
                                                or
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setIsDismissed(true)
                                                }
                                                className="flex items-center space-x-1 text-lg hover:cursor-pointer dark:text-dustyRose-50 text-dustyRose-900 dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-700 bg-dustyRose-300 hover:dark:bg-dustyRose-600 hover:bg-dustyRose-400 hover:dark:border-dustyRose-400 hover:border-dustyRose-600 rounded-lg px-2 py-0.5"
                                            >
                                                <div className="text-sm font-semibold">
                                                    Dismiss
                                                </div>
                                                <div>
                                                    <TiDelete />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>

                    {stateMenuOpen && (
                        <div className="absolute z-50 rounded-lg dark:bg-gray-700 bg-gray-300 border dark:border-gray-600 border-gray-400 top-9 left-0 divide-y dark:divide-gray-600 divide-gray-400 shadow min-w-44">
                            <ul
                                className="py-2 text-sm dark:text-gray-200 text-gray-800 overflow-y-auto max-h-72"
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
                                                    className="flex items-center place-content-between px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 dark:bg-gray-700 hover:text-black dark:hover:text-white w-full hover:cursor-pointer"
                                                    key={
                                                        "li" +
                                                        state.state +
                                                        index
                                                    }
                                                >
                                                    <div
                                                        key={
                                                            "div_state" +
                                                            state.state +
                                                            index
                                                        }
                                                    >
                                                        {state.state}
                                                    </div>
                                                    <div
                                                        className="text-xs font-semibold dark:text-gray-400"
                                                        key={
                                                            "div_nraces" +
                                                            state.state +
                                                            index
                                                        }
                                                    >
                                                        {state.n_races +
                                                            " races"}
                                                    </div>
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
                                        className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border dark:border-blue-500 border-blue-500 dark:bg-blue-600 bg-blue-400 hover:dark:bg-blue-700 bg-blue-300 focus:dark:ring-blue-800 ring-blue-200"
                                    >
                                        Clear
                                    </button>
                                </a> */}
                                <button
                                    onClick={() => {
                                        closeStateMenu();
                                        updateLocSearch("");
                                    }}
                                    className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border dark:border-dustyRose-500 border-dustyRose-500 dark:bg-dustyRose-600 bg-dustyRose-400 hover:dark:bg-dustyRose-700 hover:bg-dustyRose-300 focus:dark:ring-dustyRose-800 ring-dustyRose-200"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="relative rounded-lg border mt-2 -mb-2.5 mx-3 px-3 text-xs font-medium dark:bg-gray-800 bg-gray-200 dark:border-gray-600 border-gray-400 dark:text-gray-400 text-gray-600 items-center flex whitespace-nowrap overflow-x-auto z-10">
                    Showing{" "}
                    <span className="dark:text-dustyRose-200 text-dustyRose-800 font-medium px-1">
                        {mapResults.length > searchResults.length
                            ? searchResults.length
                            : mapResults.length}
                    </span>{" "}
                    of{" "}
                    <span className="dark:text-periwinkleBlue-200 text-periwinkleBlue-800 font-medium px-1">
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
                    <div className="flex flex-col absolute top-16 right-8 z-50 dark:bg-gray-800 bg-gray-200 border dark:border-gray-600 border-gray-400 rounded-lg space-y-3 text-sm dark:text-gray-400 text-gray-600 p-3">
                        <span>
                            There are{" "}
                            <span className="dark:text-periwinkleBlue-200 text-periwinkleBlue-800 font-medium">
                                {searchResults.length}
                            </span>{" "}
                            races in the RunEmu database that{" "}
                            <span className="dark:text-periwinkleBlue-200 text-periwinkleBlue-800 font-medium">
                                match your search criteria
                            </span>
                            .
                        </span>
                        <span>
                            Of those,{" "}
                            <span className="dark:text-dustyRose-200 text-dustyRose-800 font-medium">
                                {mapResults.length}
                            </span>{" "}
                            are{" "}
                            <span className="dark:text-dustyRose-200 text-dustyRose-800 font-medium">
                                within
                            </span>{" "}
                            the{" "}
                            <span className="dark:text-dustyRose-200 text-dustyRose-800 font-medium">
                                map bounds and/or boundary
                            </span>
                            ; these races are shown in your feed .
                        </span>
                        <span>
                            <span className="dark:text-blue-200 text-blue-800 font-medium">
                                Map markers
                            </span>{" "}
                            are displayed for up to the next{" "}
                            <span className="dark:text-blue-200 text-blue-800 font-medium">
                                100
                            </span>{" "}
                            of these races. We limit the number of markers to
                            ensure a fast and responsive experience for all
                            users.
                        </span>
                        <span className="">
                            <span className="dark:font-gray-200 font-gray-800 font-medium pr-1">
                                Tips:
                            </span>
                            narrow your search results by
                            <ul className="list-disc px-6">
                                <li>
                                    selecting a region from the dropdown menu,
                                    by clicking or by typing{" "}
                                    <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg dark:bg-gray-600 bg-gray-400 dark:text-gray-100 text-gray-900 dark:border-gray-500 border-gray-500">
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
            <div className="dark:bg-gray-800 bg-gray-200 border dark:border-gray-700 border-gray-300 rounded-lg w-full py-4 px-2">
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
                    {HighlightMarkers}
                    {/*                     {Sources1}
                    {Sources2} */}
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
