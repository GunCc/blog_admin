import { withInstall } from "/@/utils"
import appLogo from "./src/AppLogo.vue"
export { useAppProviderContext } from "./src/useAppContext"

export const AppLogo = withInstall(appLogo)