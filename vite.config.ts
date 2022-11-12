import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// element plus 按需引入

// windiCss
import WindiCSS from "vite-plugin-windicss";  // <==
import { generateModifyVars } from "./build/generate/generateModifyVars";
import { OUTPUT_DIR } from "./build/constant";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // windiCss
    WindiCSS(),
  ],
  build: {
    target: "es2015",
    cssTarget: "chrome80",
    outDir: OUTPUT_DIR,
    // Turning off brotliSize display can slightly reduce packaging time
    // brotliSize: false,
    // chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: [
      {
        find: /\@\//,
        replacement: pathResolve("src") + "/",
      },
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
});
