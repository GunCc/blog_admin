import { useWindowSize } from "@vueuse/core";
import { ComputedRef, isRef, nextTick, ref, Ref, unref, watch } from "vue";
import { isNumber, isString } from "windicss/utils";
import { onMountedOrActivated } from "../core/onMountedOrActivated";
import { useWindowSizeFn } from "../event/useWindowSizeFn";
import { useLayoutHeight } from "/@/layouts/default/content/useContentViewHeight";
import { getViewportOffset } from "/@/utils/domUtils";

export interface CompensationHeight {
    // 使用Layout Footer 高度作为判断高度的条件
    useLayoutFooter: boolean;
    // refs HEMLElement
    elements?: Ref[]
}

type Upward = number | string | null | undefined;

/**
 * 动态计算内容高度，根据锚点dom最下坐标到屏幕最下坐标，根据传入dom的高度、padding、margin等值进行动态计算
 * 最终获取合适的内容高度
 *
 * @param flag 用于开启计算的响应式标识
 * @param anchorRef 锚点组件 Ref<ElRef | ComponentRef>
 * @param subtractHeightRefs 待减去高度的组件列表 Ref<ElRef | ComponentRef>
 * @param substractSpaceRefs 待减去空闲空间(margins/paddings)的组件列表 Ref<ElRef | ComponentRef>
 * @param offsetHeightRef 计算偏移的响应式高度，计算高度时将直接减去此值
 * @param upwardSpace 向上递归减去空闲空间的 层级 或 直到指定class为止 数值为2代表向上递归两次|数值为ant-layout表示向上递归直到碰见.ant-layout为止
 * @returns 响应式高度
 */
export function useContentHeight(
    flag: ComputedRef<Boolean>,
    anchorRef: Ref,
    subtractHeightRefs: Ref[],
    substractSpaceRefs: Ref[],
    upwardSpace: Ref<Upward> | ComputedRef<Upward> | Upward = 0,
    offsetHeightRef: Ref<number> = ref(0),
) {
    const contentHeight: Ref<Nullable<number>> = ref(null);
    const { footerHeightRef: layoutFooterHeightRef } = useLayoutHeight()
    let compensationHeight: CompensationHeight = {
        useLayoutFooter: true
    }

    const setCompensation = (params: CompensationHeight) => {
        compensationHeight = params
    }

    function redoHeight() {
        nextTick(() => {
        })
    }

    function getEl(element: any): Nullable<HTMLDivElement> {
        if (element == null) {
            return null;
        }
        return (element instanceof HTMLDivElement ? element : element.$el) as HTMLDivElement;
    }

    function calcSubtractSpace(element: Element | null | undefined, direction: 'all' | 'top' | 'bottom' = 'all'): number {
        function numberPx(px: string) {
            return Number(px.replace(/[^\d]/g, ''))
        }

        let subtractHeight = 0;
        const ZERO_PX = '0px';
        if (element) {
            // 获取样式
            const cssStyle = getComputedStyle(element)
            const marginTop = numberPx(cssStyle?.marginTop ?? ZERO_PX)
            const marginBottom = numberPx(cssStyle?.marginBottom ?? ZERO_PX);
            const paddingTop = numberPx(cssStyle.paddingTop ?? ZERO_PX);
            const paddingBottom = numberPx(cssStyle.paddingBottom ?? ZERO_PX);
            if (direction === "all") {
                subtractHeight += marginTop;
                subtractHeight += marginBottom;
                subtractHeight += paddingTop;
                subtractHeight += paddingBottom;
            } else if (direction === "top") {
                subtractHeight += marginTop;
                subtractHeight += marginBottom
            } else {
                subtractHeight += marginBottom;
                subtractHeight += paddingBottom
            }
        }
        return subtractHeight
    }

    async function calcContentHeight() {
        if (!flag.value) {
            return;
        }
        await nextTick();
        const anchorEl = getEl(unref(anchorRef))
        if (!anchorEl) {
            return;
        }
        const { bottomIncludeBody } = getViewportOffset(anchorEl)

        let substractHeight = 0;

        subtractHeightRefs.forEach((item) => {
            substractHeight += getEl(unref(item))?.offsetHeight ?? 0;
        })
        // 获取减去的高度 margins / paddings
        let substractSpaceHeight = calcSubtractSpace(anchorEl) ?? 0;
        substractSpaceRefs.forEach((item) => {
            substractHeight += calcSubtractSpace(getEl(unref(item)));
        });

        // 向上空间
        let upwardSpaceHeight = 0;
        function upward(element: Element | null, upwardLvlOrClass: number | string | null | undefined) {
            if (element && upwardLvlOrClass) {
                const parent = element.parentElement;
                if (parent) {
                    if (isString(upwardLvlOrClass)) {
                        if (!parent.classList.contains(upwardLvlOrClass)) {
                            upwardSpaceHeight += calcSubtractSpace(parent, "bottom");
                            upward(parent, upwardLvlOrClass)
                        } else {
                            upwardSpaceHeight += calcSubtractSpace(parent, "bottom")
                        }
                        // @ts-ignore
                    } else if (isNumber(upwardLvlOrClass)) {
                        if (upwardLvlOrClass > 0) {
                            upwardSpaceHeight += calcSubtractSpace(parent, "bottom");
                            upward(parent, --upwardLvlOrClass)
                        }
                    }
                }
            }
        }
        if (isRef(upwardSpace)) {
            upward(anchorEl, unref(upwardSpace));
        } else {
            upward(anchorEl, upwardSpace)
        }

        let height =
            bottomIncludeBody - unref(layoutFooterHeightRef) - unref(offsetHeightRef) - substractHeight - upwardSpaceHeight;


        const calcCompensationHeight = () => {
            compensationHeight.elements?.forEach(item => {
                height += getEl(unref(item))?.offsetHeight ?? 0
            })
        }
        if (compensationHeight.useLayoutFooter && unref(layoutFooterHeightRef)) {
            calcCompensationHeight();
        } else {
            calcCompensationHeight();
        }
        contentHeight.value = height;
    }

    onMountedOrActivated(() => {
        nextTick(() => {
            calcContentHeight();
        })
    });
    useWindowSizeFn(() => {
        nextTick(() => {
            calcContentHeight();
        })
    }, 50,
        { immediate: true })
    watch(() => [layoutFooterHeightRef.value], () => {
        calcContentHeight();
    }, {
        flush: 'post',
        immediate: true
    })
    return { redoHeight, setCompensation, contentHeight }
}
