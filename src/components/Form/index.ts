/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 14:50:35
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 15:09:32
 * @FilePath: \blog_admin\src\components\Table\types\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

type ColSpanType = number | string;
export interface ColEx {
    style?: any;
    // 要占用的单元格光栅数，0对应于显示：无
    span?: ColSpanType;
    // 光栅顺序，用于灵活布局模式
    order?: ColSpanType
    // flex布局填充
    flex?: ColSpanType;
    // 要从左侧偏移Col的单元格数
    offset?: ColSpanType;
    //  光栅向右移动的单元格数
    push?: ColSpanType;
    // 光栅向左移动的单元格数
    pull?: ColSpanType;

    // 响应式设置

    // 小于576px
    xs?: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;

    // 大于576px
    sm?: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;

    // 大于768px
    md?: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;


    // 大于992px
    lg?: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;

    // 大于1200px
    xl?: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;

    // 大于1600px
    xxl: {
        span: ColSpanType,
        offset: ColSpanType
    } | ColSpanType;

}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ApiTransfer';
