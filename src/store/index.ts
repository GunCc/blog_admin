import { createStore, Store, useStore as baseUseStore } from "vuex";
import type { App, InjectionKey } from "vue";
import AppStore, { AppState } from "./modules/app";
import LocaleStore, { LocaleState } from "./modules/locale";
import UserStore, { UserState } from "./modules/user";
import { CommonStore } from "./vuex_ts";

// 定义根级 state 类型
export type RootState = {
  AppState: AppState,
  LocaleState: LocaleState,
  UserState: UserState,
}

// 模块聚合
export const modules = {
  AppStore,
  LocaleStore,
  UserStore,
}


export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules
}) as CommonStore


// 调用useStore
export function useStore(): CommonStore {
  // @ts-ignore
  return baseUseStore(key)
}

// 调用vuex
export function setupStore(app: App<Element>) {
  app.use(store);
}
