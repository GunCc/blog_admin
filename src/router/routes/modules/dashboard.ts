// 面板路由

import { LAYOUT } from "@/router/constant";
import { AppRouteModule } from "@/router/types";

const dashboard: AppRouteModule = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/analysis",
  meta: {
    orderNo: 10,
    title: "面板",
    icon: "ion",
  },
  children: [
    {
      path: "analysis",
      name: "Analysis",
      component: () => import("@/views/dashboard/analysis/index.vue"),
      meta: {
        title: "分析报告",
      },
    },
  ],
};

export default dashboard;
