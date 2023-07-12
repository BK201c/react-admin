import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEasyMock from "vite-easy-mock";
import visualizer from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    viteEasyMock(),
    visualizer({ open: true }),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: "icon",
        },
        prettier: false,
        dimensions: false,
      },
    }),
  ],
  base: "./",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", "*.svg"],
    alias: [{ find: "@", replacement: "/src/" }],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [],
    },
    include: [],
  },
  server: {
    port: 3301,
    host: "localhost",
    open: "/",
    hmr: true,
    proxy: {
      "/api": {
        target: "http://192.168.33.108:20001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
