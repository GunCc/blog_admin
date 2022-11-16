import { createStore, ModuleTree, Store } from "vuex";
import type { App } from "vue";
import AppStore from "./modules/app";
import LocaleStore from "./modules/locale";

export function create() {
  return createStore({
    modules: {
      AppStore,
      LocaleStore,
    },
  })
}

// 调用vuex
export function setupStore(app: App<Element>) {
  app.use(create());
}
