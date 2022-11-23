import axios, { AxiosRequestConfig, Canceler } from "axios";

let pendingMap = new Map<string, Canceler>();
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join("&")

export class AxiosCanceler {
    // 添加请求
    addPending(config: AxiosRequestConfig) {
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
            if (!pendingMap.has(url)) {
                // 如果没有这个请求，添加景区
                pendingMap.set(url, cancel)
            }
        })
    }

    // 删除请求
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);
        // 如果存在未决的当前请求标识符，需要取消并删除当前请求
        if (pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            cancel && cancel(url);
            pendingMap.delete(url)
        }
    }
}