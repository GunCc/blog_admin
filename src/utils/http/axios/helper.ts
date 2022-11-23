import { isObject, isString } from "../../is";


const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function joinTimestamp<T extends boolean>(
    join: boolean,
    restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
    if (!join) {
        return restful ? '' : {};
    }
    const now = new Date().getTime();
    if (restful) {
        return `?_t=${now}`;
    }
    return { _: now }
}


// 格式化请求数据（添加时间）
export function formatRequestDate(params: Recordable) {
    if (Object.prototype.toString.call(params) !== '[object Object]') {
        return
    }
    for (const key in params) {
        const format = params[key]?.format ?? null;
        if (format && typeof format === "function") {
            params[key] = params[key].format(DATE_TIME_FORMAT)
        }
        if (isString(key)) {
            const value = params[key];
            try {
                params[key] = isString(value) ? value.trim() : value;
            } catch (error: any) {
                throw new Error(error);
            }
        }
        if (isObject(params[key])) {
            formatRequestDate(params[key]);
        }
    }
}