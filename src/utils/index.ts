import { App, Plugin, unref } from "vue";
import { isObject } from "./is";


/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}


// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

/**
 * @desc 安装组件
 * @param component 组件名
 * @param alias 别名
 */
export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component
        }
    };
    return component as T & Plugin
}

// 获取动态props
export function getDynamicProps<T, U>(props: T): Partial<U> {
    const ret: Recordable = {};
    Object.keys(props).map(key => {
        ret[key] = unref((props as Recordable)[key]);
    })
    return ret as Partial<U>
}