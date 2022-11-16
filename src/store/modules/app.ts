
import { ThemeEnum } from "@/enums/appEnum";
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from "/@/enums/cacheEnum";
import { darkMode } from "/@/settings/designSetting";
import { MenuSetting, ProjectConfig } from "/@/types/config";
import { VuexStore } from "/@/types/store";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
interface AppState {
  darkMode?: ThemeEnum;
  projectConfig: ProjectConfig | null;
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
  getMenuSetting(state: AppState): MenuSetting | undefined {
    return state.projectConfig?.menuSetting;
  },
  getDarkMode(state: AppState): 'string' | 'dark' | string {
    return state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
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

export default  {
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
