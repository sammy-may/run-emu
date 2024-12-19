import { useContext, useEffect } from "react";
import { ActiveArea, RaceContext } from "../context/RaceFeedContext";

// create with e.g. `ls -althr node_modules/world-geojson/states/usa/*.json | awk '{print $NF}' | sed 's|.*/||; s|\.json$||' | paste -sd ',' -`

export const StatesInit: ActiveArea[] = [
    {
        city: "St. John's",
        state: "Newfoundland and Labrador",
        country: "Canada",
        latitude: 47.5615,
        longitude: -52.7126,
    },
    {
        city: "Halifax",
        state: "Nova Scotia",
        country: "Canada",
        latitude: 44.6488,
        longitude: -63.5752,
    },
    {
        city: "Charlottetown",
        state: "Prince Edward Island",
        country: "Canada",
        latitude: 46.2382,
        longitude: -63.1311,
    },
    {
        city: "Fredericton",
        state: "New Brunswick",
        country: "Canada",
        latitude: 45.9636,
        longitude: -66.6431,
    },
    {
        city: "Quebec City",
        state: "Quebec",
        country: "Canada",
        latitude: 46.8139,
        longitude: -71.2082,
    },
    {
        city: "Toronto",
        state: "Ontario",
        country: "Canada",
        latitude: 43.6511,
        longitude: -79.347,
    },
    {
        city: "Winnipeg",
        state: "Manitoba",
        country: "Canada",
        latitude: 49.8951,
        longitude: -97.1384,
    },
    {
        city: "Regina",
        state: "Saskatchewan",
        country: "Canada",
        latitude: 50.4452,
        longitude: -104.6189,
    },
    {
        city: "Edmonton",
        state: "Alberta",
        country: "Canada",
        latitude: 53.5461,
        longitude: -113.4938,
    },
    {
        city: "Victoria",
        state: "British Columbia",
        country: "Canada",
        latitude: 48.4284,
        longitude: -123.3656,
    },
    {
        city: "Whitehorse",
        state: "Yukon",
        country: "Canada",
        latitude: 60.7212,
        longitude: -135.0568,
    },
    {
        city: "Yellowknife",
        state: "Northwest Territories",
        country: "Canada",
        latitude: 62.454,
        longitude: -114.3718,
    },
    {
        city: "Iqaluit",
        state: "Nunavut",
        country: "Canada",
        latitude: 63.7467,
        longitude: -68.516,
    },
    {
        city: "Montgomery",
        state: "Alabama",
        country: "USA",
        latitude: 32.3668,
        longitude: -86.3,
    },
    {
        city: "Juneau",
        state: "Alaska",
        country: "USA",
        latitude: 58.3019,
        longitude: -134.4197,
    },
    {
        city: "Phoenix",
        state: "Arizona",
        country: "USA",
        latitude: 33.4484,
        longitude: -112.074,
    },
    {
        city: "Little Rock",
        state: "Arkansas",
        country: "USA",
        latitude: 34.7465,
        longitude: -92.2896,
    },
    {
        city: "Sacramento",
        state: "California",
        country: "USA",
        latitude: 38.5816,
        longitude: -121.4944,
    },
    {
        city: "Denver",
        state: "Colorado",
        country: "USA",
        latitude: 39.7392,
        longitude: -104.9903,
    },
    {
        city: "Hartford",
        state: "Connecticut",
        country: "USA",
        latitude: 41.7658,
        longitude: -72.6734,
    },
    {
        city: "Dover",
        state: "Delaware",
        country: "USA",
        latitude: 39.1582,
        longitude: -75.5244,
    },
    {
        city: "Tallahassee",
        state: "Florida",
        country: "USA",
        latitude: 30.4383,
        longitude: -84.2807,
    },
    {
        city: "Atlanta",
        state: "Georgia",
        country: "USA",
        latitude: 33.749,
        longitude: -84.388,
    },
    {
        city: "Honolulu",
        state: "Hawaii",
        country: "USA",
        latitude: 21.307,
        longitude: -157.8584,
    },
    {
        city: "Boise",
        state: "Idaho",
        country: "USA",
        latitude: 43.615,
        longitude: -116.2023,
    },
    {
        city: "Springfield",
        state: "Illinois",
        country: "USA",
        latitude: 39.7983,
        longitude: -89.6544,
    },
    {
        city: "Indianapolis",
        state: "Indiana",
        country: "USA",
        latitude: 39.7684,
        longitude: -86.1581,
    },
    {
        city: "Des Moines",
        state: "Iowa",
        country: "USA",
        latitude: 41.5868,
        longitude: -93.625,
    },
    {
        city: "Topeka",
        state: "Kansas",
        country: "USA",
        latitude: 39.0489,
        longitude: -95.678,
    },
    {
        city: "Frankfort",
        state: "Kentucky",
        country: "USA",
        latitude: 38.2009,
        longitude: -84.8733,
    },
    {
        city: "Baton Rouge",
        state: "Louisiana",
        country: "USA",
        latitude: 30.4515,
        longitude: -91.1871,
    },
    {
        city: "Augusta",
        state: "Maine",
        country: "USA",
        latitude: 44.3106,
        longitude: -69.7795,
    },
    {
        city: "Annapolis",
        state: "Maryland",
        country: "USA",
        latitude: 38.9784,
        longitude: -76.4922,
    },
    {
        city: "Boston",
        state: "Massachusetts",
        country: "USA",
        latitude: 42.3601,
        longitude: -71.0589,
    },
    {
        city: "Lansing",
        state: "Michigan",
        country: "USA",
        latitude: 42.7325,
        longitude: -84.5555,
    },
    {
        city: "Saint Paul",
        state: "Minnesota",
        country: "USA",
        latitude: 44.9537,
        longitude: -93.09,
    },
    {
        city: "Jackson",
        state: "Mississippi",
        country: "USA",
        latitude: 32.2988,
        longitude: -90.1848,
    },
    {
        city: "Jefferson City",
        state: "Missouri",
        country: "USA",
        latitude: 38.5767,
        longitude: -92.1735,
    },
    {
        city: "Helena",
        state: "Montana",
        country: "USA",
        latitude: 46.5891,
        longitude: -112.0391,
    },
    {
        city: "Lincoln",
        state: "Nebraska",
        country: "USA",
        latitude: 40.8136,
        longitude: -96.7026,
    },
    {
        city: "Carson City",
        state: "Nevada",
        country: "USA",
        latitude: 39.1638,
        longitude: -119.7674,
    },
    {
        city: "Concord",
        state: "New Hampshire",
        country: "USA",
        latitude: 43.2081,
        longitude: -71.5376,
    },
    {
        city: "Trenton",
        state: "New Jersey",
        country: "USA",
        latitude: 40.2171,
        longitude: -74.7429,
    },
    {
        city: "Santa Fe",
        state: "New Mexico",
        country: "USA",
        latitude: 35.687,
        longitude: -105.9378,
    },
    {
        city: "Albany",
        state: "New York",
        country: "USA",
        latitude: 42.6526,
        longitude: -73.7562,
    },
    {
        city: "Raleigh",
        state: "North Carolina",
        country: "USA",
        latitude: 35.7796,
        longitude: -78.6382,
    },
    {
        city: "Bismarck",
        state: "North Dakota",
        country: "USA",
        latitude: 46.8083,
        longitude: -100.7837,
    },
    {
        city: "Columbus",
        state: "Ohio",
        country: "USA",
        latitude: 39.9612,
        longitude: -82.9988,
    },
    {
        city: "Oklahoma City",
        state: "Oklahoma",
        country: "USA",
        latitude: 35.4676,
        longitude: -97.5164,
    },
    {
        city: "Salem",
        state: "Oregon",
        country: "USA",
        latitude: 44.9429,
        longitude: -123.0351,
    },
    {
        city: "Harrisburg",
        state: "Pennsylvania",
        country: "USA",
        latitude: 40.2732,
        longitude: -76.8867,
    },
    {
        city: "Providence",
        state: "Rhode Island",
        country: "USA",
        latitude: 41.824,
        longitude: -71.4128,
    },
    {
        city: "Columbia",
        state: "South Carolina",
        country: "USA",
        latitude: 34.0007,
        longitude: -81.0348,
    },
    {
        city: "Pierre",
        state: "South Dakota",
        country: "USA",
        latitude: 44.3683,
        longitude: -100.351,
    },
    {
        city: "Nashville",
        state: "Tennessee",
        country: "USA",
        latitude: 36.1627,
        longitude: -86.7816,
    },
    {
        city: "Austin",
        state: "Texas",
        country: "USA",
        latitude: 30.2672,
        longitude: -97.7431,
    },
    {
        city: "Salt Lake City",
        state: "Utah",
        country: "USA",
        latitude: 40.7608,
        longitude: -111.891,
    },
    {
        city: "Montpelier",
        state: "Vermont",
        country: "USA",
        latitude: 44.2601,
        longitude: -72.5754,
    },
    {
        city: "Richmond",
        state: "Virginia",
        country: "USA",
        latitude: 37.5407,
        longitude: -77.436,
    },
    {
        city: "Olympia",
        state: "Washington",
        country: "USA",
        latitude: 47.0379,
        longitude: -122.9007,
    },
    {
        city: "Charleston",
        state: "West Virginia",
        country: "USA",
        latitude: 38.3498,
        longitude: -81.6326,
    },
    {
        city: "Madison",
        state: "Wisconsin",
        country: "USA",
        latitude: 43.0731,
        longitude: -89.4012,
    },
    {
        city: "Cheyenne",
        state: "Wyoming",
        country: "USA",
        latitude: 41.14,
        longitude: -104.8202,
    },
].sort((a, b) => a.state.localeCompare(b.state));

const loadGeoJson = async (state: string) => {
    if (state === "hawaii") {
        return {};
    }
    const url = `https://hzbtbujyhfuhbtramttg.supabase.co/storage/v1/object/public/boundaries/${state}.json`;
    const resp = await fetch(url);
    const res = await resp.json();
    return res;
};

export const States = () => {
    const { updateStates } = useContext(RaceContext);

    const updated_states: ActiveArea[] = StatesInit.map((state) => ({
        ...state,
        boundary: loadGeoJson(state.state.toLowerCase().replace(/\s+/g, "_")),
        isHovered: false,
    }));

    useEffect(() => {
        updateStates(updated_states);
    }, []);

    return updated_states;
};

export default States;
