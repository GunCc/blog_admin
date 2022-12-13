import { App } from "vue";
import * as Icons from "@ant-design/icons-vue"

export const RegisterAntdIcon = (app: App) => {
    const icons: any = Icons
    for (const i in icons) {
        app.component(i, icons[i])
    }
}