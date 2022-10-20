import { useRouter } from "vue-router";
import { unref, watch } from "vue";
import { useStore } from "vuex";
import { REDIRECT_NAME } from "@/router/constant";
import { useGlobSetting } from "@/settings";
// vue封装的一些函数
import { useTitle as usePageTitle } from "@vueuse/core";
// 设置标题
export function useTitle() {
  const { title } = useGlobSetting();
  // 获取当前路由
  const { currentRoute } = useRouter();

  const store = useStore();
  const pageTitle = usePageTitle();
  watch(
    [() => currentRoute.value.path, () => store.getters.getLocale],
    () => {
      const route = unref(currentRoute);

      // 如果是重定向直接返回
      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = route?.meta?.title as string;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true }
  );
}
