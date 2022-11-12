import { InjectionKey, UnwrapRef, inject } from "vue";


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