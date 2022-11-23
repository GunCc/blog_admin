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
import { TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cacheEnum";
import { PageEnum } from "/@/enums/pageEnum";
import { router } from "/@/router";
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
    }
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

