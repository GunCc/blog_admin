<template>
    <layout style="min-height:100vh">
        <!-- 是否填满 -->
        <layout-header fixed v-if="false"></layout-header>
        <layout>
            <!--手机端 -->
            <layout-sider>

            </layout-sider>
            <layout>
                <layout-multiple-header></layout-multiple-header>
                <layout-main></layout-main>
                <layout-footer></layout-footer>
            </layout>
        </layout>
    </layout>
</template>

<script lang="ts" setup>
import { Layout } from "ant-design-vue"
import LayoutSider from "./sider/index.vue"
import LayoutHeader from "./header/index.vue"
import LayoutMultipleHeader from "./header/MultipleHeader.vue"
import LayoutFooter from "./footer/index.vue"
import LayoutMain from "./main/index.vue"


</script>

<style lang="scss" scoped>

</style>