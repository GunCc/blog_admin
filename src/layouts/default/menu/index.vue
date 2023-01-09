<script lang="tsx">
import { defineComponent, PropType, toRef, unref, computed, toRefs } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { MenuSplitTypeEnum, MenuModeEnum } from "@/enums/menuEnum"
import { useGo } from "@/hooks/web/usePage"
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { useSplitMenu } from "./useLayoutMenu"
import { AppLogo } from '/@/components/Application';
import { BasicMenu } from "/@/components/Menu"
import { openWindow } from "/@/utils"
import { isUrl } from '/@/utils/is';
export default defineComponent({
    name: "LayoutMenu",
    props: {
        theme: propTypes.oneOf(['light', 'dark']),
        splitType: {
            type: Number as PropType<MenuSplitTypeEnum>,
            default: MenuSplitTypeEnum.NONE
        },
        isHorizontal: propTypes.bool,
        menuMode: {
            type: [String] as PropType<Nullable<MenuModeEnum>>,
            default: ''
        }
    },
    setup(props) {
        const go = useGo();
        // 获取菜单配置
        const {
            getMenuMode,
            getMenuType,
            getMenuTheme,
            getCollapsed,
            getCollapsedShowTitle,
            getAccordion,
            getIsHorizontal,
            getIsSidebarType,
            getSplit
        } = useMenuSetting();

        const RootSetting = useRootSetting() || {};

        const { prefixCls } = useDesign('layout-menu')

        const { menusRef } = useSplitMenu(toRef(props, 'splitType'))

        console.log("menusRef", menusRef)

        const getIsShowLogo = computed(() => unref(RootSetting.getShowLogo) && unref(getIsSidebarType));

        const getComputedMenuMode = computed(() =>
            props.menuMode || unref(getMenuMode))

        const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

        const getUseScroll = computed(() => {
            return (
                !unref(getIsHorizontal) &&
                (unref(getIsSidebarType) ||
                    props.splitType === MenuSplitTypeEnum.LEFT ||
                    props.splitType === MenuSplitTypeEnum.NONE)
            )
        })
        // 渲染菜单头部
        function renderHeader() {
            if (!unref(getIsShowLogo)) return null;
            return (
                <>
                    <div>asd</div>
                    <AppLogo />
                </>

            )
        }

        // 菜单点击前事件
        async function beforeMenuClickFn(path: string) {
            if (!isUrl(path)) {
                return true;
            }
            openWindow(path);
            return false;
        }

        // 菜单点击事件
        function handleMenuClick(path: string) {
            go(path);
        }
        const getCommonProps = computed(() => {
            const menus = unref(menusRef);
            return {
                menus,
                beforeClickFn: beforeMenuClickFn,
                items: menus,
                theme: unref(getComputedMenuTheme),
                accordion: unref(getAccordion),
                collapse: unref(getCollapsed),
                collapsedShowTitle: unref(getCollapsedShowTitle),
                onMenuClick: handleMenuClick,
            }
        })

        // 渲染菜单
        function renderMenu() {
            const { menus, ...menuProps } = unref(getCommonProps)
            console.log("menus", menus)
            return <BasicMenu
                {...(menuProps as any)}
                isHorizontal={props.isHorizontal}
                type={unref(getMenuType)}
                showLogo={unref(getIsShowLogo)}
                mode={unref(getComputedMenuMode)}
                items={menus}
            ></BasicMenu>
        }

        return () => {
            return (
                <>
                    {renderHeader()}
                    {unref(getUseScroll) ? (renderMenu()) : (renderMenu())}
                </>
            )
        }
    }
})
</script>