<template>
    <div :class="prefixCls" :style="{ width: getCalcContentWidth }">
        <div :class="`${prefixCls}__left`">
            <slot name="left"></slot>
        </div>
        <slot></slot>
        <div :class="`${prefixCls}__right`">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name: "PageFooter",
    inheritAttrs: false,
    setup() {
        const { prefixCls } = useDesign("page-footer")
        const { getCalcContentWidth } = useMenuSetting();
        return { prefixCls, getCalcContentWidth };
    },
});
</script>
<style lang='less' scoped>

</style>