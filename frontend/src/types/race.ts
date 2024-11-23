interface Distance {
    id?: number;
    name: string;
    distance: number;
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
    latitude: number;
    longitude: number;
    date: Date;
    id?: number;
    onMap?: boolean;
    isHovered?: boolean;
}

export default RaceType;
