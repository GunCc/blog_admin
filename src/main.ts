/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 14:25:34
 * @FilePath: \blog_admin\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// windiCss 引入 会有一些默认的样式
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
import '/@/design/index.less';
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupI18n } from '/@/locales/setupI18n';

import { registerGlobComp } from "./components/registerGlobComp";
import { initAppConfigStore } from "./logics/initAppConfig";
import('ant-design-vue/es/style');

// 启动项目
async function bootstrap() {
  const app = createApp(App);

  // 初始化系统内部配置
  // initAppConfigStore();

  // 挂载路由
  setupRouter(app);

  // 全局vuex
  setupStore(app);

  // 多语言配置
  await setupI18n(app);
  // setupPlugins(app);

  // 挂载全局组件
  registerGlobComp(app);

  // 挂载vue
  app.mount("#app");
}

bootstrap();
