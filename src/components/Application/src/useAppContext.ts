import { InjectionKey, Ref } from "vue"
import { useContext } from "/@/hooks/core/useContext"

export interface AppProviderContextProps {
    prefixCls: Ref<string>,
    isMobile: Ref<boolean>,
}

const key: InjectionKey<AppProviderContextProps> = Symbol();


export function useAppProviderContext() {
    return useContext<AppProviderContextProps>(key);
}