import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// element plus 按需引入

// windiCss
import WindiCSS from "vite-plugin-windicss";  // <==
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  plugins: [
    vue(),
    // windiCss
    WindiCSS(),
  ],
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
});
