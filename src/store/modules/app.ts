
import { ThemeEnum } from "@/enums/appEnum";
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import { darkMode } from "/@/settings/designSetting";
import { HeaderSetting, MenuSetting, ProjectConfig } from "/@/types/config";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
export type AppState = {
  darkMode?: ThemeEnum;
  projectConfig: ProjectConfig;
}

const state = () =>
  <AppState>{
    darkMode: undefined,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  };

const getters = {
  getProjectConfig(state: AppState): ProjectConfig {
    return state.projectConfig || ({} as ProjectConfig);
  },
  getMenuSetting(state: AppState): MenuSetting {
    return state.projectConfig.menuSetting;
  },
  getDarkMode(state: AppState): 'string' | 'dark' | string {
    return state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
  },
  getHeaderSetting(state: AppState): HeaderSetting | undefined {
    return state.projectConfig?.headerSetting
  }
};

const mutations = {
  SetDarkMode(state: AppState, mode: ThemeEnum): void {
    state.darkMode = mode;
  },
  SetProjectConfig(state: AppState, config: DeepPartial<ProjectConfig>): void {
    state.projectConfig = deepMerge(state.projectConfig || {}, config);
    Persistent.setLocal(PROJ_CFG_KEY, state.projectConfig)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};

// let AppStore: VuexStore<> = {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
// };
// export default AppStore
