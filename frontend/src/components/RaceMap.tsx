import React, { useEffect, useRef, useContext, useMemo, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { MapRef, Marker } from "react-map-gl/maplibre";

import { RaceContext } from "../context/RaceFeedContext";
import RaceType from "../types/race";

const RaceMap = () => {
    const {
        state: { searchResults, mapResults, mapCoords },
        updateSearchResults,
        updateHover,
        updateMapCoords,
    } = useContext(RaceContext);

    const compareByHover = (a: RaceType, b: RaceType) => {
        if (a.isHovered! > b.isHovered!) return 1;
        if (a.isHovered! < b.isHovered!) return -1;
        return 0;
    };

    const mapRef = useRef<MapRef>();
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
    const setView = () => {
        mapRef.current?.setCenter([mapCoords.latitude, mapCoords.longitude]);
        mapRef.current?.setZoom(mapCoords.zoom);
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
                    className={race.isHovered ? "z-50" : ""}
                >
                    {race.isHovered ? (
                        <img
                            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
                            className="z-50 h-12"
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
            <p className="absolute -top-6 rounded-lg border px-3 mb-2 text-sm bg-gray-800 border-gray-700 text-gray-400 items-center flex">
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
            <Map
                initialViewState={mapCoords}
                ref={mapRef}
                style={{ width: "100%", height: "84vh" }}
                mapStyle={`https://api.maptiler.com/maps/outdoor/style.json?key=${API_KEY}`}
                onZoomEnd={() => filterOnMap()}
                onMoveEnd={() => filterOnMap()}
                onLoad={() => {
                    filterOnMap();
                    setView();
                }}
            >
                {markers}
            </Map>
        </div>
    );
};

export default RaceMap;
