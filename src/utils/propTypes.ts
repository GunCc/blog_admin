import { VueNode } from "ant-design-vue/es/_util/type";
import { CSSProperties } from "vue";
import { createTypes, VueTypesInterface, VueTypeValidableDef } from "vue-types";

type propTypes = VueTypesInterface & {
    readonly style: VueTypeValidableDef<CSSProperties>;
    readonly VNodeChild: VueTypeValidableDef<VueNode>;
}

const propTypes = createTypes({
    func: undefined,
    bool: undefined,
    string: undefined,
    number: undefined,
    object: undefined,
    integer: undefined,
}) as propTypes;


propTypes.extend([
    {
        name: 'style',
        getter: true,
        type: [String, Object],
        default: undefined
    },
    {
        name: "VNodeChild",
        getter: true,
        type: undefined
    }
])

export { propTypes };