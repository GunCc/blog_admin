import { computed } from "vue";
import { useStore } from "/@/store";

export function useRootSetting() {
    const store = useStore();
    console.log(' store.getters["AppStore/getProjectConfig"]', store.getters["AppStore/getProjectConfig"])
    const getShowLogo = computed(() => store.getters["AppStore/getProjectConfig"].showLogo)
    return {
        getShowLogo
    }
}