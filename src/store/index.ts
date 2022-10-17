import { createStore } from "vuex";
import type { App } from "vue";
import AppStore from "./modules/app";

// 调用vuex
export function setupStore(app: App<Element>) {
  app.use(
    createStore({
      modules: {
        AppStore,
      },
    })
  );
}
