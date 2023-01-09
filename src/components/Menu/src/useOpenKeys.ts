import { uniq } from "@antfu/utils";
import { computed, Ref, toRaw, unref } from "vue";
import { MenuState } from "./types";
import { MenuModeEnum } from "/@/enums/menuEnum";
import { useTimeoutFn } from "/@/hooks/core/useTimeout";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { getAllParentPath } from "/@/router/helper/menuHelper";
import type { Menu as MenuType } from '/@/router/types';

// 点击菜单项的一些方法
export function useOpenKeys(
    menuState: MenuState,
    menus: Ref<MenuType[]>,
    mode: Ref<MenuModeEnum>,
    accordion: Ref<boolean>,
) {
    // 获取配置
    const { getCollapsed, getIsMixSidebar } = useMenuSetting();

    // Set
    async function setOpenKeys(path: string) {
        if (mode.value === MenuModeEnum.HORIZONTAL) {
            return
        }
        const native = unref(getIsMixSidebar);
        // 
        useTimeoutFn(
            () => {
                const menuList = toRaw(menus.value);
                if (menuList?.length === 0) {
                    menuState.openKeys = [];
                    return;
                }
                if (!unref(accordion)) {
                    menuState.openKeys = uniq([...menuState.openKeys, ...getAllParentPath(menuList, path)]);
                } else {
                    menuState.openKeys = getAllParentPath(menuList, path)
                }
            },
            16,
            !native,
        );
    }

    // Get
    const getOpenKeys = computed(() => {
        const collapse = unref(getIsMixSidebar) ? false : unref(getCollapsed)
        return collapse ? menuState.collapsedOpenKeys : menuState.openKeys
    })

    // 重置
    function resetKeys() {
        menuState.selectedKeys = [];
        menuState.openKeys = [];
    }

    // 点击change事件
    function handleOpenChange(openKeys: string[]) {
        if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion) || unref(getIsMixSidebar)) {
            menuState.openKeys = openKeys;
        } else {
            const rootSubMenuKeys: string[] = [];
            for (const { children, path } of unref(menus)) {
                if (children && children.length > 0) {
                    rootSubMenuKeys.push(path)
                }
            }
            if (!unref(getCollapsed)) {
                const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1);
                if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
                    menuState.openKeys = openKeys
                } else {
                    menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            } else {
                menuState.collapsedOpenKeys = openKeys
            }
        }
    }
    return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange }
}