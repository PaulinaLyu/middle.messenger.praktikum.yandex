import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: {},
  },
  base: "./",
  build: {
    outDir: "dist",
  },
  publicDir: "static",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      crypto: "crypto-js",
    },
  },
});
