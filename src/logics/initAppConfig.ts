/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-16 17:14:49
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:04:13
 * @FilePath: \blog_admin\src\logics\initAppConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { deepMerge } from "@/utils";
import { PROJ_CFG_KEY } from "../enums/cacheEnum";
import { useStore } from "../store";
import { ProjectConfig } from "../types/config";
import { Persistent } from "../utils/cache/persistent";
import projectSetting from "@/settings/projectSetting"
import { primaryColor } from "../../build/config/themeConfig";
import { changeTheme } from "./theme"
import { updateGrayMode } from "./theme/updateGrayMode";
import { updateColorWeak } from "./theme/updateColorWeak";
import { ThemeEnum } from "../enums/appEnum";
import { getCommonStoragePrefix, getStorageShortName } from "../utils/env";
import { updateHeaderBgColor, updateSidebarBgColor } from "./theme/updateBackground";

// 初始化项目配置
export function initAppConfigStore() {
    const store = useStore();

    let projectConfig: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
    projectConfig = deepMerge(projectSetting, projectConfig || {});
    console.log(store)
    const darkMode = store.getters["AppStore/darkMode"];
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

    store.commit("AppStore/SetProjectConfig", projectConfig);
    // 如果是黑色模式
    if (darkMode === ThemeEnum.DARK) {
        updateHeaderBgColor();
        updateSidebarBgColor();
    } else {
        headerBgColor && updateHeaderBgColor(headerBgColor)
        bgColor && updateSidebarBgColor(bgColor)
    }

    // init store 
    store.commit("LocaleStore/initLocale")

    setTimeout(() => {
        clearObsoleteStorage()
    }, 16)
}


/**
 * @desc 该方法删除无用的一些缓存
 */
export function clearObsoleteStorage() {
    const commonPrefix = getCommonStoragePrefix();
    const shortPrefix = getStorageShortName();


    [localStorage, sessionStorage].forEach((item: Storage) => {
        Object.keys(item).forEach((key) => {
            if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
                item.removeItem(key)
            }
        })
    })
}