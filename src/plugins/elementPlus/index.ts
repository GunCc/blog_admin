// 引入样式
import type { App } from "vue";
import { ElButton } from "element-plus";

const components = [ElButton];

/**
 * @author 张梓康
 */

export function setupElement(app: App<Element>) {
  components.forEach((element: any) => {
    app.use(element.name, element);
  });
}
