import { useAppProviderContext } from "@/components/Application"

// 使用自己定义的样式
export function useDesign(scope: string) {
    const values = useAppProviderContext();

    return {
        prefixCls: `${values.prefixCls || 'mango'}-${scope}`,
        prefixVar: values.prefixCls
    }
}