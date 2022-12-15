<template>
    <Sider v-show="showClassSideBarRef">
        <div class="logo" />

        <!-- <Menu mode="inline" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys"
            :style="{ height: '100%', borderRight: 0 }">
            <SubMenu key="sub1">
                <template #title>
                    <span>
                        <user-outlined />
                        subnav 1
                    </span>
                </template>
                <MenuItem key="1">option1</MenuItem>
                <MenuItem key="2">option2</MenuItem>
                <MenuItem key="3">option3</MenuItem>
                <MenuItem key="4">option4</MenuItem>
            </SubMenu>
        </Menu> -->
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