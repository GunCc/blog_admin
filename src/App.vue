<template>
    <router-view />
</template>

<script lang="ts" setup>
// 国际化
import { useTitle } from './hooks/web/useTitle';

// 标题设置
useTitle()
</script>
