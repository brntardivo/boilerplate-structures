import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

const resolve = (dir: string): string => {
  return path.join(__dirname, dir);
};

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": resolve("."),
      "@src": resolve("./src"),
      "@assets": resolve("./src/assets"),
      "@fonts": resolve("./src/assets/fonts"),
      "@images": resolve("./src/assets/images"),
      "@css": resolve("./src/assets/css"),
      "@components": resolve("./src/components"),
      "@interfaces": resolve("./src/interfaces"),
      "@main": resolve("./src/main"),
      "@directives": resolve("./src/directives"),
      "@services": resolve("./src/services"),
      "@mixins": resolve("./src/mixins"),
      "@models": resolve("./src/models"),
      "@router": resolve("./src/router"),
      "@store": resolve("./src/store"),
      "@utils": resolve("./src/utils"),
      "@views": resolve("./src/views"),
      "@modules": resolve("./src/modules"),
    },
  },
});
