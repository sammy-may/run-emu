import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import RaceFeed from "./components/RaceFeed";
import OptionsBar from "./components/OptionsBar";
import RaceType from "./types/race";

import api from "./api/races";

function App() {
    const [races, setRaces] = useState<RaceType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<RaceType[]>([]);

    const [name, setName] = useState<string>("");
    const [distance, setDistance] = useState<number>(0);

    const [distanceMin, setDistanceMin] = useState<number>(0);
    const [distanceMax, setDistanceMax] = useState<number>(1000);

    const fetchRaces = async () => {
        try {
            const response = await api.get("");
            setRaces(response.data);
            setSearchResults(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addRace = async () => {
        const raceData: RaceType = {
            name: name,
            distance: distance,
            location: "none",
            latitude: 20.0,
            longitude: 20.0,
            date: new Date(),
        };

        try {
            const response = await api.post("/create/", raceData, {
                headers: {},
            });
        } catch (err) {
            console.log(err);
        }
    };

    const filterRaces = () => {
        const filteredRaces = races.filter(
            (race) =>
                race.name.toLowerCase().includes(search.toLowerCase()) &&
                race.distance >= distanceMin &&
                race.distance <= distanceMax
        );
        setSearchResults(filteredRaces);
    };

    // Load race data
    useEffect(() => {
        console.log("fetching");
        fetchRaces();
    }, []);

    // Update search results whenever race data or search data changes
    useEffect(() => {
        console.log("filtering");
        filterRaces();
    }, [races, search, distanceMin, distanceMax]);

    return (
        <>
            <Header />
            <h1>Run Emu</h1>
            <div>
                <input
                    type="text"
                    placeholder="Race title..."
                    onChange={(evt) => {
                        setName(evt.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Race distance..."
                    onChange={(evt) => {
                        setDistance(Number(evt.target.value));
                    }}
                />
                <button onClick={() => addRace()}> Add Race </button>
            </div>
            <OptionsBar
                search={search}
                setSearch={setSearch}
                distanceMin={distanceMin}
                setDistanceMin={setDistanceMin}
                distanceMax={distanceMax}
                setDistanceMax={setDistanceMax}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
            ></OptionsBar>
            <RaceFeed races={searchResults} />
        </>
    );
}

export default App;
