import { createContext, useEffect, useState, useContext } from "react";
import RaceType from "../types/race";
import api from "../api/races";

interface DataContextType {
    races: RaceType[];
    setRaces: React.Dispatch<React.SetStateAction<RaceType[]>>;
    searchResults: RaceType[];
    setSearchResults: React.Dispatch<React.SetStateAction<RaceType[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    distanceMin: number;
    setDistanceMin: React.Dispatch<React.SetStateAction<number>>;
    distanceMax: number;
    setDistanceMax: React.Dispatch<React.SetStateAction<number>>;
}

const DataContext = createContext<DataContextType>({
    races: [],
    setRaces: () => {},
    searchResults: [],
    setSearchResults: () => {},
    search: "",
    setSearch: () => {},
    distanceMin: 0,
    setDistanceMin: () => {},
    distanceMax: 1000,
    setDistanceMax: () => {},
});

export const useDataContext = () => useContext(DataContext);

interface DataProviderProps {
    children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({
    children,
}: {
    children: any;
}) => {
    const [races, setRaces] = useState<RaceType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<RaceType[]>([]);

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
        fetchRaces();
    }, []);

    // Update search results whenever race data or search data changes
    useEffect(() => {
        filterRaces();
    }, [races, search, distanceMin, distanceMax]);

    return (
        <DataContext.Provider
            value={{
                races,
                setRaces,
                searchResults,
                setSearchResults,
                search,
                setSearch,
                distanceMin,
                setDistanceMin,
                distanceMax,
                setDistanceMax,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
