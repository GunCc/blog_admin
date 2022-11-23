/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 14:30:27
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-20 15:37:37
 * @FilePath: \blog_admin\src\utils\http\axios\axiosTransform.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 14:30:27
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-20 15:12:21
 * @FilePath: \blog_admin\src\utils\http\axios\axiosTransform.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AxiosRequestConfig, AxiosRequestTransformer, AxiosResponse } from "axios";
import { RequestOptions, Result } from "/@/types/axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {
    // 身份验证
    authenticationScheme?: string;
    // 拦截器
    transform?: AxiosTransform;
    // 请求选项
    requestOptions?: RequestOptions;
}


// axios 转换抽象类
export abstract class AxiosTransform {
    // 处理请求前的配置
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
    // 处理响应数据
    transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
    // 处理失败结果
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
    // 请求之前拦截器
    requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig;
    // 响应之后拦截器
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
    // 请求之前的拦截器错误处理
    requestInerceptorsCatch?: (error: Error) => void;
    // 请求之后的拦截器cuowuchuli 
    responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
}