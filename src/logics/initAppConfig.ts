/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-16 17:14:49
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-16 22:14:13
 * @FilePath: \blog_admin\src\logics\initAppConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { deepMerge } from "@/utils";
import { PROJ_CFG_KEY } from "../enums/cacheEnum";
import { create } from "../store";
import { ProjectConfig } from "../types/config";
import { Persistent } from "../utils/cache/persistent";
import projectSetting from "@/settings/projectSetting"
import { primaryColor } from "../../build/config/themeConfig";
import { changeTheme } from "./theme"
import { updateGrayMode } from "./theme/updateGrayMode";
import { updateColorWeak } from "./theme/updateColorWeak";

// 初始化项目配置
export function initAppConfigStore() {
    const store = create();

    let projectConfig: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
    projectConfig = deepMerge(projectSetting, projectConfig || {});
    const darkMode = store.getters.darkMode;
    const {
        colorWeak,
        grayMode,
        themeColor,
        headerSetting: { bgColor: headerBgColor } = {},
        menuSetting: { bgColor } = {}
    } = projectConfig;
    try {
        if (themeColor && themeColor !== primaryColor) {
            changeTheme(themeColor)
        }
        grayMode && updateGrayMode(grayMode);
        colorWeak && updateColorWeak(colorWeak);
    } catch (error) {
        console.log(error)
    }
}