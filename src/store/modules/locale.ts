import { LOCALE_KEY } from "@/enums/cacheEnum";
import { localeSetting } from "@/settings/localeSetting";
import type { LocaleSetting, LocaleType } from "@/types/config";
import { createLocalStorage } from "@/utils/cache";

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  LocalInfo?: LocaleSetting;
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
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
};
