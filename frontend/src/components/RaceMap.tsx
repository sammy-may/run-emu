import { useRef, useContext, useMemo, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
    Layer,
    MapLayerMouseEvent,
    MapRef,
    Marker,
    Source,
} from "react-map-gl/dist/es5/exports-maplibre.js";

import { ActiveArea, RaceContext } from "../context/RaceFeedContext";
import { FaLocationDot } from "react-icons/fa6";
import { StatesInit } from "../constants/States";
import { TiDelete } from "react-icons/ti";

const RaceMap = () => {
    const {
        state: {
            searchResults,
            mapResults,
            mapCoords,
            stateMenuOpen,
            activeArea,
            states,
        },
        updateSearchResults,
        updateHover,
        updateStates,
        updateStateHover,
        updateMapCoords,
        toggleStateMenu,
        closeStateMenu,
    } = useContext(RaceContext);

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
        if (state === "hawaii") {
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
                        state.state.toLowerCase().replace(/\s+/g, "_")
                    ),
                    isHovered: false,
                }))
            );
            updateStates([...updated_states]);
        };
        fetchStates();
    }, []);

    const Markers = useMemo(
        () =>
            searchResults.map((race) => (
                <div
                    onMouseEnter={() => updateHover(race.id!, true, false)}
                    onMouseLeave={() => updateHover(race.id!, false, false)}
                    key={"marker_div" + race.name}
                >
                    <Marker
                        key={"marker" + race.name}
                        longitude={race.longitude}
                        latitude={race.latitude}
                        onClick={() => {
                            updateHover(race.id!, true, true);
                        }}
                        style={{ zIndex: race.isHovered ? 50 : "unset" }}
                    >
                        {race.isHovered ? (
                            <img
                                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
                                className="h-10"
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
        [searchResults]
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
            clickLink("/location/" + state);
        }
    };

    const Boundaries = useMemo(
        () =>
            states.map((state) => {
                const active =
                    state.state.toLowerCase() ===
                        activeArea?.state.toLowerCase() || state.isHovered;
                if (!state.boundary || !state.boundary["features"]) {
                    return;
                } else if (!active) {
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
        [states, activeArea]
    );

    return (
        <div className="flex flex-col items-center relative">
            <div className="flex items-end place-content-between w-full">
                <div className="flex items-center">
                    <button
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
                                    {/*                                     <a
                                        href="/location/all"
                                        className="hover:cursor-pointer"
                                    >
                                        <MdOutlineCancel />
                                    </a> */}
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
                    </button>

                    {activeArea && (
                        <div
                            className="absolute flex items-center space-x-2 z-50 rounded-lg border top-14 right-6 text-blue-100 border-blue-400 bg-blue-600 px-3 py-1 text-sm font-semibold hover:bg-blue-700 hover:border-blue-500 hover:cursor-pointer"
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
                        <div className="absolute z-50 rounded-lg bg-gray-700 border border-gray-600 top-8 left-0 divide-y divide-gray-600 shadow min-w-44">
                            <ul
                                className="py-2 text-sm text-gray-200 overflow-y-auto max-h-72"
                                aria-labelledby="sortInfo"
                            >
                                {states.map((state, index) => {
                                    if (
                                        state.country === "USA" ||
                                        state.country === "Canada"
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
                                <a href="/location/all">
                                    <button
                                        //onClick={() => updateActiveArea(null)}
                                        className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    >
                                        Clear
                                    </button>
                                </a>
                                <button
                                    onClick={closeStateMenu}
                                    className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="rounded-lg border py-0.5 px-3 text-sm bg-gray-800 border-gray-700 text-gray-400 items-center flex">
                    Showing{" "}
                    <span className="text-indigo-200 font-medium px-1">
                        {mapResults.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-indigo-200 font-medium px-1">
                        {searchResults.length}
                    </span>
                    races matching your criteria.
                </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg w-full p-3">
                <Map
                    initialViewState={mapCoords}
                    ref={mapRef}
                    maxZoom={7}
                    style={{ width: "100%", height: "84vh" }}
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
