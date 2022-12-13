import type { App } from "vue";
import { RegisterAntdIcon } from "./Icon";
import { Layout, Input } from "ant-design-vue";


export function registerGlobComp(app: App) {
  app.use(Layout).use(Input);
  RegisterAntdIcon(app)
}
