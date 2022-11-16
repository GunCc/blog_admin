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
  initAppConfigStore();

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
