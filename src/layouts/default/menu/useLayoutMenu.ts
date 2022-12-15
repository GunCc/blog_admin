import { useThrottleFn } from "@vueuse/core";
import { computed, Ref, ref, unref, watch } from "vue";
import { useRouter } from "vue-router";
import { MenuSplitTypeEnum } from "/@/enums/menuEnum";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from "/@/router/menus";
import { Menu } from "/@/router/types";
import { useStore } from "/@/store";

export function useSplitMenu(splitType: Ref<MenuSplitTypeEnum>) {
    // Menu Array 
    const menusRef = ref<Menu[]>([])
    const { currentRoute } = useRouter();
    const store = useStore();
    const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting();
    const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu)

    const splitNotLeft = computed(
        () => !unref(getSplit) || unref(splitType) !== MenuSplitTypeEnum.LEFT,
    )

    const getSplitLeft = computed(
        () => !unref(getSplit) || unref(splitType) !== MenuSplitTypeEnum.LEFT
    )
    const getSplitTop = computed(
        () => unref(splitType) === MenuSplitTypeEnum.TOP
    )

    const normalType = computed(() => {
        return unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit)
    })

    watch(
        [() => unref(currentRoute).path, () => unref(splitType)],
        async ([path]: [string, MenuSplitTypeEnum]) => {
            if (unref(splitNotLeft)) return;
            const { meta } = unref(currentRoute);
            const currentActiveMenu = meta.currentActiveMenu as string;
            let parentPath = await getCurrentParentPath(path)
            if (!parentPath) {
                parentPath = await getCurrentParentPath(currentActiveMenu);
            }
            parentPath && throttleHandleSplitLeftMenu(parentPath)
        },
        {
            immediate: true
        }
    )

    // 菜单切换
    watch(
        [() => store.getters["PermStore/getLastBuildMenuTime"], () => store.getters["PermStore/getBackMenuList"]],
        () => {
            genMenus();
        },
        {
            immediate: true
        }
    )
    // 菜单切割改变
    watch(
        () => getSplit.value,
        () => {
            if (unref(splitNotLeft)) return;
            genMenus();
        }
    )

    // 生成菜单
    async function genMenus() {
        // 默认模式
        if (unref(normalType)) {
            menusRef.value = await getMenus();
            return
        }

        // 上方
        if (unref(getSplitTop)) {
            const shallowMenus = await getShallowMenus();
            menusRef.value = shallowMenus;
            return;
        }
    }

    // 控制做菜单拆分
    async function handleSplitLeftMenu(parentPath: string) {
        if (unref(getSplitLeft)) return;
        // 拆分
        const children = await getChildrenMenus(parentPath);

        if (!children || !children.length) {
            setMenuSetting({ hidden: true })
            menusRef.value = [];
            return;
        }
        setMenuSetting({ hidden: false });
        menusRef.value = children
    }

    return { menusRef }

}