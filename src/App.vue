<template>
    <el-config-provider>
        <!-- 首页1
        <button class="bg-[hsl(211.7,81.9%,69.6%)]">
            btn
        </button> -->
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>
// 国际化
import { ElConfigProvider } from 'element-plus'
import { useTitle } from './hooks/web/useTitle';

// 标题设置
useTitle()
</script>
