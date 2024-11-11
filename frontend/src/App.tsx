import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import RaceFeed from "./components/RaceFeed";
import RaceType from "./types/race";

import api from "./api/races";

function App() {
    const [races, setRaces] = useState<RaceType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<RaceType[]>([]);

    const [name, setName] = useState<string>("");
    const [distance, setDistance] = useState<number>(0);

    const fetchRaces = async () => {
        try {
            const response = await api.get("");
            setRaces(response.data);
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
        const filteredRaces = races.filter((race) =>
            race.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredRaces.reverse());
    };

    // Load race data on page load
    useEffect(() => {
        fetchRaces();
    }, []);

    // Update search results whenever race data or search data changes
    useEffect(() => {
        filterRaces();
    }, [races, search]);

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
            <RaceFeed
                races={searchResults}
                search={search}
                setSearch={setSearch}
            />
        </>
    );
}

export default App;
