import { ThemeEnum } from "@/enums/appEnum";

interface AppState {
  darkMode?: ThemeEnum;
}

const state = () =>
  <AppState>{
    darkMode: undefined,
  };

const mutations = {
  SetDarkMode(state: AppState, mode: ThemeEnum): void {
    state.darkMode = mode;
  },
};

export default {
  namespace: true,
  state,
  mutations,
};
