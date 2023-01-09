<template>
    <Menu :selectedKeys="selectedKeys" :defaultSelectedKeys="defaultSelectedKeys" :mode="mode" :openKeys="getOpenKeys"
        :inlineIndent="inlineIndent" :theme="theme" @openChange="handleOpenChange" @click="handleMenuClick"
        :subMenuCloseDelay="0.2" v-bind="getInlineCollapseOptions">
        <template v-for="item in items" :key="item.path">
            <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
        </template>
    </Menu>
</template>
<script  lang='ts'>
import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue';
import { Menu } from "ant-design-vue"
import BasicSubMenuItem from "./components/BasicSubMenuItem.vue"
import { basicProps } from './props';
import { MenuState } from "./types"
import { useOpenKeys } from './useOpenKeys';
import { isFunction } from '/@/utils/is';
import { MenuModeEnum } from '/@/enums/menuEnum';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
export default defineComponent({
    name: "BasicMenu",
    components: {
        Menu,
        BasicSubMenuItem
    },
    props: basicProps,
    emit: ['menuClick'],
    setup(props, { emit }) {
        const isClickGo = ref(false);

        // 获取菜单配置
        const { getCollapsed, getTopMenuAlign, getSplit } = useMenuSetting();

        // 菜单基本配置
        const menuState = reactive<MenuState>({
            defaultSelectedKeys: [],
            openKeys: [],
            selectedKeys: [],
            collapsedOpenKeys: [],
        })

        const { mode, items, accordion } = toRefs(props)
        const { handleOpenChange, getOpenKeys, setOpenKeys } = useOpenKeys(
            menuState, items, mode as any, accordion
        )

        const getInlineCollapseOptions = computed(() => {
            const isInline = props.mode === MenuModeEnum.INLINE;
            const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
            if (isInline) {
                inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed)
            }
            return inlineCollapseOptions;
        })

        async function handleMenuClick({ key }: { key: string, keyPath: string[] }) {
            const { beforeClickFn } = props;
            if (beforeClickFn && isFunction(beforeClickFn)) {
                const flag = await beforeClickFn(key);
                if (!flag) return;
            }
            emit("menuClick", key);
            isClickGo.value = true;
            menuState.selectedKeys = [key];
        }
        return {
            getInlineCollapseOptions,
            handleMenuClick,
            handleOpenChange,
            getOpenKeys,
            ...toRefs(menuState)
        }
    }
})
</script>
<style lang='less' scoped>

</style>