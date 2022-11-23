
import { resolve } from "path";

import { generateModifyVars } from "./build/generate/generateModifyVars";
import { OUTPUT_DIR } from "./build/constant";
import { createVitePlugins } from "./build/vite/plugin";
import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { wrapperEnv } from "./build/utils";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取工作目录
  const root = process.cwd();
  // 加载环境配置
  const env = loadEnv(mode, root);
  // 初始化环境配置默认值
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    root,
    base: VITE_PUBLIC_PATH,
    plugins: createVitePlugins(viteEnv, isBuild),
    build: {
      target: "es2015",
      cssTarget: "chrome80",
      outDir: OUTPUT_DIR,
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
    define: {
      //新增以下变量
      __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
      __PROD__: true,
      __COLOR_PLUGIN_OPTIONS__: {},
    },
  }
}