import { writeFileSync } from 'fs';
import path from 'path';
import { StatesInit } from '../constants/States';
import { slugify } from '../utils/url_utils';
import { fetchRaces } from '../api/races';
import RaceType from '../types/race';

interface SitemapProps {
    path: string;
    freq: "daily" | "weekly" | "monthly" | "yearly";
    priority: string;
}

const sitemapContent = ({path, freq, priority} : SitemapProps) => { 
    return (    
    `
    <url>
        <loc>https://www.runemu.com${path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${priority}</priority>
    </url>
    `
);
}

const __dirname = path.resolve();
const outputPath = path.join(__dirname, '/public/sitemap.xml');

// Write the sitemap to a file
try {
    const xmls: string[] = [];
    xmls.push(sitemapContent({path:"", freq:"daily", priority:"1.0"}));
    xmls.push(sitemapContent({path:"/about", freq:"monthly", priority:"0.9"}));
    xmls.push(sitemapContent({path:"/privacy", freq:"monthly", priority:"0.1"}));
    xmls.push(sitemapContent({path:"/login", freq:"daily", priority:"0.9"}));
    xmls.push(sitemapContent({path:"/contact", freq:"monthly", priority:"0.9"}));


    StatesInit.forEach((state) => {
        xmls.push(
            sitemapContent({
                path: `/location/${slugify(state.state)}`,
                freq: "daily",
                priority: "0.8",
            })
        )
    })

    const races: RaceType[] = await fetchRaces(null, false);
    races.forEach((race) => {
        xmls.push(
            sitemapContent({
                path: `/races/${slugify(race.name_url)}`,
                freq: "yearly",
                priority: "0.5",
            })
        )
    })

    const fullXML: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmls.join("\n")}
</urlset>
    `

    writeFileSync(outputPath, fullXML, "utf-8");
    console.log(`Sitemap written to: ${outputPath}`);
} catch (error) {
    console.error(`Failed to write sitemap:`, error);
}
