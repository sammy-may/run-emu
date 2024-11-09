import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";

function App() {
    const [count, setCount] = useState(0);
    const [races, setRaces] = useState<any[]>([]);

    const fetchRaces = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/");
            const data = await response.json();
            setRaces(data);
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
                <input type="text" placeholder="Race title..." />
                <input type="number" placeholder="Race distance..." />
                <button> Add Race </button>
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
