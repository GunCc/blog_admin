import { InjectionKey, UnwrapRef, inject, reactive, readonly as defineReadonly, provide } from "vue";


export interface CreateContextOptions {
    readonly?: boolean;
    createProvider?: boolean;
    native?: boolean
}

type ShallowUmwrap<T> = {
    [P in keyof T]: UnwrapRef<T[P]>;
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(
    key: InjectionKey<T> = Symbol(),
    defaultValue?: any,
): ShallowUmwrap<T> {
    return inject(key, defaultValue || {})
}


export function createContext<T>(
    context: any,
    key: InjectionKey<T> = Symbol(),
    options: CreateContextOptions = {}
) {
    const { readonly = true, createProvider = false, native = false } = options
    const state = reactive(context);
    const provideData = readonly ? defineReadonly(state) : state;
    !createProvider && provide(key, native ? context : provideData);
    return (state)
}