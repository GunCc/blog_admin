// windiCss 引入 会有一些默认的样式
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupPlugins } from "./plugins";
import { registerGlobComp } from "./components/registerGlobComp";
import 'ant-design-vue/dist/antd.css';
// 启动项目
async function bootstrap() {
  const app = createApp(App);

  // 挂载路由
  setupRouter(app);

  // 全局vuex
  setupStore(app);

  // setupPlugins(app);
  
  // 挂载全局组件
  registerGlobComp(app);

  // 挂载vue
  app.mount("#app");
}

bootstrap();
