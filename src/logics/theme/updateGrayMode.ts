import { toggleClass } from "./utils";

/**
 * @desc 修改项目灰色模式状态
 * @param gary 
 */
export function updateGrayMode(gary: boolean) {
    toggleClass(gary, 'gray-mode', document.documentElement);
}