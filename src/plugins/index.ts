import type { App } from "vue";

import { setupElement } from "./elementPlus";

export function setupPlugins(app: App<Element>) {
  setupElement(app);
}
