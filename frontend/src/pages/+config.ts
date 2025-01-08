import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layouts/Layout";
import runemu_logo from "../../public/images/logos/emu_color_crop.webp.png";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
    // https://vike.dev/Layout
    Layout,

    // https://vike.dev/head-tags
    title: "RunEmu | The easiest way to find your next race",
    description:
        "Browse thousands of upcoming races in our directory, from 5k to ultra marathons.",
    image: runemu_logo,

    extends: vikeReact,
} satisfies Config;
