import { useRef, useContext, useMemo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { MapRef, Marker } from "react-map-gl/dist/es5/exports-maplibre.js";

import { RaceContext } from "../context/RaceFeedContext";
import { FaLocationDot } from "react-icons/fa6";

const RaceMap = () => {
    const {
        state: { searchResults, mapResults, mapCoords },
        updateSearchResults,
        updateHover,
        updateMapCoords,
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

        const lat = mapRef.current?.getCenter().lat ?? 40;
        const lon = mapRef.current?.getCenter().lng ?? -118;
        const zoom = mapRef.current?.getZoom() ?? 6;
        updateMapCoords({
            latitude: lat,
            longitude: lon,
            zoom: zoom,
        });
    };

    const markers = useMemo(
        () =>
            searchResults.map((race) => (
                <Marker
                    key={"marker" + race.name}
                    longitude={race.longitude}
                    latitude={race.latitude}
                    onClick={() => {
                        updateHover(race.id!, !race.isHovered, true);
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
            )),
        [searchResults]
    );

    return (
        <div className="flex items-center relative pt-2">
            <div className="absolute -top-8 flex items-center place-content-between w-full">
                <div className="flex items-center mb-2">
                    <form onSubmit={(evt) => evt.preventDefault()}>
                        <label htmlFor="location" className=""></label>
                        <input
                            type="text"
                            placeholder={"Try 'Oregon'"}
                            className="rounded-lg border px-8 py-1 text-sm  bg-gray-700 border-gray-600 text-gray-200 items-center flex w-full"
                            id="location"
                        ></input>
                    </form>
                    <div className="text-gray-200 px-3 text-sm absolute -left-1">
                        <FaLocationDot />
                    </div>
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
            >
                {markers}
            </Map>
        </div>
    );
};

export default RaceMap;
