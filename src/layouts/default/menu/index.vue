<script lang="tsx">
import { defineComponent, PropType } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { MenuSplitTypeEnum, MenuModeEnum } from "@/enums/menuEnum"
import { useGo } from "@/hooks/web/usePage"
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useDesign } from '/@/hooks/web/useDesign';
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
        const { getShowlogo } = useRootSetting();
        const { prefixCls } = useDesign('layout-menu')
        const { menusRef } = useSplitMenu(toRef(props, 'splitType'))
    }
})
</script>