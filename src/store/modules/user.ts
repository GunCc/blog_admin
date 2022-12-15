/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-21 19:21:43
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 10:35:27
 * @FilePath: \blog_admin\src\store\modules\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-21 19:21:43
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-21 19:31:18
 * @FilePath: \blog_admin\src\store\modules\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ActionContext } from "vuex";
import { RootState } from "..";
import { GetUserInfoModel, LoginModel } from "/@/api/v1/sys/model/userModal";
import { loginApi } from "/@/api/v1/sys/user";
import { TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cacheEnum";
import { PageEnum } from "/@/enums/pageEnum";
import { router } from "/@/router";
import { ErrorMessageMode } from "/@/types/axios";
import { UserInfo } from "/@/types/store";
import { getAuthCache, setAuthCache } from "/@/utils/auth";

export type UserState = {
    // Token
    token?: string,
    // Session 是否过期
    sessionTimeout?: boolean,
    // 用户信息
    userInfo: Nullable<UserInfo>,
    // 最后修改时间
    lastUpdateTime: number,

}

const state = () =>
    <UserState>{
        token: undefined,
        sessionTimeout: false,
        lastUpdateTime: 0
    };

const getters = {
    getToken(state: UserState) {
        return state.token || getAuthCache<string>(TOKEN_KEY)
    }
};

const mutations = {
    SetToken(state: UserState, data: string | undefined) {
        state.token = data ? data : '';
        setAuthCache(TOKEN_KEY, data)
    },
    SetSessionTimeout(state: UserState, flag: boolean) {
        state.sessionTimeout = flag;
    },
    SetUserInfo(state: UserState, data: UserInfo) {
        state.userInfo = data;
        state.lastUpdateTime = new Date().getTime();
        setAuthCache(USER_INFO_KEY, data)
    },
};

const actions = {
    async logout({ commit, getters }: ActionContext<UserState, RootState>, goLogin: boolean) {
        if (getters.getToken) {
            try {
                // await doLogout();
            } catch (error) {
                console.log("token注销失败")
            }
        }
        commit("SetToken", undefined)
        commit("SetSessionTimeout", false)
        commit("SetUserInfo", null)
        goLogin && router.push(PageEnum.BASE_LOGIN)
    },
    async login({ commit, getters, dispatch }: ActionContext<UserState, RootState>, loginForm: LoginModel & { goHome?: boolean; mode?: ErrorMessageMode }): Promise<GetUserInfoModel | null> {
        try {
            debugger
            const { goHome = true, mode, ...loginParams } = loginForm;
            const data = await loginApi(loginParams, mode)
            const { token, user } = data;
            commit("SetToken", token);
            dispatch("afterLoginAction", goHome)
            return user as GetUserInfoModel
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // 登陆后的请求
    async afterLoginAction({ getters, state, dispatch, commit }: ActionContext<UserState, RootState>, goHome?: boolean): Promise<GetUserInfoModel | null> {
        try {
            console.log(getters.getToken,getters)
            if (!getters.getToken) return null;
            // await dispatch("getUserInfoAction");
            const sessionTimeout = state.sessionTimeout;
            if (sessionTimeout) {
                commit("SetSessionTimeout", false)
            } else {
            }
            goHome && (await router.replace(PageEnum.BASE_HOME))
            debugger
            return null;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // 获取用户信息
    async getUserInfoAction() {
        // return Promise(() => {

        // })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

