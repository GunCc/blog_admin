import type { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes";

// 白名单包含的静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });

getRouteNames(basicRoutes);
// 配置路由
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
