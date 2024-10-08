import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    plugins: [createVuePlugin()],
});
