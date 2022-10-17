import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";

// 启动项目
async function bootstrap() {
  const app = createApp(App);

  // 挂载路由
  setupRouter(app);

  // 全局vuex
  setupStore(app);

  // 挂载vue
  app.mount("#app");
}

bootstrap();
