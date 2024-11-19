interface RaceType {
    name: string;
    distance: number;
    location: string;
    latitude: number;
    longitude: number;
    date: Date;
    id?: number;
    onMap?: boolean;
    isHovered?: boolean;
}

export default RaceType;
