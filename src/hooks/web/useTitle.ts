/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 14:27:42
 * @FilePath: \blog_admin\src\hooks\web\useTitle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  console.log(store.getters)
  watch(
    [() => currentRoute.value.path, () => store.getters['LocaleStore/getLocale']],
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
