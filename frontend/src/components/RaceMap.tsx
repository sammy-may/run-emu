import { useRef, useContext, useMemo, useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
    Layer,
    MapLayerMouseEvent,
    MapRef,
    Marker,
    Source,
} from "react-map-gl/dist/es5/exports-maplibre.js";

import { ActiveArea, RaceContext } from "../context/RaceFeedContext";
import { StatesInit } from "../constants/States";
import { TiDelete } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

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

    const [windowWidth, setWindowWidth] = useState(1024);

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
    const API_KEY = "ehYwgcSh6qkJzmk9kbxG";

    const pointInView = (lat: number, lon: number) => {
        return mapRef.current?.getBounds().contains([lon, lat]);
    };

    const filterOnMap = () => {
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
    };

    const fly = () => {
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
    };

    useEffect(() => {
        fly();
    }, [activeArea]);

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
                            <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
                                className="h-16"
                                alt="Point"
                            />
                        ) : (
                            <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
                                className="h-8"
                                alt="Point"
                            />
                        )}
                    </Marker>
                </div>
            )),
        [mapResults],
    );

    const layer_ids = StatesInit.map((state) => {
        return "fill" + state.state;
    });

    const handleMouse = (evt: MapLayerMouseEvent) => {
        if (mapRef.current && evt.features && evt.features.length > 0) {
            const state = evt.features[0]["source"].replace(/^src/, "");
            updateStateHover(state, true);
        }
    };

    const clickLink = (url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_self";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    };

    const handleClick = (evt: MapLayerMouseEvent) => {
        if (mapRef.current && evt.features && evt.features.length > 0) {
            const state = evt.features[0]["source"].replace(/^src/, "");
            if (!oneHover) {
                clickLink("/location/" + state);
            }
        }
    };

    const Boundaries = useMemo(
        () =>
            states.map((state) => {
                if (!state.boundary || !state.boundary["features"]) {
                    return;
                } else if (
                    !(
                        state.state.toLowerCase() ===
                        activeArea?.state.toLowerCase()
                    ) &&
                    !state.isHovered
                ) {
                    return (
                        <Source
                            key={"src" + state.state}
                            id={"src" + state.state}
                            type="geojson"
                            data={state.boundary!["features"][0]}
                        >
                            <Layer
                                key={"fill" + state.state}
                                id={"fill" + state.state}
                                type="fill"
                                paint={{
                                    "fill-color": "blue",
                                    "fill-opacity": 0.0,
                                }}
                            />
                            <Layer
                                key={"outline" + state.state}
                                id={"outline" + state.state}
                                type="line"
                                paint={{
                                    "line-color": "blue",
                                    "line-width": 0,
                                }}
                            />
                        </Source>
                    );
                } else {
                    return (
                        <Source
                            key={"src" + state.state}
                            id={"src" + state.state}
                            type="geojson"
                            data={state.boundary!["features"][0]}
                        >
                            <Layer
                                key={"fill" + state.state}
                                id={"fill" + state.state}
                                type="fill"
                                paint={{
                                    "fill-color": "blue",
                                    "fill-opacity": 0.1,
                                }}
                            />
                            <Layer
                                key={"outline" + state.state}
                                id={"outline" + state.state}
                                type="line"
                                paint={{
                                    "line-color": "blue",
                                    "line-width": 2,
                                }}
                            />
                        </Source>
                    );
                }
            }),
        [states, activeArea],
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
                    {/*                     <button
                        id="sortInfo"
                        data-dropdown-toggle="dropdownInformation"
                        type="button"
                        onClick={toggleStateMenu}
                        className="flex whitespace-nowrap space-x-2 text-white font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-400 bg-blue-600 hover:bg-blue-700 hover:border-blue-500 focus:ring-blue-800"
                    >
                        <div>
                            <FaLocationDot />
                        </div>
                        <div>
                            {!activeArea && "Region"}
                            {activeArea && (
                                <div className="flex items-center space-x-1">
                                    <p>{"Region : " + activeArea.state}</p>
                                </div>
                            )}
                        </div>
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
                    </button> */}

                    {activeArea && (
                        <div
                            className="absolute flex items-center space-x-2 z-50 rounded-lg border top-16 right-0 text-blue-100 border-blue-400 bg-blue-600 px-3 py-1 text-sm font-semibold hover:bg-blue-700 hover:border-blue-500 hover:cursor-pointer m-6"
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
                                                href={`/location/${state.state}`}
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
                    <span className="text-green-200 font-medium px-1">
                        {mapResults.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-indigo-200 font-medium px-1">
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
                            <span className="text-indigo-200 font-medium">
                                {searchResults.length}
                            </span>{" "}
                            races in the RunEmu database that{" "}
                            <span className="text-indigo-200 font-medium">
                                match your search criteria
                            </span>
                            .
                        </span>
                        <span>
                            Of those,{" "}
                            <span className="text-green-200 font-medium">
                                {mapResults.length}
                            </span>{" "}
                            are{" "}
                            <span className="text-green-200 font-medium">
                                within
                            </span>{" "}
                            the{" "}
                            <span className="text-green-200 font-medium">
                                map bounds
                            </span>{" "}
                            and/or highlighted{" "}
                            <span className="text-green-200 font-medium">
                                map boundary
                            </span>
                            ; these{" "}
                            <span className="text-green-200 font-medium">
                                races are shown in your feed
                            </span>
                            .
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
                    maxZoom={7}
                    style={{ width: "100%", height: mapHeight }}
                    mapStyle={`https://api.maptiler.com/maps/outdoor/style.json?key=${API_KEY}`}
                    onZoomEnd={() => filterOnMap()}
                    onMoveEnd={() => filterOnMap()}
                    onIdle={() => filterOnMap()}
                    onMouseMove={handleMouse}
                    onMouseOut={() => {
                        updateStateHover("", false);
                    }}
                    onClick={handleClick}
                    interactiveLayerIds={layer_ids}
                    onLoad={() => {
                        fly();
                        filterOnMap();
                    }}
                >
                    {Markers}
                    {Boundaries}
                </Map>
            </div>
        </div>
    );
};

export default RaceMap;
