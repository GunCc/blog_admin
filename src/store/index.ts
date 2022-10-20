import { createStore } from "vuex";
import type { App } from "vue";
import AppStore from "./modules/app";
import LocaleStore from "./modules/locale";

// 调用vuex
export function setupStore(app: App<Element>) {
  app.use(
    createStore({
      modules: {
        AppStore,
        LocaleStore,
      },
    })
  );
}
