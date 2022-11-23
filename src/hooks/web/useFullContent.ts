/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:04:03
 * @FilePath: \blog_admin\src\hooks\web\useFullContent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, unref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";


// 满屏内容
export const useFullContent = () => {
  const store = useStore();
  const router = useRouter();
  // 当前路由 
  const { currentRoute } = router;
  const getFullContent = computed(() => {
    const route = unref(currentRoute);
    const query = route.query;
    // query 是否包含 这个字段
    if (query && Reflect.has(query, "__full__")) {
      return true;
    }
    return store.getters['AppStore/getProjectConfig'].fullContent
  });
  return { getFullContent }
};
