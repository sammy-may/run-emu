import { useRef, useContext, useMemo, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { MapRef, Marker } from "react-map-gl/dist/es5/exports-maplibre.js";

import { RaceContext, ActiveArea, States } from "../context/RaceFeedContext";
import { FaLocationDot } from "react-icons/fa6";

const RaceMap = () => {
    const {
        state: {
            searchResults,
            mapResults,
            mapCoords,
            stateMenuOpen,
            activeArea,
        },
        updateSearchResults,
        updateHover,
        updateMapCoords,
        toggleStateMenu,
        closeStateMenu,
        updateActiveArea,
        updateNeedLoad,
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

    const markers = useMemo(
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

    return (
        <div className="flex items-center relative pt-2">
            <div className="absolute -top-7 flex items-center place-content-between w-full">
                <div className="flex items-center mb-2">
                    <button
                        id="sortInfo"
                        data-dropdown-toggle="dropdownInformation"
                        type="button"
                        onClick={toggleStateMenu}
                        className="flex whitespace-nowrap space-x-2 text-white font-medium rounded-lg text-sm py-1 px-3 text-center items-center border border-blue-500 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                        <div>
                            <FaLocationDot />
                        </div>
                        <div>
                            {!activeArea && "State"}
                            {activeArea && "State : " + activeArea.state}
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

                    {stateMenuOpen && (
                        <div className="absolute z-50 rounded-lg bg-gray-700 border border-gray-600 top-8 left-0 divide-y divide-gray-600 shadow min-w-44">
                            <ul
                                className="py-2 text-sm text-gray-200 overflow-y-auto max-h-72"
                                aria-labelledby="sortInfo"
                            >
                                {States.map((state, index) => {
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
                                        className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    >
                                        Clear
                                    </button>
                                </a>
                                <button
                                    onClick={closeStateMenu}
                                    className="flex whitespace-nowrap space-x-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="rounded-lg border px-3 mb-2 text-sm bg-gray-800 border-gray-700 text-gray-400 items-center flex">
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
            <Map
                initialViewState={mapCoords}
                ref={mapRef}
                style={{ width: "100%", height: "84vh" }}
                mapStyle={`https://api.maptiler.com/maps/outdoor/style.json?key=${API_KEY}`}
                onZoomEnd={() => filterOnMap()}
                onMoveEnd={() => filterOnMap()}
                onIdle={() => filterOnMap()}
                onLoad={() => {
                    fly();
                    filterOnMap();
                }}
            >
                {markers}
            </Map>
        </div>
    );
};

export default RaceMap;
