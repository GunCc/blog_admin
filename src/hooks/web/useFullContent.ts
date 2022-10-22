import { computed, unref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
    return store
  });
};