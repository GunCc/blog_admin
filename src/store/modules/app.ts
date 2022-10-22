import { ThemeEnum } from "@/enums/appEnum";

interface AppState {
  darkMode?: ThemeEnum;
  projectConfig: ProjectConfig | null;
}

const state = () =>
  <AppState>{
    darkMode: undefined,
  };

const getters = {};

const mutations = {
  SetDarkMode(state: AppState, mode: ThemeEnum): void {
    state.darkMode = mode;
  },
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
};
