import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import RaceFeed from "./components/RaceFeed";
import OptionsBar from "./components/OptionsBar";
import RaceType from "./types/race";

import { DataProvider } from "./context/RaceFeedContext";

import api from "./api/races";

function App() {
    const [name, setName] = useState<string>("");
    const [distance, setDistance] = useState<number>(0);

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
            await api.post("/create/", raceData, {
                headers: {},
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <DataProvider>
            <Header />
            {/* <h1>Run Emu</h1>
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
      </div> */}
            <OptionsBar></OptionsBar>
            <RaceFeed />
        </DataProvider>
    );
}

export default App;
