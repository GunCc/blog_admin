/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 01:01:38
 * @FilePath: \blog_admin\src\store\modules\locale.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LOCALE_KEY } from "@/enums/cacheEnum";
import { localeSetting } from "@/settings/localeSetting";
import type { LocaleSetting, LocaleType } from "@/types/config";
import { createLocalStorage } from "@/utils/cache";

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  LocalInfo: LocaleSetting;
}
const state = () =>
  <LocaleState>{
    LocalInfo: lsLocaleSetting,
  };

const getters = {
  getShowPicker(state: LocaleState): boolean {
    return !!state.LocalInfo?.showPicker;
  },
  getLocale(state: LocaleState): LocaleType {
    return state.LocalInfo?.locale ?? "zh_CN";
  },
};
const mutations = {
  SetDarkMode(state: LocaleState, value: LocaleSetting): void {
    state.LocalInfo = {
      ...state.LocalInfo,
      ...value,
    };
    ls.set(LOCALE_KEY, state.LocalInfo);
  },
  SetLocaleInfo(state: LocaleState, info: Partial<LocaleSetting>) {
    state.LocalInfo = { ...state.LocalInfo, ...info };
    ls.set(LOCALE_KEY, state.LocalInfo)
  },
  initLocale(state: LocaleState) {
    state.LocalInfo = {
      ...localeSetting,
      ...state.LocalInfo
    }
    ls.set(LOCALE_KEY, state.LocalInfo)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
