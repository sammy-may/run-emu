import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";

import RaceType from "../types/race";
import { RaceContext } from "../context/RaceFeedContext";
import { useContext } from "react";
import { LatLng, Icon } from "leaflet";
import RaceCard from "./RaceCard";

const greenIcon = new Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [50, 82],
    iconAnchor: [25, 82],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const blueIcon = new Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const RaceMap = () => {
    const {
        state: { searchResults, mapResults, nSearch, nMap },
        updateSearchResults,
    } = useContext(RaceContext);

    const RaceEntries = ({ races }: { races: RaceType[] }) => {
        return races.map((race, index) => (
            <Marker
                key={index}
                position={[race.latitude, race.longitude]}
                icon={race.isHovered ? greenIcon : blueIcon}
            >
                <Popup
                    autoPan={true}
                    className="bg-gray-100 border-gray-700 rounded-lg border"
                >
                    <RaceCard index={-1} race={race} />
                </Popup>
            </Marker>
        ));
    };

    const MapContext = ({ races }: { races: RaceType[] }) => {
        const map = useMapEvents({
            zoomend: () => {
                filterOnMap();
            },
            moveend: () => {
                filterOnMap();
            },
        });

        const filterOnMap = () => {
            races = [...races];
            races.forEach((race) => {
                race.onMap = map
                    .getBounds()
                    .contains(new LatLng(race.latitude, race.longitude));
            });
            updateSearchResults(races);
            /* const filteredRaces = races.filter((race) =>
                map
                    .getBounds()
                    .contains(new LatLng(race.latitude, race.longitude))
            );
            updateMapResults(filteredRaces); */
        };

        return null;
    };

    return (
        <div className="flex items-center relative mt-2">
            <p className="absolute -top-8 rounded-lg border px-3 mb-2 text-sm bg-gray-800 border-gray-700 text-gray-400 items-center flex">
                Showing{" "}
                <span className="text-indigo-200 font-medium px-1">{nMap}</span>{" "}
                of{" "}
                <span className="text-indigo-200 font-medium px-1">
                    {nSearch}
                </span>
                races matching your criteria.
            </p>
            <MapContainer center={[41.25, -96.0]} zoom={3}>
                <MapContext races={searchResults} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RaceEntries races={mapResults} />
            </MapContainer>
        </div>
    );
};

export default RaceMap;
