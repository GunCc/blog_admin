<template>
    <Sider v-show="showClassSideBarRef">

    </Sider>

</template>

<script lang="ts" setup name="SiderWrapper">
import { Layout } from "ant-design-vue"
import { computed, unref } from "vue";
const { Sider } = Layout;



const showClassSideBarRef = computed(() => {
    return unref()
})
</script>

<style lang="scss" scoped>

</style>