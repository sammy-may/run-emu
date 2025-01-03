export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

export const capitalize = (text: string) => {
    if (!text)
        return text;
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}