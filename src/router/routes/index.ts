import { PageEnum } from "@/enums/pageEnum";
import { AppRouteModule, AppRouteRecordRaw } from "../types";

// 匹配路由模块文件名
// const modules = import.meta.globEager("./modules/**/*.ts");
const modules = import.meta.glob("./modules/**/*.ts", { eager: true });
const routeModuleList: AppRouteModule[] = [];
Object.keys(modules).forEach((key) => {
  // @ts-ignore
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 异步路由
export const asyncRoutes = [...routeModuleList];

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const basicRoutes = [LoginRoute, ...asyncRoutes];
