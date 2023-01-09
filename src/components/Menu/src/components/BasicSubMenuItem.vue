<template>
    <div>
    </div>
</template>
<script  lang='ts'>
import { defineComponent } from 'vue';
import { Menu } from "ant-design-vue"
import BasicMenuItem from "./BasicMenuItem.vue";
import MenuItemContent from "./MenuItemContent.vue"
import { itemProps } from '../props';
export default defineComponent({
    name: "BasicSubMenuItem",
    isSubMenu: true,
    components: {
        BasicMenuItem,
        SubMenu: Menu.SubMenu,
        MenuItemContent
    },
    props: itemProps,
    setup(props) {

    }
})
</script>
<style lang='less' scoped>

</style>