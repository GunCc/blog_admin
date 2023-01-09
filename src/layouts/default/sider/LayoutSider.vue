<template>
    <Sider v-show="showClassSideBarRef">
        <div class="logo" />
        <LayoutMenu></LayoutMenu>
    </Sider>

</template>

<script lang="ts" setup name="SiderWrapper">
import { Layout } from "ant-design-vue"
import { computed } from "vue";
import LayoutMenu from "../menu/index.vue"
const { Sider } = Layout;


const showClassSideBarRef = computed(() => {
    return true
})
</script>

<style lang="less" scoped>
.logo {
    height: 32px;
    margin: 16px;
    background: #834655;
}
</style>