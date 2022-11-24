/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-23 11:16:08
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-24 11:06:57
 * @FilePath: \blog_admin\src\store\modules\log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import projectSetting from "@/settings/projectSetting"
import dayjs from "dayjs"
import { Store } from "vuex"
import { CommonStore } from "../vuex_ts"
import { ErrorTypeEnum } from "/@/enums/exceptionEnum"
import { ErrorLogInfo } from "/@/types/store"
import { formatToDateTime } from "/@/utils/dateUtil"

export type LogState = {
    errorLogInfoList: Nullable<ErrorLogInfo[]>;
    errorLogListCount: number;

}

export const state = () => <LogState>{
    errorLogInfoList: null,
    errorLogListCount: 0
}

export const mutations = {
    addErrorLogInfo(state: LogState, error: Partial<ErrorLogInfo>) {
        const item = {
            ...error,
            time: formatToDateTime(new dayjs.Dayjs, undefined),
        };
        // @ts-ignore
        state.errorLogInfoList = [item, ...(state.errorLogInfoList || [])];
        state.errorLogListCount += 1;
    },
    addAjaxErrorInfo(state: LogState, error: any) {
        const { useErrorHandle } = projectSetting
        if (!useErrorHandle) return;
        const errInfo: Partial<ErrorLogInfo> = {
            mesaage: error.message,
            type: ErrorTypeEnum.AJAX
        };
        if (error.response) {
            const {
                config: { url = '', data: params = '', method = 'get', headers = {} } = {},
                data = {},
            } = error.response;
            errInfo.url = url;
            errInfo.name = 'Ajax Error!';
            errInfo.file = '-';
            errInfo.stack = JSON.stringify(data);
            errInfo.detail = JSON.stringify({ params, method, headers });
        }
        // console.log()
        this.addErrorLogInfo(state, errInfo);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}