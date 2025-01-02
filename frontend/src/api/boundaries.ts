export const loadGeoJson = async (state: string) => {
    if (
        state === "hawaii" ||
        state.toLowerCase().includes("canada") ||
        state.toLowerCase().includes("bissau") ||
        state.toLowerCase().includes("congo") ||
        state.toLowerCase().includes("ncipe")
        //!(country === "usa" || country === "canada")
    ) {
        return {};
    }
    const url = `https://hzbtbujyhfuhbtramttg.supabase.co/storage/v1/object/public/boundaries/${state}.json`;
    const resp = await fetch(url);
    const res = await resp.json();
    return res;
};

export const loadAllGeoJson = async () => {
    const url = "https://hzbtbujyhfuhbtramttg.supabase.co/storage/v1/object/public/boundaries/merged_boundaries.json";
    const resp = await fetch(url);
    const res = await resp.json();
    return res;
}