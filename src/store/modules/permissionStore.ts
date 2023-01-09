import { Menu } from "/@/router/types";

export type PermissionState = {
    // 权限代码
    permCodeList: string[] | number[],
    // 路由是否动态添加
    isDynamicAddedRoute: boolean,
    // 触发菜单更新
    lastBuildMenuTime: number,
    // 后台菜单列表
    backMenuList: Menu[];
    // 菜单列表
    frontMenuList: Menu[];
}

const state = () => <PermissionState>{
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
}

const getters = {
    getPermCodeList(state: PermissionState): string[] | number[] {
        return state.permCodeList
    },
    getBackMenuList(state: PermissionState): Menu[] {
        return state.backMenuList
    },
    getFrontMenuList(state: PermissionState): Menu[] {
        return state.frontMenuList
    },
    getLastBuildMenuTime(state: PermissionState): number {
        return state.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(state: PermissionState): boolean {
        return state.isDynamicAddedRoute
    }
}

export default {
    namespaced: true,
    state,
    getters
}