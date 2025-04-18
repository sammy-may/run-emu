import { ActiveArea } from "../context/RaceFeedContext";

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
    {
        country: "",
        city: "Kabul",
        state: "Afghanistan",
        latitude: 34.5553,
        longitude: 69.2075,
    },
    {
        country: "",
        city: "Tirana",
        state: "Albania",
        latitude: 41.3275,
        longitude: 19.8189,
    },
    {
        country: "",
        city: "Algiers",
        state: "Algeria",
        latitude: 36.7538,
        longitude: 3.0588,
    },
    {
        country: "",
        city: "Andorra la Vella",
        state: "Andorra",
        latitude: 42.5078,
        longitude: 1.5211,
    },
    {
        country: "",
        city: "Luanda",
        state: "Angola",
        latitude: -8.839,
        longitude: 13.2894,
    },
    {
        country: "",
        city: "Saint John's",
        state: "Antigua and Barbuda",
        latitude: 17.1274,
        longitude: -61.8468,
    },
    {
        country: "",
        city: "Buenos Aires",
        state: "Argentina",
        latitude: -34.6037,
        longitude: -58.3816,
    },
    {
        country: "",
        city: "Yerevan",
        state: "Armenia",
        latitude: 40.1792,
        longitude: 44.4991,
    },
    {
        country: "",
        city: "Canberra",
        state: "Australia",
        latitude: -35.2809,
        longitude: 149.13,
    },
    {
        country: "",
        city: "Vienna",
        state: "Austria",
        latitude: 48.2082,
        longitude: 16.3738,
    },
    {
        country: "",
        city: "Baku",
        state: "Azerbaijan",
        latitude: 40.4093,
        longitude: 49.8671,
    },
    {
        country: "",
        city: "Nassau",
        state: "Bahamas",
        latitude: 25.0343,
        longitude: -77.3963,
    },
    {
        country: "",
        city: "Manama",
        state: "Bahrain",
        latitude: 26.2235,
        longitude: 50.5876,
    },
    {
        country: "",
        city: "Dhaka",
        state: "Bangladesh",
        latitude: 23.8103,
        longitude: 90.4125,
    },
    {
        country: "",
        city: "Bridgetown",
        state: "Barbados",
        latitude: 13.1,
        longitude: -59.6167,
    },
    {
        country: "",
        city: "Minsk",
        state: "Belarus",
        latitude: 53.9,
        longitude: 27.5667,
    },
    {
        country: "",
        city: "Brussels",
        state: "Belgium",
        latitude: 50.8503,
        longitude: 4.3517,
    },
    {
        country: "",
        city: "Belmopan",
        state: "Belize",
        latitude: 17.25,
        longitude: -88.7667,
    },
    {
        country: "",
        city: "Porto-Novo",
        state: "Benin",
        latitude: 6.4969,
        longitude: 2.6289,
    },
    {
        country: "",
        city: "Thimphu",
        state: "Bhutan",
        latitude: 27.4717,
        longitude: 89.6336,
    },
    {
        country: "",
        city: "Sucre",
        state: "Bolivia",
        latitude: -19.0333,
        longitude: -65.2625,
    },
    {
        country: "",
        city: "Sarajevo",
        state: "Bosnia and Herzegovina",
        latitude: 43.8486,
        longitude: 18.3564,
    },
    {
        country: "",
        city: "Gaborone",
        state: "Botswana",
        latitude: -24.6544,
        longitude: 25.908,
    },
    {
        country: "",
        city: "Brasília",
        state: "Brazil",
        latitude: -15.7801,
        longitude: -47.9292,
    },
    {
        country: "",
        city: "Bandar Seri Begawan",
        state: "Brunei",
        latitude: 4.9031,
        longitude: 114.9398,
    },
    {
        country: "",
        city: "Sofia",
        state: "Bulgaria",
        latitude: 42.6977,
        longitude: 23.3219,
    },
    {
        country: "",
        city: "Ouagadougou",
        state: "Burkina Faso",
        latitude: 12.6402,
        longitude: -1.5085,
    },
    {
        country: "",
        city: "Bujumbura",
        state: "Burundi",
        latitude: -3.3767,
        longitude: 29.3692,
    },
    {
        country: "",
        city: "Phnom Penh",
        state: "Cambodia",
        latitude: 11.5564,
        longitude: 104.9282,
    },
    {
        country: "",
        city: "Yaoundé",
        state: "Cameroon",
        latitude: 3.848,
        longitude: 11.5021,
    },
    {
        country: "",
        city: "Ottawa",
        state: "Canada",
        latitude: 45.4215,
        longitude: -75.6972,
    },
    {
        country: "",
        city: "Praia",
        state: "Cape Verde",
        latitude: 14.9333,
        longitude: -23.5133,
    },
    {
        country: "",
        city: "Bangui",
        state: "Central African Republic",
        latitude: 4.3947,
        longitude: 18.5582,
    },
    {
        country: "",
        city: "N'Djamena",
        state: "Chad",
        latitude: 12.1348,
        longitude: 15.0557,
    },
    {
        country: "",
        city: "Santiago",
        state: "Chile",
        latitude: -33.4489,
        longitude: -70.6693,
    },
    {
        country: "",
        city: "Beijing",
        state: "China",
        latitude: 39.9042,
        longitude: 116.4074,
    },
    {
        country: "",
        city: "Bogotá",
        state: "Colombia",
        latitude: 4.711,
        longitude: -74.0721,
    },
    {
        country: "",
        city: "Moroni",
        state: "Comoros",
        latitude: -11.701,
        longitude: 43.2551,
    },
    {
        country: "",
        city: "Brazzaville",
        state: "Congo",
        latitude: -4.2634,
        longitude: 15.2429,
    },
    {
        country: "",
        city: "Avarua",
        state: "Cook Islands",
        latitude: -21.207,
        longitude: -159.7756,
    },
    {
        country: "",
        city: "San José",
        state: "Costa Rica",
        latitude: 9.9281,
        longitude: -84.0907,
    },
    {
        country: "",
        city: "Zagreb",
        state: "Croatia",
        latitude: 45.8131,
        longitude: 15.978,
    },
    {
        country: "",
        city: "Havana",
        state: "Cuba",
        latitude: 23.1136,
        longitude: -82.3666,
    },
    {
        country: "",
        city: "Nicosia",
        state: "Cyprus",
        latitude: 35.1856,
        longitude: 33.3823,
    },
    {
        country: "",
        city: "Prague",
        state: "Czechia",
        latitude: 50.0755,
        longitude: 14.4378,
    },
    {
        country: "",
        city: "Kinshasa",
        state: "Democratic Republic of the Congo",
        latitude: -4.4419,
        longitude: 15.2663,
    },
    {
        country: "",
        city: "Copenhagen",
        state: "Denmark",
        latitude: 55.6761,
        longitude: 12.5683,
    },
    {
        country: "",
        city: "Djibouti",
        state: "Djibouti",
        latitude: 11.8251,
        longitude: 42.5903,
    },
    {
        country: "",
        city: "Roseau",
        state: "Dominica",
        latitude: 15.3015,
        longitude: -61.3881,
    },
    {
        country: "",
        city: "Santo Domingo",
        state: "Dominican Republic",
        latitude: 18.4861,
        longitude: -69.9312,
    },
    {
        country: "",
        city: "Dili",
        state: "East Timor",
        latitude: -8.5564,
        longitude: 125.5603,
    },
    {
        country: "",
        city: "Quito",
        state: "Ecuador",
        latitude: -0.1807,
        longitude: -78.4678,
    },
    {
        country: "",
        city: "Cairo",
        state: "Egypt",
        latitude: 30.0444,
        longitude: 31.2357,
    },
    {
        country: "",
        city: "San Salvador",
        state: "El Salvador",
        latitude: 13.6929,
        longitude: -89.2182,
    },
    {
        country: "",
        city: "Malabo",
        state: "Equatorial Guinea",
        latitude: 3.75,
        longitude: 8.7833,
    },
    {
        country: "",
        city: "Asmara",
        state: "Eritrea",
        latitude: 15.3232,
        longitude: 38.9333,
    },
    {
        country: "",
        city: "Tallinn",
        state: "Estonia",
        latitude: 59.437,
        longitude: 24.7535,
    },
    {
        country: "",
        city: "Mbabane",
        state: "Eswatini",
        latitude: -26.3054,
        longitude: 31.1367,
    },
    {
        country: "",
        city: "Addis Ababa",
        state: "Ethiopia",
        latitude: 9.03,
        longitude: 38.74,
    },
    {
        country: "",
        city: "Suva",
        state: "Fiji",
        latitude: -18.1416,
        longitude: 178.4419,
    },
    {
        country: "",
        city: "Helsinki",
        state: "Finland",
        latitude: 60.1692,
        longitude: 24.9402,
    },
    {
        country: "",
        city: "Paris",
        state: "France",
        latitude: 48.8566,
        longitude: 2.3522,
    },
    {
        country: "",
        city: "Libreville",
        state: "Gabon",
        latitude: 0.4167,
        longitude: 9.467,
    },
    {
        country: "",
        city: "Banjul",
        state: "Gambia",
        latitude: 13.4549,
        longitude: -16.5782,
    },
    {
        country: "",
        city: "Berlin",
        state: "Germany",
        latitude: 52.52,
        longitude: 13.405,
    },
    {
        country: "",
        city: "Accra",
        state: "Ghana",
        latitude: 5.6037,
        longitude: -0.187,
    },
    {
        country: "",
        city: "Athens",
        state: "Greece",
        latitude: 37.9838,
        longitude: 23.7275,
    },
    {
        country: "",
        city: "St. George's",
        state: "Grenada",
        latitude: 12.053,
        longitude: -61.7488,
    },
    {
        country: "",
        city: "Guatemala City",
        state: "Guatemala",
        latitude: 14.6349,
        longitude: -90.5069,
    },
    {
        country: "",
        city: "Bissau",
        state: "Guinea-Bissau",
        latitude: 11.8615,
        longitude: -15.582,
    },
    {
        country: "",
        city: "Conakry",
        state: "Guinea",
        latitude: 9.5091,
        longitude: -13.7124,
    },
    {
        country: "",
        city: "Georgetown",
        state: "Guyana",
        latitude: 6.801,
        longitude: -58.155,
    },
    {
        country: "",
        city: "Port-au-Prince",
        state: "Haiti",
        latitude: 18.5944,
        longitude: -72.3074,
    },
    {
        country: "",
        city: "Tegucigalpa",
        state: "Honduras",
        latitude: 13.9817,
        longitude: -82.6033,
    },
    {
        country: "",
        city: "Budapest",
        state: "Hungary",
        latitude: 47.4979,
        longitude: 19.0402,
    },
    {
        country: "",
        city: "Reykjavík",
        state: "Iceland",
        latitude: 64.1355,
        longitude: -21.8954,
    },
    {
        country: "",
        city: "New Delhi",
        state: "India",
        latitude: 28.6139,
        longitude: 77.209,
    },
    {
        country: "",
        city: "Jakarta",
        state: "Indonesia",
        latitude: -6.2088,
        longitude: 106.8456,
    },
    {
        country: "",
        city: "Tehran",
        state: "Iran",
        latitude: 35.6892,
        longitude: 51.389,
    },
    {
        country: "",
        city: "Baghdad",
        state: "Iraq",
        latitude: 33.3152,
        longitude: 44.3661,
    },
    {
        country: "",
        city: "Dublin",
        state: "Ireland",
        latitude: 53.3498,
        longitude: -6.2603,
    },
    {
        country: "",
        city: "Jerusalem",
        state: "Israel",
        latitude: 31.7683,
        longitude: 35.2137,
    },
    {
        country: "",
        city: "Rome",
        state: "Italy",
        latitude: 41.9028,
        longitude: 12.4964,
    },
    {
        country: "",
        city: "Yamoussoukro",
        state: "Ivory Coast",
        latitude: 6.8197,
        longitude: -5.2765,
    },
    {
        country: "",
        city: "Kingston",
        state: "Jamaica",
        latitude: 17.9714,
        longitude: -76.7936,
    },
    {
        country: "",
        city: "Tokyo",
        state: "Japan",
        latitude: 35.6762,
        longitude: 139.6503,
    },
    {
        country: "",
        city: "Amman",
        state: "Jordan",
        latitude: 31.9539,
        longitude: 35.9106,
    },
    {
        country: "",
        city: "Astana",
        state: "Kazakhstan",
        latitude: 51.1694,
        longitude: 71.4491,
    },
    {
        country: "",
        city: "Nairobi",
        state: "Kenya",
        latitude: -1.2867,
        longitude: 36.8172,
    },
    {
        country: "",
        city: "Tarawa",
        state: "Kiribati",
        latitude: 1.451,
        longitude: 172.9769,
    },
    {
        country: "",
        city: "Kuwait City",
        state: "Kuwait",
        latitude: 29.3759,
        longitude: 47.9774,
    },
    {
        country: "",
        city: "Bishkek",
        state: "Kyrgyzstan",
        latitude: 42.8746,
        longitude: 74.6126,
    },
    {
        country: "",
        city: "Vientiane",
        state: "Laos",
        latitude: 17.9757,
        longitude: 102.6331,
    },
    {
        country: "",
        city: "Riga",
        state: "Latvia",
        latitude: 56.946,
        longitude: 24.1059,
    },
    {
        country: "",
        city: "Beirut",
        state: "Lebanon",
        latitude: 33.8938,
        longitude: 35.5018,
    },
    {
        country: "",
        city: "Maseru",
        state: "Lesotho",
        latitude: -29.3093,
        longitude: 27.5146,
    },
    {
        country: "",
        city: "Monrovia",
        state: "Liberia",
        latitude: 6.4281,
        longitude: -9.4295,
    },
    {
        country: "",
        city: "Tripoli",
        state: "Libya",
        latitude: 32.8872,
        longitude: 13.1913,
    },
    {
        country: "",
        city: "Vaduz",
        state: "Liechtenstein",
        latitude: 47.1415,
        longitude: 9.5215,
    },
    {
        country: "",
        city: "Vilnius",
        state: "Lithuania",
        latitude: 54.6892,
        longitude: 25.2798,
    },
    {
        country: "",
        city: "Luxembourg City",
        state: "Luxembourg",
        latitude: 49.6117,
        longitude: 6.13,
    },
    {
        country: "",
        city: "Antananarivo",
        state: "Madagascar",
        latitude: -18.8792,
        longitude: 47.5079,
    },
    {
        country: "",
        city: "Lilongwe",
        state: "Malawi",
        latitude: -13.2543,
        longitude: 33.7837,
    },
    {
        country: "",
        city: "Kuala Lumpur",
        state: "Malaysia",
        latitude: 3.139,
        longitude: 101.6869,
    },
    {
        country: "",
        city: "Malé",
        state: "Maldives",
        latitude: 4.1755,
        longitude: 73.5093,
    },
    {
        country: "",
        city: "Bamako",
        state: "Mali",
        latitude: 12.6392,
        longitude: -8.0029,
    },
    {
        country: "",
        city: "Valletta",
        state: "Malta",
        latitude: 35.8997,
        longitude: 14.5147,
    },
    {
        country: "",
        city: "Majuro",
        state: "Marshall Islands",
        latitude: 7.0731,
        longitude: 171.3824,
    },
    {
        country: "",
        city: "Nouakchott",
        state: "Mauritania",
        latitude: 18.0771,
        longitude: -15.9743,
    },
    {
        country: "",
        city: "Port Louis",
        state: "Mauritius",
        latitude: -20.1603,
        longitude: 57.5022,
    },
    {
        country: "",
        city: "Mexico City",
        state: "Mexico",
        latitude: 19.4326,
        longitude: -99.1332,
    },
    {
        country: "",
        city: "Palikir",
        state: "Micronesia",
        latitude: 6.9404,
        longitude: 158.161,
    },
    {
        country: "",
        city: "Chisinau",
        state: "Moldova",
        latitude: 47.0105,
        longitude: 28.8638,
    },
    {
        country: "",
        city: "Monaco",
        state: "Monaco",
        latitude: 43.7333,
        longitude: 7.4167,
    },
    {
        country: "",
        city: "Ulaanbaatar",
        state: "Mongolia",
        latitude: 47.8864,
        longitude: 106.9057,
    },
    {
        country: "",
        city: "Podgorica",
        state: "Montenegro",
        latitude: 42.4411,
        longitude: 19.2636,
    },
    {
        country: "",
        city: "Rabat",
        state: "Morocco",
        latitude: 34.0209,
        longitude: -6.8417,
    },
    {
        country: "",
        city: "Maputo",
        state: "Mozambique",
        latitude: -25.9655,
        longitude: 32.589,
    },
    {
        country: "",
        city: "Naypyidaw",
        state: "Myanmar",
        latitude: 19.7633,
        longitude: 96.0785,
    },
    {
        country: "",
        city: "Windhoek",
        state: "Namibia",
        latitude: -22.5597,
        longitude: 17.0836,
    },
    {
        country: "",
        city: "Funafuti",
        state: "Nauru",
        latitude: -0.5477,
        longitude: 179.194,
    },
    {
        country: "",
        city: "Kathmandu",
        state: "Nepal",
        latitude: 27.7172,
        longitude: 85.324,
    },
    {
        country: "",
        city: "Amsterdam",
        state: "Netherlands",
        latitude: 52.3676,
        longitude: 4.9041,
    },
    {
        country: "",
        city: "Wellington",
        state: "New Zealand",
        latitude: -41.2867,
        longitude: 174.7759,
    },
    {
        country: "",
        city: "Managua",
        state: "Nicaragua",
        latitude: 12.1364,
        longitude: -86.251,
    },
    {
        country: "",
        city: "Niamey",
        state: "Niger",
        latitude: 13.5128,
        longitude: 2.1128,
    },
    {
        country: "",
        city: "Abuja",
        state: "Nigeria",
        latitude: 9.0578,
        longitude: 7.4951,
    },
    {
        country: "",
        city: "Alofi",
        state: "Niue",
        latitude: -19.059,
        longitude: -169.9185,
    },
    {
        country: "",
        city: "Pyongyang",
        state: "North Korea",
        latitude: 39.0194,
        longitude: 125.7388,
    },
    {
        country: "",
        city: "Skopje",
        state: "North Macedonia",
        latitude: 41.9981,
        longitude: 21.4254,
    },
    {
        country: "",
        city: "Oslo",
        state: "Norway",
        latitude: 59.9127,
        longitude: 10.7461,
    },
    {
        country: "",
        city: "Muscat",
        state: "Oman",
        latitude: 23.588,
        longitude: 58.3829,
    },
    {
        country: "",
        city: "Islamabad",
        state: "Pakistan",
        latitude: 33.6844,
        longitude: 73.0479,
    },
    {
        country: "",
        city: "Ngerulmud",
        state: "Palau",
        latitude: 7.5,
        longitude: 134.6245,
    },
    {
        country: "",
        city: "Jericho",
        state: "Palestine",
        latitude: 31.8613,
        longitude: 35.4534,
    },
    {
        country: "",
        city: "Panama City",
        state: "Panama",
        latitude: 8.9833,
        longitude: -79.5167,
    },
    {
        country: "",
        city: "Port Moresby",
        state: "Papua New Guinea",
        latitude: -9.4438,
        longitude: 147.1803,
    },
    {
        country: "",
        city: "Asunción",
        state: "Paraguay",
        latitude: -25.2637,
        longitude: -57.5759,
    },
    {
        country: "",
        city: "Lima",
        state: "Peru",
        latitude: -12.0464,
        longitude: -77.0428,
    },
    {
        country: "",
        city: "Manila",
        state: "Philippines",
        latitude: 14.5995,
        longitude: 120.9842,
    },
    {
        country: "",
        city: "Warsaw",
        state: "Poland",
        latitude: 52.2298,
        longitude: 21.0118,
    },
    {
        country: "",
        city: "Lisbon",
        state: "Portugal",
        latitude: 38.7169,
        longitude: -9.1395,
    },
    {
        country: "",
        city: "Doha",
        state: "Qatar",
        latitude: 25.276987,
        longitude: 51.520008,
    },
    {
        country: "",
        city: "Bucharest",
        state: "Romania",
        latitude: 44.4268,
        longitude: 26.1025,
    },
    {
        country: "",
        city: "Moscow",
        state: "Russia",
        latitude: 55.7558,
        longitude: 37.6173,
    },
    {
        country: "",
        city: "Kigali",
        state: "Rwanda",
        latitude: -1.9441,
        longitude: 30.0619,
    },
    {
        country: "",
        city: "Basseterre",
        state: "Saint Kitts and Nevis",
        latitude: 17.3,
        longitude: -62.7172,
    },
    {
        country: "",
        city: "Castries",
        state: "Saint Lucia",
        latitude: 13.99,
        longitude: -61.9985,
    },
    {
        country: "",
        city: "Kingstown",
        state: "Saint Vincent and the Grenadines",
        latitude: 13.1567,
        longitude: -61.245,
    },
    {
        country: "",
        city: "Apia",
        state: "Samoa",
        latitude: -13.8356,
        longitude: -172.0833,
    },
    {
        country: "",
        city: "San Marino",
        state: "San Marino",
        latitude: 43.9333,
        longitude: 12.45,
    },
    {
        country: "",
        city: "São Tomé",
        state: "São Tomé and Príncipe",
        latitude: 0.3341,
        longitude: 6.7343,
    },
    {
        country: "",
        city: "Riyadh",
        state: "Saudi Arabia",
        latitude: 24.7136,
        longitude: 46.6753,
    },
    {
        country: "",
        city: "Dakar",
        state: "Senegal",
        latitude: 14.6928,
        longitude: -17.4467,
    },
    {
        country: "",
        city: "Belgrade",
        state: "Serbia",
        latitude: 44.8176,
        longitude: 20.4633,
    },
    {
        country: "",
        city: "Victoria",
        state: "Seychelles",
        latitude: -4.6181,
        longitude: 55.45,
    },
    {
        country: "",
        city: "Freetown",
        state: "Sierra Leone",
        latitude: 8.4656,
        longitude: -13.2317,
    },
    {
        country: "",
        city: "Singapore",
        state: "Singapore",
        latitude: 1.3521,
        longitude: 103.8198,
    },
    {
        country: "",
        city: "Bratislava",
        state: "Slovakia",
        latitude: 48.1482,
        longitude: 17.1067,
    },
    {
        country: "",
        city: "Ljubljana",
        state: "Slovenia",
        latitude: 46.0511,
        longitude: 14.5051,
    },
    {
        country: "",
        city: "Honiara",
        state: "Solomon Islands",
        latitude: -9.4333,
        longitude: 159.95,
    },
    {
        country: "",
        city: "Mogadishu",
        state: "Somalia",
        latitude: 2.0371,
        longitude: 45.3427,
    },
    {
        country: "",
        city: "Pretoria",
        state: "South Africa",
        latitude: -25.746,
        longitude: 28.1872,
    },
    {
        country: "",
        city: "Seoul",
        state: "South Korea",
        latitude: 37.5665,
        longitude: 126.978,
    },
    {
        country: "",
        city: "Juba",
        state: "South Sudan",
        latitude: 4.8594,
        longitude: 31.582,
    },
    {
        country: "",
        city: "Madrid",
        state: "Spain",
        latitude: 40.4168,
        longitude: -3.7038,
    },
    {
        country: "",
        city: "Sri Jayawardenepura Kotte",
        state: "Sri Lanka",
        latitude: 6.9271,
        longitude: 79.9741,
    },
    {
        country: "",
        city: "Khartoum",
        state: "Sudan",
        latitude: 15.5007,
        longitude: 32.5599,
    },
    {
        country: "",
        city: "Paramaribo",
        state: "Suriname",
        latitude: 5.8662,
        longitude: -55.1713,
    },
    {
        country: "",
        city: "Stockholm",
        state: "Sweden",
        latitude: 59.3293,
        longitude: 18.0686,
    },
    {
        country: "",
        city: "Bern",
        state: "Switzerland",
        latitude: 46.9481,
        longitude: 7.4474,
    },
    {
        country: "",
        city: "Damascus",
        state: "Syria",
        latitude: 33.5138,
        longitude: 36.2765,
    },
    {
        country: "",
        city: "Dushanbe",
        state: "Tajikistan",
        latitude: 38.5598,
        longitude: 68.7782,
    },
    {
        country: "",
        city: "Dar es Salaam",
        state: "Tanzania",
        latitude: -6.7924,
        longitude: 39.2083,
    },
    {
        country: "",
        city: "Bangkok",
        state: "Thailand",
        latitude: 13.7563,
        longitude: 100.5018,
    },
    {
        country: "",
        city: "Lomé",
        state: "Togo",
        latitude: 6.1375,
        longitude: 1.2122,
    },
    {
        country: "",
        city: "Nukuʻalofa",
        state: "Tonga",
        latitude: -21.1394,
        longitude: -175.2,
    },
    {
        country: "",
        city: "Port of Spain",
        state: "Trinidad and Tobago",
        latitude: 10.6528,
        longitude: -61.5188,
    },
    {
        country: "",
        city: "Tunis",
        state: "Tunisia",
        latitude: 36.8189,
        longitude: 10.1658,
    },
    {
        country: "",
        city: "Ankara",
        state: "Turkey",
        latitude: 39.9334,
        longitude: 32.8597,
    },
    {
        country: "",
        city: "Ashgabat",
        state: "Turkmenistan",
        latitude: 37.9601,
        longitude: 58.3793,
    },
    {
        country: "",
        city: "Funafuti",
        state: "Tuvalu",
        latitude: -7.1095,
        longitude: 179.194,
    },
    {
        country: "",
        city: "Kampala",
        state: "Uganda",
        latitude: 0.3136,
        longitude: 32.5812,
    },
    {
        country: "",
        city: "Kyiv",
        state: "Ukraine",
        latitude: 50.4501,
        longitude: 30.5236,
    },
    {
        country: "",
        city: "Abu Dhabi",
        state: "United Arab Emirates",
        latitude: 24.4539,
        longitude: 54.3773,
    },
    {
        country: "",
        city: "London",
        state: "United Kingdom",
        latitude: 51.5074,
        longitude: -0.1278,
    },
    {
        country: "",
        city: "Montevideo",
        state: "Uruguay",
        latitude: -34.9011,
        longitude: -56.1645,
    },
    {
        country: "",
        city: "Tashkent",
        state: "Uzbekistan",
        latitude: 41.2995,
        longitude: 69.2401,
    },
    {
        country: "",
        city: "Port Vila",
        state: "Vanuatu",
        latitude: -17.7333,
        longitude: 168.3167,
    },
    {
        country: "",
        city: "Vatican City",
        state: "Vatican",
        latitude: 41.9029,
        longitude: 12.4534,
    },
    {
        country: "",
        city: "Caracas",
        state: "Venezuela",
        latitude: 10.4806,
        longitude: -66.8792,
    },
    {
        country: "",
        city: "Hanoi",
        state: "Vietnam",
        latitude: 21.0285,
        longitude: 105.8542,
    },
    {
        country: "",
        city: "Laayoune",
        state: "Western Sahara",
        latitude: 27.1482,
        longitude: -13.1652,
    },
    {
        country: "",
        city: "Sana'a",
        state: "Yemen",
        latitude: 15.3694,
        longitude: 44.191,
    },
    {
        country: "",
        city: "Lusaka",
        state: "Zambia",
        latitude: -15.3875,
        longitude: 28.3228,
    },
    {
        country: "",
        city: "Harare",
        state: "Zimbabwe",
        latitude: -17.8292,
        longitude: 31.0522,
    },
].sort((a, b) => a.state.localeCompare(b.state));

/* export const States = () => {
    const {
        state: { allResults },
        updateStates,
    } = useContext(RaceContext);

    const updated_states: ActiveArea[] = StatesInit.map((state) => ({
        ...state,
        isHovered: false,
        n_races: allResults.filter(
            (race) => race.state.toLowerCase() === state.state.toLowerCase(),
        ).length,
    }));

    useEffect(() => {
        updateStates(updated_states);
    }, [allResults]);

    return updated_states;
};

export default States;
 */
