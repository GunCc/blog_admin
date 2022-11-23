/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-13 16:46:09
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 15:19:26
 * @FilePath: \blog_admin\src\utils\propTypes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { VueNode } from "ant-design-vue/es/_util/type";
import { CSSProperties, VNodeChild } from "vue";
import { createTypes, VueTypesInterface, VueTypeValidableDef } from "vue-types";

export type VueNode = VNodeChild | JSX.Element

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