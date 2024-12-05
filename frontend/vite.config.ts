import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { cjsInterop } from "vite-plugin-cjs-interop";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vike({ prerender: true }),
        cjsInterop({
            dependencies: ["react-map-gl/maplibre", "react-map-gl/**"],
        }),
    ],
});
