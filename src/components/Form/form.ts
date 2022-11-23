/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 15:08:47
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 15:38:36
 * @FilePath: \blog_admin\src\components\Form\form.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 15:08:47
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 15:08:52
 * @FilePath: \blog_admin\src\components\Form\form.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RowProps } from "ant-design-vue";
import { NamePath, RuleObject } from "ant-design-vue/lib/form/interface";
import { CSSProperties, VNode } from "vue";
import { ColEx, ComponentType } from ".";
import { TableActionType } from "../Table/types/table";
import { FormItem } from "./formitem";


export type Rule = RuleObject & {
    trigger?: 'blur' | 'change' | ['change', 'blur'];
};


// 表单响应事件
export interface FormActionType {
    submit: () => Promise<void>;
    setFieldsValue: <T>(values: T) => Promise<void>;
    resetFields: () => Promise<void>;
    getFieldsValue: () => Recordable;
    clearValidate: (name?: string | string[]) => Promise<void>;
    updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
    resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
    setProps: (formProps: Partial<FormProps>) => Promise<void>;
    removeSchemaByFiled: (field: string | string[]) => Promise<void>;
    appendSchemaByField: (
        schema: FormSchema,
        prefixField: string | undefined,
        first?: boolean | undefined,
    ) => Promise<void>;
    validateFields: (nameList?: NamePath[]) => Promise<any>;
    validate: (nameList?: NamePath[]) => Promise<any>;
    scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}
export interface RenderCallbackParams {
    schema: FormSchema;
    values: Recordable;
    model: Recordable;
    field: string;
}

export interface FormSchema {
    // 名称
    field: string;
    // 修改事件名称
    changeEvent?: string
    // 值名称
    valueField?: string;
    // 显示名称
    label: string | VNode;
    // 辅助文本
    subLabel?: string;
    // 帮助提示语
    helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
    // 帮助组件 参数
    helpComponentProps?: Partial<HelpComponentProps>;
    // 行长度
    labelWidth?: number | string;
    // 使用formModel的全局设置禁用labelWidth的调整，并自行手动设置labelCol和wrapperCol
    disabledLabelWidth?: boolean;
    // 渲染组件
    component: ComponentType;
    // 组件参数
    componentProps?: object | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
    }) => Recordable);

    // 要求
    required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    // 后缀
    suffix?: string | number | ((values: RenderCallbackParams) => string | number);

    // 规则
    rules?: Rule[];

    // 检查信息是否添加到标签中
    rulesMessageJoinLabel?: boolean;

    // 参考表单ModelItem
    itemProps?: Partial<FormItem>;

    // 外部的列配置
    colProps?: Partial<ColEx>;

    // 默认值
    defaultValue?: any;
    isAdvanced?: boolean;

    // 匹配详细信息组件
    span?: number;

    ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

    show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

    // 呈现表单项标记中的内容
    render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

    // 呈现列内容需要外部包装表单项
    renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

    renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string;

    // 自定义插槽，来自from-item
    slot?: string;

    // 自定义槽，类似于renderColContent
    colSlot?: string;

    dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

    dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
}

export interface FormProps {
    name?: string;
    layout?: 'vertical' | 'inline' | 'horizontal';
    // 表单数据
    model: Recordable;
    // form-item label 长度
    labelWidth?: number | string;
    // fomr-item label 对其方式
    lableAlign?: "left" | 'right';
    // 表当行配置项
    rowProps?: RowProps;
    // 刷新按钮
    submitOnReset?: boolean;
    // 表单修改时确定按钮    
    submitOnChange?: boolean;
    // 表列的配置
    labelCol?: Partial<ColEx>;
    // 包装列
    wrapperCol?: Partial<ColEx>;
    // 生成行的样式
    baseRowStyle?: CSSProperties;
    // 列的默认设置
    baseColProps?: Partial<ColEx>;
    // 表单设置规则
    schemas?: FormSchema[];
}


export interface HelpComponentProps {
    maxWidth: string;
    // 是否显示第几个
    showIndex: boolean;
    // 文字列表
    text: any;
    // 颜色
    color: string;
    // 文字设置
    fontSize: string;
    icon: string;
    absolute: boolean;
    // 位置设置
    position: any;
}