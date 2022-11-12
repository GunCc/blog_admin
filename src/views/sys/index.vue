<template>
    <div>
        当前vuex：{{store.state.AppStore.darkMode}}
    </div>
</template>

<script setup lang="ts" >
import { useStore } from "vuex"
const store = useStore();
console.log(store)
// console.log(store.commit)

store.commit("SetDarkMode","dark")
</script>

<style lang="less" scoped>

</style>