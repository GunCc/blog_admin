/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-17 11:22:36
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 14:18:37
 * @FilePath: \blog_admin\src\logics\theme\updateBackground.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { setCssVar } from "./utils";
import { ThemeEnum } from "/@/enums/appEnum";
import { create } from "/@/store";
import { colorIsDark, darken, lighten } from "/@/utils/color";

// 头部样式名
const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

// 侧边栏样式
const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';


export function updateHeaderBgColor(color?: string) {
    const store = create();
    const darkMode = store.getters.app.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = "#151515";
        } else {
            color = store.getters.app.getHeaderSetting
        }
    }

    setCssVar(HEADER_BG_COLOR_VAR, color);
    const hoverColor = lighten(color!, 6);
    setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
    setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor)

    const isDark = colorIsDark(color!);
    store.commit("app/SetProjectConfig", {
        headerSetting: {
            theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT
        }
    })
}

/**
 * 修改左侧菜单栏样式
 */

export function updateSidebarBgColor(color?: string) {
    const store = create();
    const darkMode = store.getters.app.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = "#212121"
        } else {
            color = store.getters.app.getMenuSetting.bgColor;
        }
    }
    setCssVar(SIDER_DARK_BG_COLOR, color);
    setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
    setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));
    const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase());
    store.commit("app/SetProjectConfig", {
        menuSetting: {
            theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK
        }
    })

}