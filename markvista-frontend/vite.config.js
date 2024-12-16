/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "./postcss.config.js";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@/components/ui": path.resolve(__dirname, "./src/components/ui"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/lib/utils"),
      "@public": path.resolve(__dirname, "./public"),
      "@src": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  build: {
    sourcemap: true,
  },
  css: {
    postcss,
  },
});
