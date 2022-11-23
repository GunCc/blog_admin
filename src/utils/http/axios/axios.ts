/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 14:28:17
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-21 11:59:32
 * @FilePath: \blog_admin\src\utils\http\axios\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 14:28:17
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-21 11:21:03
 * @FilePath: \blog_admin\src\utils\http\axios\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { queuePostFlushCb } from "vue";
import { isFunction } from "../../is";
import { AxiosCanceler } from "./axiosCanceler";
import { CreateAxiosOptions } from "./axiosTransform";
import { ContentTypeEnum, RequestEnum } from "/@/enums/httpEnum";
import { RequestOptions, Result, UploadFileParams } from "/@/types/axios";
import { qs } from 'qs'
import { cloneDeep } from "lodash-es"
export class VAxios {
    private axiosInstance: AxiosInstance;
    private readonly options: CreateAxiosOptions;
    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        // 拦截器配置
        this.setupInterceptors()
    }

    private getTransform() {
        const { transform } = this.options
        return transform
    }

    private setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            requestInerceptorsCatch,
            responseInterceptors,
            responseInterceptorsCatch
        } = transform

        const axiosCanceler = new AxiosCanceler();

        // 设置请求拦截器
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 如果取消重复请求已打开，则禁止取消重复请求
            // @ts-ignore
            const { ignoreCancelToken } = config.requestOptions;
            const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;
            !ignoreCancel && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options)
            }
            return config
        }, undefined);

        // 请求错误拦截
        requestInterceptors && isFunction(requestInerceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInerceptorsCatch)

        // 响应结果拦截器
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(requestInterceptors)) {
                res = responseInterceptors(res)
            }
            return res;
        }, undefined)

        // 响应错误拦截器
        responseInterceptorsCatch && isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, (error) => {
                // @ts-ignore
                return responseInterceptorsCatch(this.axiosInstance, error);
            })
    }

    // 上传图片
    uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
        const formData = new window.FormData();
        const customFilename = params.name || 'file';

        if (params.filename) {
            formData.append(customFilename, params.file, params.filename);
        } else {
            formData.append(customFilename, params.file)
        }

        if (params.data) [
            Object.keys(params.data).forEach(key => {
                const value = params.data![key];
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        formData.append(`${key}[]`, item)
                    })
                    return
                }
                formData.append(key, params.data![key]);
            })
        ]
        return this.axiosInstance.request<T>({
            ...config,
            method: "POST",
            data: formData,
            headers: {
                'Content-type': ContentTypeEnum.FORM_DATA,
                // @ts-ignore,
                ignoreCancelToken: true
            }
        })
    }

    // 支持 form-data
    supportFormData(config: AxiosRequestConfig) {
        const headers = config.headers || this.options.headers;
        const contentType = headers?.['Content-type'] || headers?.['content-type']
        if (contentType !== ContentTypeEnum.FORM_URLENCODED || !Reflect.has(config, 'data') || config.method?.toUpperCase() === RequestEnum.GET) {
            return config;
        }
        return {
            ...config,
            data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
        }
    }


    get<T = any>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'GET' }, options);
    }
    post<T = any>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'POST' }, options);
    }
    put<T = any>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'PUT' }, options);
    }
    delete<T = any>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
        return this.request({ ...config, method: 'DELETE' }, options);
    }

    request<T>(config: AxiosRequestConfig, options: RequestOptions): Promise<T> {
        let conf: CreateAxiosOptions = cloneDeep(config);
        const transform = this.getTransform();

        const { requestOptions } = this.options;

        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt)
        }
        conf.requestOptions = opt;

        conf = this.supportFormData(conf)

        return new Promise((resolve, reject) => {
            this.axiosInstance.request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    if (transformResponseHook && isFunction(transformResponseHook)) {
                        try {
                            const ret = transformResponseHook(res, opt);
                            resolve(ret)
                        } catch (error) {
                            reject(error || new Error('request error!'))
                        }
                        return;
                    }
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e, opt));
                        return;
                    }
                    if (axios.isAxiosError(e)) {

                    }
                    reject(e)
                })
        })
    }
}