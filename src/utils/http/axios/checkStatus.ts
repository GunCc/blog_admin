/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-24 11:12:38
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-24 11:31:51
 * @FilePath: \blog_admin\src\utils\http\axios\checkStatus.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useStore } from "/@/store";
import { ErrorMessageMode } from "/@/types/axios";
import projectSetting from "@/settings/projectSetting"
import { SessionTimeoutProcessingEnum } from "/@/enums/appEnum";
import { useMessage } from "/@/hooks/web/useMessage";
import { error } from "../../log";

const { createErrorModal, createMessage } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing

// 检测状态
export function checkStatus(
    status: number,
    msg: string,
    errorMessageMode: ErrorMessageMode = 'message'
) {
    const store = useStore();
    let errMessage = '';
    switch (status) {
        // 请求信息有误
        case 400:
            errMessage = `${msg}`;
            break;
        // 用户信息失效
        case 401:
            store.commit("UserStore/SetToken", undefined)
            errMessage = msg || '401报错'
            if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
                store.commit("UserStore/SetSessionTimeout", true)
            } else {
                store.dispatch("UserStore/logout", true)
            }
            break;
        // 权限不足
        case 403:
            errMessage = "权限不足"
            break
        // 请求不存在
        case 404:
            errMessage = "请求不存在"
            break;
        case 500:
            errMessage = "内部服务器错误"
            break;
        case 501:
            errMessage = '未实现'
            break;
        case 502:
            errMessage = "错误的网关"
            break;
        case 503:
            errMessage = "服务不可用"
            break;
        case 504:
            errMessage = "网络超时"
            break;
        case 505:
            errMessage = "http版本不支持"
            break;
        default:
    }


    if (errMessage) {
        if (errorMessageMode === 'modal') {
            createErrorModal({
                title: "错误",
                content: errMessage
            })
        } else if (errorMessageMode === "message") {
            error(
                {
                    content: errMessage,
                    key: `global_error_message_status_${status}`
                }
            )
        }
    }
}