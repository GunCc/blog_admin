/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 15:15:12
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:04:29
 * @FilePath: \blog_admin\src\utils\http\axios\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 15:15:12
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-22 22:39:37
 * @FilePath: \blog_admin\src\utils\http\axios\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 15:15:12
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-22 22:09:50
 * @FilePath: \blog_admin\src\utils\http\axios\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 15:15:12
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-22 22:09:03
 * @FilePath: \blog_admin\src\utils\http\axios\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { clone } from "vue-types/dist/utils";
import { deepMerge, setObjToUrlParams } from "../..";
import { VAxios } from "./axios";
import { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { ContentTypeEnum, RequestEnum, ResultEnum } from "/@/enums/httpEnum";
import { Result, RequestOptions } from "@/types/axios"
import { useI18n } from "vue-i18n";
import { useStore } from "/@/store";
import { useMessage } from "/@/hooks/web/useMessage";
import { isString } from "../../is";
import { formatRequestDate, joinTimestamp } from "./helper";
import { getToken } from "../../auth";

const { createErrorModal, createMessage } = useMessage();

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        deepMerge(
            // 默认参数
            {
                authenticationScheme: '',
                timeout: 10 * 1000,
                headers: { 'Content-Type': ContentTypeEnum.JSON },
                transform: clone(transform)
            },
            opt || {},
        )
    )

}

// 数据处理方式
const transform: AxiosTransform = {
    // 处理响应数据，如果数据不是预期格式，可以直接抛出错误
    transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const { t } = useI18n();
        const { isReturnNativeResponse, isTransformResponse } = options;
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        if (isReturnNativeResponse) {
            return res;
        }

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformResponse) {
            return res.data;
        }

        const { data } = res;
        if (!data) {
            throw new Error("HTTP 请求没有返回数据")
        }

        const { code, result, message } = data;

        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
        if (hasSuccess) {
            return result
        }
        // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
        let timeoutMsg = '';
        switch (code) {
            case ResultEnum.TIMEOUT:
                timeoutMsg = '请求超时啦';
                const store = useStore();
                store.commit("UserStore/SetToken", undefined);
                store.dispatch("UserStore/logout", true)
                break;
            default:
                if (message) {
                    timeoutMsg = message
                }
        }
        // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
        if (options.errorMessageMode === 'modal') {
            createErrorModal({ title: "提示", content: timeoutMsg });
        } else if (options.errorMessageMode === 'message') {
            createMessage.error(timeoutMsg)
        }

        throw new Error(timeoutMsg || "Api 响应失败")
    },
    // 请求之前处理config
    beforeRequestHook: (config, options) => {
        const { apiUrl,
            joinPrefix,
            joinParamsToUrl,
            formatDate,
            joinTime = true,
            urlPrefix
        } = options
        if (joinPrefix) {
            config.url = `${urlPrefix}${config.url}`
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`
        }
        const params = config.params || {};
        const data = config.data || false;
        formatDate && data && !isString(data) && formatRequestDate(data);
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                // 给get请求加上时间戳参数，避免从缓存中拿数据
                config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
            } else {
                config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
                config.params = undefined
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
                    config.data = data;
                    config.params = params
                } else {
                    // 非GET请求如果没有提供data，则将params视为data
                    config.data = params;
                    config.params = undefined;
                }
            }
            if (joinParamsToUrl) {
                config.url = setObjToUrlParams(
                    config.url as string,
                    Object.assign({}, config.params, config.data)
                )
            } else {
                // 兼容restful 风格
                config.url = config.url + params;
                config.params + undefined
            }
        }
        return config;
    },
    requestInterceptors: (config, options) => {
        // 请求前处理token
        const token = getToken();
        if (token && (config as Recordable)?.requestOptions?.widthToken !== false) {
            // jwt token
            (config as Recordable).headers.Authorization = options.authenticationScheme
                ? `${options.authenticationScheme} ${token}` : token;
        }
        return config
    },
    // 响应拦截器处理
    responseInterceptors: (res: AxiosResponse<any>) => {
        return res;
    },
    // 响应错误拦截
    responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {

        const store = useStore();
    },

}



export const http = createAxios();