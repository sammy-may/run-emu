import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Layout from "./pages/Layout";
import RaceType from "./types/race";
import Home from "./pages/Home";
import About from "./pages/About";

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
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>Missing</h1>
                            </div>
                        }
                    />
                </Route>
            </Routes>
        </DataProvider>
    );
}

export default App;
