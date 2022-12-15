import { computed } from "vue";
import { useStore } from "/@/store";

export function useRootSetting() {
    const store = useStore();
    const getShowLogo = computed(() => store.getters["AppStore/getProjectConfig"].showLogo)
    return {
        getShowLogo
    }
}