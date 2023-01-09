import { MenuMode, MenuTheme } from "ant-design-vue";
import { PropType } from "vue";
import { ThemeEnum } from "/@/enums/appEnum";
import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";
import { Menu } from "/@/router/types";
import { propTypes } from "/@/utils/propTypes";

export const basicProps = {
    // 菜单数据
    items: {
        type: Array as PropType<Menu[]>,
        default: () => [],
    },
    inlineIndent: propTypes.number.def(20),
    // 收起是否显示标题
    collapsedShowTitle: propTypes.bool,
    // 菜单组件的mode属性
    mode: {
        type: String as PropType<MenuMode>,
        default: MenuModeEnum.INLINE
    },
    // 菜单组建的type属性
    type: {
        type: String as PropType<MenuTypeEnum>,
        default: MenuTypeEnum.MIX,
    },
    // 自定义颜色
    theme: {
        type: String as PropType<MenuTheme>,
        debugger: ThemeEnum.DARK
    },
    // inline模式下的收起组件
    inlineCollapsed: propTypes.bool,
    mixSider: propTypes.bool,
    isHorizontal: propTypes.bool,
    accordion: propTypes.bool.def(true),
    // 点击事件
    beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>
    }
}


// 菜单选项点击事件
export const itemProps = {
    item: {
        type: Object as PropType<Menu>,
        default: {}
    },
    // 等级
    level: propTypes.number,
    theme: propTypes.oneOf(['dark', 'light']),
    showTitle: propTypes.bool,
    isHorizontal: propTypes.bool,
}

// 内容传参
export const contentProps = {
    item: {
        type: Object as PropType<Menu>,
        default: null,
    },
    showTitle: propTypes.bool.def(true),
    level: propTypes.number.def(0),
    isHorizontal: propTypes.bool.def(true)
}