/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-23 10:36:15
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:00:48
 * @FilePath: \blog_admin\src\store\vuex_ts.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// vuex 代码提示

import { CommitOptions, DispatchOptions, Store } from "vuex";
import { modules, RootState } from ".";


// 获取 modules 的类型
type Modules = typeof modules;
// 获取所有模块下的 Mutations
type GetMutation<T> = T extends { mutations: infer G } ? G : never;
type GetMutations<T> = {
    [K in keyof T]: GetMutation<T[K]>
}

type mutationsObj = GetMutations<Modules>;


// 获取所有模块下的 actions
type GetAction<T> = T extends { actions: infer G } ? G : never;
type GetActions<T> = {
    [K in keyof T]: GetAction<T[K]>
}

type actionsObj = GetActions<Modules>


//  获取getters
type GetGetter<T> = T extends { getters: infer G } ? G : never;
type GetGetters<T> = {
    [K in keyof T]: GetGetter<T[K]>
}
type getterObj = GetGetters<Modules>

// 添加前缀
type AddPrefix<prefix, keys> = `${prefix & string}/${keys & string}`
type GetKey<T, K> = AddPrefix<K, keyof T>
type GetKeys<T> = {
    [K in keyof T]: GetKey<T[K], K>
}[keyof T];
type ss = GetKeys<mutationsObj>

// 获取当前
type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]
type GetMethod<T> = {
    [K in GetKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown;
}


type GetMutationsFunc = GetMethod<mutationsObj>
type GetActionsFunc = GetMethod<actionsObj>
type GetGettersFunc = GetMethod<getterObj>

export type CommonStore = Omit<Store<RootState>, 'commit' | 'getters' | 'dispatch'> & {
    commit<K extends keyof GetMutationsFunc, P extends Parameters<GetMutationsFunc[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<GetMutationsFunc[K]>
} & {
    getters: {
        [K in keyof GetGettersFunc]: ReturnType<GetGettersFunc[K]>
    }
} & {
    dispatch<K extends keyof GetActionsFunc>(
        key: K,
        payload?: Parameters<GetActionsFunc[K]>[1],
        options?: DispatchOptions
    ): ReturnType<GetActionsFunc[K]>
}