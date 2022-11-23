/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-21 19:26:41
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 10:17:57
 * @FilePath: \blog_admin\src\utils\auth\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicKeys, Persistent } from "../cache/persistent";
import projectSetting from "@/settings/projectSetting"
import { CacheTypeEnum, TOKEN_KEY } from "/@/enums/cacheEnum";

const { permissionCacheType } = projectSetting;

const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

// 获取token
export function getToken() {
    return getAuthCache(TOKEN_KEY)
}

// 获取权限缓存
export function getAuthCache<T>(key: BasicKeys) {
    const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
    return fn(key) as T;
}

// 修改权限缓存
export function setAuthCache(key: BasicKeys, value) {
    const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
    return fn(key, value, true);
}

// 清除权限缓存
export function clearAuthCache(immediate = true) {
    const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
    return fn(immediate)
}