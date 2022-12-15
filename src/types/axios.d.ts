/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-20 14:59:50
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-21 14:19:25
 * @FilePath: \blog_admin\src\types\axios.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
    // 合并Params参数到URl中
    joinParamsToUrl?: boolean;
    // 格式化时间
    formatDate?: boolean;
    // 是否处理请求结果
    isTransformResponse?: boolean;
    // 是否返回本机响应标头
    isReturnNativeResponse?: boolean;
    // 是否添加前缀
    joinPrefix?: boolean;
    // 请求路径
    apiUrl?: string;
    // 请求凭借路径
    urlPrefix?: string;
    // 错误消息类型
    errorMessageMode?: ErrorMessageMode;
    // 是否添加时间戳
    joinTime?: boolean;
    // 是否忽略token
    ignoreCancelToken?: boolean;
    // 是否将Token添加到头部
    withToken?: boolean;
    // 请求重试机制
    retryRequest?: RetryRequest;
}

export interface RetryRequest {
    // 是否开启重试
    isOpenRetry: boolean;
    // 次数
    count: number;
    // 等待时间
    waitTime: number;
}


// 响应结果
export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    msg: string;
    Data: T
}

// multipart/form-data：文件上床
export interface UploadFileParams {
    // 其他参数
    data?: Recordable;
    name?: string;
    file: File | Blob;
    filename?: name;
    [key: string]: any;
}