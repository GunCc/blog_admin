
import { PluginOption } from "vite"

import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import WindiCSS from "vite-plugin-windicss";
import { configThemePlugin } from "./theme";
import { viteThemePlugin } from "vite-plugin-theme";


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    // const {
    //     VITE_USE_IMAGEMIN,
    //     VITE_USE_MOCK,
    //     VITE_LEGACY,
    //     VITE_BUILD_COMPRESS,
    //     VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
    // } = viteEnv

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        // 不得不加载的一些插件
        vue(),
        vueJsx()
    ]

    vitePlugins.push(WindiCSS());

    // vitePlugins.push(configThemePlugin(isBuild))
    // vitePlugins.push(viteThemePlugin({
    //     colorVariables: [],
    // }))
    return vitePlugins
}