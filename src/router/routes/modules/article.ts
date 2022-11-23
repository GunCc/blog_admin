/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-17 17:59:52
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 18:01:06
 * @FilePath: \blog_admin\src\router\routes\modules\article.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 面板路由

import { LAYOUT } from "@/router/constant";
import { AppRouteModule } from "@/router/types";

const article: AppRouteModule = {
    path: "/article",
    name: "Article",
    component: LAYOUT,
    redirect: "/article/type",
    meta: {
        orderNo: 10,
        title: "文章管理",
        icon: "ion",
    },
    children: [
        {
            path: "type",
            name: "Type",
            component: () => import("@/views/article/type/Type.vue"),
            meta: {
                title: "文章类别",
            },
        },
    ],
};

export default article;
