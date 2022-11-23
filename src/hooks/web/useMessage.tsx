/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-22 21:31:40
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-22 21:44:06
 * @FilePath: \blog_admin\src\hooks\web\useMessage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message, Modal, ModalFuncProps } from "ant-design-vue";
import { CloseCircleFilled } from '@ant-design/icons-vue';
import { isString } from "/@/utils/is";

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
    iconType: 'warning' | 'success' | 'error' | 'info';
}

export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>;

const getBaseOptions = () => {
    return {
        okText: "提示",
        centered: true,
    }
}
// 获取图标
function getIcon(iconType: string) {
    if (iconType === 'warning') {

    } else {
        return <CloseCircleFilled class="modal-icon-error"></CloseCircleFilled>
    }
}

// 渲染内容
function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
    if (isString(content)) {
        return <div innerHTML={`<div>${content as string}</div>`}></div>
    } else {
        return content;
    }
}

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
    return {
        ...getBaseOptions(),
        ...options,
        content: renderContent(options),
        icon: getIcon(icon)
    }
}

function createErrorModal(options: ModalOptionsPartial) {
    Modal.error(createModalOptions(options, "close"))
}


export function useMessage() {
    return {
        createMessage: message,
        createErrorModal
    }
}