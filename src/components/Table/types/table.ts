/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 14:33:45
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 17:11:52
 * @FilePath: \blog_admin\src\components\Table\types\table.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 14:33:45
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 15:22:54
 * @FilePath: \blog_admin\src\components\Table\types\table.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SortOrder, TableRowSelection } from "ant-design-vue/es/table/interface";
import { ColumnProps } from "ant-design-vue/lib/table";
import { VNodeChild } from "vue";
import { FormProps } from "../../Form/form";
import { ComponentType } from "./componentType";
import { PaginationProps } from "./pagination";
import { RoleEnum } from "/@/enums/roleEnum";
import { VueNode } from "/@/utils/propTypes";

export interface SorterResult {
    column: ColumnProps;
    order: SortOrder;
    field: string;
    columnKey: string;
}

export interface TableSetting {
    redo?: boolean;
    size?: boolean;
    setting?: boolean;
    fullScreen?: boolean;
}

export interface FetchSetting {
    // 当前页数
    pageField: string;
    // 每页显示多少条
    sizeField: string;
    // 请求结果列表字段
    listField: string;
    // 请求结果总数字段
    totalField: string;
}

export type SizeType = 'default' | 'middle' | 'small' | 'large';

export interface TableCustomRecord<T> {
    record?: T;
    index?: number;
}
export interface ExpandedRowRenderRecord<T> extends TableCustomRecord<T> {
    indent?: number;
    expanded?: boolean;
}
export interface BasicTableProps<T = any> {
    // 点击选中时
    clickToRowSelect?: boolean;
    // 是否树形表格
    isTreeTable?: boolean;
    // 自定义排序方法
    sortFn?: (sortInfo: SorterResult) => any;
    // 过滤方法
    filterFn?: (data: Partial<Recordable<string[]>>) => any;
    // 取消表格默认的padding
    inset?: boolean;
    // 显示表格设置
    showTableSetting?: boolean;
    // 表格设置的属性
    tableSetting?: TableSetting;
    // 是否开启斑马纹
    striped?: boolean;
    // 是否自动生成key
    autoCreateKey?: boolean;
    // 计算合计行的方法
    summaryFunc?: (...arg: any) => Recordable[];
    // 自定义合计表格内容
    summaryData?: Recordable[];
    // 是否显示合计行
    showSummary?: boolean;
    // 是否可拖拽列
    canColDrag?: boolean;
    // 接口请求对象
    api?: (...arg: any) => Promise<any>;
    // 请求之前处理参数
    beforeFetch?: Fn;
    // 自定义处理接口返回参数
    afterFetch?: Fn;
    // 查询条件请求之前处理
    handleSearchInfoFn?: Fn;
    // 请求接口配置
    fetchSetting?: Partial<FetchSetting>;
    // 立即请求接口
    immediate?: boolean;
    // 在开始搜索表单的时候，如果没有数据是否显示表格
    emptyDataIsShowTable?: boolean;
    // 额外请求的参数
    searchInfo?: Recordable;
    // 默认的排序参数
    defSort?: Recordable;
    // 使用搜索表单
    useSearchForm?: boolean;
    // 表单配置
    formConfig?: Partial<FormProps>;
    // 列配置
    columns: BasicColumn[];
    // 是否显示序号列
    showIndexColumn?: boolean;
    // 序号列配置
    indexColumnProps?: BasicColumn;
    actionColumn?: BasicColumn;
    // 文本超过宽度是否显示。。。
    ellipsis?: boolean;
    // 是否继承父级高度（父级高度-表单高度-padding高度）
    isCanResizeParent?: boolean;
    // 是否可以自适应高度
    canResize?: boolean;
    // 自适应高度偏移， 计算结果-偏移量
    resizeHeightOffset?: number;

    // 在分页改变的时候清空选项
    clearSelectOnPageChange?: boolean;
    //
    rowKey?: string | ((record: Recordable) => string);
    // 数据
    dataSource?: Recordable[];
    // 标题右侧提示
    titleHelpMessage?: string | string[];
    // 表格滚动最大高度
    maxHeight?: number;
    // 是否显示边框
    bordered?: boolean;
    // 分页配置
    pagination?: PaginationProps | boolean;
    // loading加载
    loading?: boolean;

    // 该列包含要显示的子项
    childrenColumnName?: string;

    // 代替默认表元素
    components?: object;

    // 最初展开所有行
    defaultExpandAllRows?: boolean;

    // 默认扩展行键
    defaultExpandedRowKeys?: string[];

    // 当前展开的行键
    expandedRowKeys?: string[];

    // 展开每行的容器渲染
    expandedRowRender?: (record?: ExpandedRowRenderRecord<T>) => VNodeChild | JSX.Element;

    // 自定义行展开图标
    expandIcon?: Function | VNodeChild | JSX.Element;

    // 是否通过单击整行中的任何位置来展开行
    expandRowByClick?: boolean;

    // 当“expandIconAsCell”为false时将插入的列“expandIcon”的索引。默认值0
    expandIconColumnIndex?: number;

    // 表页脚渲染器
    footer?: Function | VNodeChild | JSX.Element;

    /**
     * Indent size in pixels of tree data
     * @default 15
     * @type number
     */
    indentSize?: number;

    // i18n 文本，包括筛选器、排序、空文本等
    locale?: object;

    // 行的样式名
    rowClassName?: (record: TableCustomRecord<T>, index: number) => string;

    // 行的配置
    rowSelection?: TableRowSelection;

    //    设置滚动
    scroll?: { x?: number | true; y?: number };

    // 是否显示表头
    showHeader?: boolean;

    // 设置大小
    size?: SizeType;

    // 表格标题
    title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string);

    // 自定义头列
    customHeaderRow?: (column: ColumnProps, index: number) => object;

    // 自定义列
    customRow?: (record: T, index: number) => object;

    // 表格布局
    tableLayout?: 'auto' | 'fixed' | string;

    // 表中下拉列表的渲染容器
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;

    // 渲染前再次渲染更改数据，可以设置空数据的默认配置
    transformCellText?: Function;

    // 在可编辑单元格提交值之前执行回调，而不是针对行编辑器
    beforeEditSubmit?: (data: {
        record: Recordable;
        index: number;
        key: string | number;
        value: any;
    }) => Promise<any>;

    //    当分页、过滤器或排序器更改时执行回调
    onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;

    // 单击行展开图标时执行回调
    onExpand?: (expande: boolean, record: T) => void;

    // 扩展行更改时执行的回调
    onExpandedRowsChange?: (expandedRows: string[] | number[]) => void;

    onColumnsChange?: (data: ColumnChangeParam[]) => void;
}
export type ColumnChangeParam = {
    dataIndex: string;
    fixed: boolean | 'left' | 'right' | undefined;
    visible: boolean;
};

export interface FetchParams {
    searchInfo?: Recordable;
    page?: number;
    sortInfo?: Recordable;
    filterInfo?: Recordable;
}

export interface GetColumnsParams {
    ignoreIndex?: boolean;
    ignoreAction?: boolean;
    sort?: boolean;
}


export interface TableActionType {
    reload: (opt?: FetchParams) => Promise<void>;
    getSelectRows: <T = Recordable>() => T[];
    clearSelectedRowKeys: () => void;
    expandAll: () => void;
    expandRows: (keys: string[] | number[]) => void;
    collapseAll: () => void;
    scrollTo: (pos: string) => void;
    getSelectRowKeys: () => string[];
    deleteSelectRowByKey: (key: string) => void;
    setPagination: (info: Partial<PaginationProps>) => void;
    setTableData: <T = Recordable>(values: T[]) => void;
    updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
    deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void;
    insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void;
    findTableDataRecord: (rowKey: string | number) => Recordable | void;
    getColumns: (opt?: GetColumnsParams) => BasicColumn[];
    setColumns: (columns: BasicColumn[] | string[]) => void;
    getDataSource: <T = Recordable>() => T[];
    getRawDataSource: <T = Recordable>() => T;
    setLoading: (loading: boolean) => void;
    setProps: (props: Partial<BasicTableProps>) => void;
    redoHeight: () => void;
    setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
    getPaginationRef: () => PaginationProps | boolean;
    getSize: () => SizeType;
    getRowSelection: () => TableRowSelection<Recordable>;
    getCacheColumns: () => BasicColumn[];
    emit?: EmitType;
    updateTableData: (index: number, key: string, value: any) => Recordable;
    setShowPagination: (show: boolean) => Promise<void>;
    getShowPagination: () => boolean;
    setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void;
}


export type CellFormat =
    | string
    | ((text: string, record: Recordable, index: number) => string | number)
    | Map<string | number, any>;
// @ts-ignore
export interface BasicColumn extends ColumnProps<Recordable> {
    children?: BasicColumn[];
    filters?: {
        text: string;
        value: string;
        children?:
        | unknown[]
        | (((props: Record<string, unknown>) => unknown[]) & (() => unknown[]) & (() => unknown[]));
    }[];

    //
    flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';
    customTitle?: VueNode;

    slots?: Recordable;

    // Whether to hide the column by default, it can be displayed in the column configuration
    defaultHidden?: boolean;

    // Help text for table column header
    helpMessage?: string | string[];

    format?: CellFormat;

    // Editable
    edit?: boolean;
    editRow?: boolean;
    editable?: boolean;
    editComponent?: ComponentType;
    editComponentProps?:
    | ((opt: {
        text: string | number | boolean | Recordable;
        record: Recordable;
        column: BasicColumn;
        index: number;
    }) => Recordable)
    | Recordable;
    editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
    editValueMap?: (value: any) => string;
    onEditRow?: () => void;
    // 权限编码控制是否显示
    auth?: RoleEnum | RoleEnum[] | string | string[];
    // 业务控制是否显示
    ifShow?: boolean | ((column: BasicColumn) => boolean);
    // 自定义修改后显示的内容
    editRender?: (opt: {
        text: string | number | boolean | Recordable;
        record: Recordable;
        column: BasicColumn;
        index: number;
    }) => VNodeChild | JSX.Element;
    // 动态 Disabled
    editDynamicDisabled?: boolean | ((record: Recordable) => boolean);
}