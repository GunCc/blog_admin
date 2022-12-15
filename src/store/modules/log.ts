
import projectSetting from "@/settings/projectSetting"
import dayjs from "dayjs"
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