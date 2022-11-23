/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:08:36
 * @FilePath: \blog_admin\src\hooks\setting\useMenuSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, ref, unref } from "vue";
import { useFullContent } from "../web/useFullContent";
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from "/@/enums/appEnum";
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from "/@/enums/menuEnum";
import {  useStore } from "/@/store";
import { MenuSetting } from "/@/types/config";

const mixSideHasChildren = ref(false);


export function useMenuSetting() {
    const { getFullContent: fullContent } = useFullContent();
    const store = useStore();
    const getShowSidebar = computed(() => {
        return (
            unref(getSplit) ||
            (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
        );
    });

    const getCollapsed = computed(() => store.getters["AppStore/getMenuSetting"]?.collapsed);
    const getMenuType = computed(() => store.getters["AppStore/getMenuSetting"]?.type);
    const getMenuMode = computed(() => store.getters["AppStore/getMenuSetting"]?.mode);
    const getMenuFixed = computed(() => store.getters["AppStore/getMenuSetting"]?.fixed);
    const getShowMenu = computed(() => store.getters["AppStore/getMenuSetting"]?.show);
    const getMenuHidden = computed(() => store.getters["AppStore/getMenuSetting"]?.hidden);
    const getMenuWidth = computed(() => store.getters["AppStore/getMenuSetting"]?.menuWidth);
    const getTrigger = computed(() => store.getters["AppStore/getMenuSetting"]?.trigger);
    const getMenuTheme = computed(() => store.getters["AppStore/getMenuSetting"]?.theme);
    const getSplit = computed(() => store.getters["AppStore/getMenuSetting"]?.split);
    const getMenuBgColor = computed(() => store.getters["AppStore/getMenuSetting"]?.bgColor);
    const getMixSideTrigger = computed(() => store.getters["AppStore/getMenuSetting"]?.mixSideTrigger);
    const getCanDrag = computed(() => store.getters["AppStore/getMenuSetting"]?.canDrag);
    const getAccordion = computed(() => store.getters["AppStore/getMenuSetting"]?.accordion);
    const getMixSideFixed = computed(() => store.getters["AppStore/getMenuSetting"]?.mixSideFixed);
    const getTopMenuAlign = computed(() => store.getters["AppStore/getMenuSetting"]?.topMenuAlign);
    const getCloseMixSidebarOnChange = computed(() => store.getters["AppStore/getMenuSetting"].closeMixSidebarOnChange);
    const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);
    const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);
    const getCollapsedShowTitle = computed(() => store.getters["AppStore/getMenuSetting"]?.collapsedShowTitle);

    const getShowTopMenu = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
    });

    const getShowHeaderTrigger = computed(() => {
        if (
            unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
            !unref(getShowMenu) ||
            unref(getMenuHidden)
        ) {
            return false;
        }

        return unref(getTrigger) === TriggerEnum.HEADER;
    });

    const getIsHorizontal = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
    });

    const getIsMixSidebar = computed(() => {
        return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
    });
    const getIsMixMode = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
    });

    const getRealWidth = computed(() => {
        if (unref(getIsMixSidebar)) {
            return unref(getCollapsed) && !unref(getMixSideFixed)
                ? unref(getMiniWidthNumber)
                : unref(getMenuWidth);
        }
        return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
    });


    const getMiniWidthNumber = computed(() => {
        const { collapsedShowTitle , siderHidden } = store.getters["AppStore/getMenuSetting"] || {};
        return siderHidden
            ? 0
            : collapsedShowTitle
                ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
                : SIDE_BAR_MINI_WIDTH;
    });

    const getCalcContentWidth = computed(() => {
        const width =
            unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
                ? 0
                : unref(getIsMixSidebar)
                    ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
                    (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
                    : unref(getRealWidth);

        return `calc(100% - ${unref(width)}px)`;
    });

    // Set menu configuration
    function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
        store.commit("AppStore/SetProjectConfig", { menuSetting });
    }

    function toggleCollapsed() {
        setMenuSetting({
            collapsed: !unref(getCollapsed),
        });
    }
    return {
        setMenuSetting,

        toggleCollapsed,

        getMenuFixed,
        getRealWidth,
        getMenuType,
        getMenuMode,
        getShowMenu,
        getCollapsed,
        getMiniWidthNumber,
        getCalcContentWidth,
        getMenuWidth,
        getTrigger,
        getSplit,
        getMenuTheme,
        getCanDrag,
        getCollapsedShowTitle,
        getIsHorizontal,
        getIsSidebarType,
        getAccordion,
        getShowTopMenu,
        getShowHeaderTrigger,
        getTopMenuAlign,
        getMenuHidden,
        getIsTopMenu,
        getMenuBgColor,
        getShowSidebar,
        getIsMixMode,
        getIsMixSidebar,
        getCloseMixSidebarOnChange,
        getMixSideTrigger,
        getMixSideFixed,
        mixSideHasChildren,
    };
}