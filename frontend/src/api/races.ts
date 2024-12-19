import { createClient, PostgrestError } from "@supabase/supabase-js";
import { ActiveArea } from "../context/RaceFeedContext";
import RaceType from "../types/race";

export const supabase = createClient(
    "https://hzbtbujyhfuhbtramttg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YnRidWp5aGZ1aGJ0cmFtdHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTA1OTgsImV4cCI6MjA0OTQyNjU5OH0.4PVn3P1e9tyRJ37DWzHwYxtyy_GhdFzDmw82Qk00QnE"
);

export const fetchRaces = async (state: ActiveArea | null, need_state: boolean): Promise<RaceType[]> => {
    let races: RaceType[] = []
    let dat: any[] | null = null;
    let err: PostgrestError | null = null;

    const today = new Date().toISOString().split('T')[0];

    if (state !== null && state.state.length > 0) {
        const {data, error} = await supabase.from("Races").select().eq("state", state?.state).gte("date", today);
        dat = data;
        err = error;
    }

    else if (need_state) {
        return [];
    }

    else {
        const {data, error} = await supabase.from("Races").select().gte("date", today);
        dat = data;
        err = error;
    }

    if (err) {
        throw new Error(err.message);
    }

    if (dat && dat.length >= 1) {
        races = dat.map((datum) => {
            return {
                ...datum,
                images: null,
                onMap: true,
                isHovered: false,
                valid_distance: true,
            }
        });
    } 

    return races;
}

export const fetchByName = async (name: string): Promise<RaceType | null> => {
    const { data, error } = await supabase.from("Races").select().eq("name_url", name);
    if (error) {
        throw new Error(error.message);
    }

    if (data.length === 0) {
        return null;
    }

    let race: RaceType = {...data[0], images: null, onMap: true, isHovered: false, valid_distance: true}
    return race;
}