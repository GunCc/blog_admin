/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-16 20:22:59
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-16 21:23:52
 * @FilePath: \blog_admin\src\settings\projectSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { primaryColor } from "../../build/config/themeConfig";
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum, SessionTimeoutProcessingEnum, SettingButtonPositionEnum, ThemeEnum } from "../enums/appEnum";
import { CacheTypeEnum } from "../enums/cacheEnum";
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from "../enums/menuEnum";
import { ProjectConfig } from "../types/config";
import { EHADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from "./designSetting";

const setting: ProjectConfig = {
    // 是否显示按钮标志
    showSettingButton: true,

    showDarkModeToggle: true,

    settingButtonPosition: SettingButtonPositionEnum.AUTO,

    permissionMode: PermissionModeEnum.ROUTE_MAPPING,

    permissionCacheType: CacheTypeEnum.LOCAL,

    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

    // #834655
    themeColor: primaryColor,

    grayMode: false,

    colorWeak: false,

    fullContent: false,

    contentMode: ContentEnum.FULL,

    showLogo: true,

    showFooter: false,

    headerSetting: {
        bgColor: EHADER_PRESET_BG_COLOR_LIST[0],
        fixed: true,
        show: true,
        theme: ThemeEnum.LIGHT,
        useLockPage: true,
        showFullScreen: true,
        showDoc: true,
        showNotice: true,
        showSearch: true
    },

    menuSetting: {
        bgColor: SIDE_BAR_BG_COLOR_LIST[0],
        fixed: true,
        collapsed: false,
        siderHidden: false,
        collapsedShowTitle: false,
        canDrag: false,
        show: true,
        hidden: false,
        menuWidth: 210,
        mode: MenuModeEnum.INLINE,
        type: MenuTypeEnum.SIDEBAR,
        theme: ThemeEnum.DARK,
        split: false,
        topMenuAlign: 'center',
        trigger: TriggerEnum.HEADER,
        accordion: true,
        closeMinSidebarOnChange: false,
        mixSideTrigger: MixSidebarTriggerEnum.CLICK,
        mixSideFixed: false
    },
    multiTabsSetting: {
        cache: false,
        show: true,
        canDrag: true,
        showQuick: true,
        showRedo: true,
        showFold: true
    },
    transitionSetting: {
        enable: true,
        basicTransition: RouterTransitionEnum.FADE_SIDE,
        openPageLoading: true,
        openNProgress: false,
    },
    openKeepAlive: true,
    lockTime: 0,
    showBreadCrumb: true,
    showBreadCrumbIcon: false,
    useErrorHandle: false,
    useOpenBackTop: true,
    canEmbedIFramePage: true,
    closeMessageOnSwitch: true,
    removeAllHttpPending: false
}

export default setting;