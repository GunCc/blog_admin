import { toggleClass } from "./utils";

/**
 * @desc 修改项目弱色模式状态
 * @param gary 
 */
export function updateColorWeak(colorWeak: boolean) {
    toggleClass(colorWeak, 'color-weak', document.documentElement);
}