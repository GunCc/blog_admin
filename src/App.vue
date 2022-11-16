<template>
    <router-view />
</template>

<script lang="ts" setup>
// 国际化
import { useFullContent } from './hooks/web/useFullContent';
import { useTitle } from './hooks/web/useTitle';
useFullContent();
// 标题设置
useTitle()
</script>
