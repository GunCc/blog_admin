<template>
    <div>
    </div>
</template>
<script  lang='ts'>
import { defineComponent } from 'vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name: "PageFooter",
    inheritAttrs: false,
    setip() {
        const { prefixCls } = useDesign("page-footer")
        const { getCla} = useMenuSetting();
    }
})
</script>
<style lang='less' scoped>

</style>