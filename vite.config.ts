import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

export default defineConfig({
    base: "/#/", // Change this to match your repo name
    plugins: [react()],
    optimizeDeps: { exclude: ["@arcgis/core"] },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});