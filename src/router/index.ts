import { createRouter, createWebHistory } from "vue-router";

// 配置路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/sys/index.vue"),
    },
  ],
});


export default router