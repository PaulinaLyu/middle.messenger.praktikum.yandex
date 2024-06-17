import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  publicDir: "static",
  server: {
    port: 3000,
  },
});
