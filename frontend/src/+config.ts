import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "./layouts/Layout";
import runemu_logo from "../public/images/logos/emu_bw.svg";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
    // https://vike.dev/Layout
    Layout,

    // https://vike.dev/head-tags
    title: "RunEmu",
    description:
        "The world's most advanced & user-friendly race searching tool.",
    image: runemu_logo,

    extends: vikeReact,
} satisfies Config;
