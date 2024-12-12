interface Distance {
    id?: number;
    name: string;
    distance: number;
    match?: boolean;
}
interface DistanceData {
    data: Distance[];
}
interface ImgData {
    data: string[];
}
interface RaceType {
    name: string;
    name_url: string;
    distance: number;
    distance_min: number;
    distance_max: number;
    distances: DistanceData;
    images: ImgData;
    website: string;
    register: string;
    location: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    date: Date;
    id?: number;
    onMap?: boolean;
    isHovered?: boolean;
    valid_distance?: boolean;

    typical_high?: number;
    typical_low?: number;
    precip_chance?: number;
    station_name?: string;
    station_distance?: number;
}

export default RaceType;
