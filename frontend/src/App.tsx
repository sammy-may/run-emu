import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";

import api from "./api/races";

function App() {
    const [count, setCount] = useState(0);
    const [races, setRaces] = useState<any[]>([]);

    const [name, setName] = useState("");
    const [distance, setDistance] = useState(0);

    const fetchRaces = async () => {
        try {
            const response = await api.get("");
            setRaces(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addRace = async () => {
        const raceData = {
            name: name,
            distance: distance,
        };

        console.log("Race data");
        console.log(raceData);
        try {
            const response = await api.post("/create/", raceData, {
                headers: {},
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRaces();
    }, []);

    return (
        <>
            <Header />
            <h1>Run Emu</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>

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
            {races.map((race) => (
                <div>
                    <p> Name: {race.name} </p>
                    <p> Distance: {race.distance} </p>
                </div>
            ))}
        </>
    );
}

export default App;
