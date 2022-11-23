import { onUnmounted, ref, toRaw, unref, watch, WatchStopHandle } from "vue";
import { FormActionType } from "../../Form/form";
import { PaginationProps } from "../types/pagination";
import { BasicColumn, BasicTableProps, FetchParams, TableActionType } from "../types/table";
import { DynamicProps } from "/@/types/utils";
import { getDynamicProps } from "/@/utils";
import { isProdMode } from "/@/utils/env";
import { error } from "/@/utils/log";

/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-19 14:31:42
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-19 17:09:31
 * @FilePath: \blog_admin\src\components\Table\hooks\useTable.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

type UseTableMethod = TableActionType & {
    getForm: () => FormActionType
}

let stopWatch: WatchStopHandle;
type Props = Partial<DynamicProps<BasicTableProps>>;
export function useTable(tableProps?: Props): [
    (instance: TableActionType, formInstance: UseTableMethod) => void,
    TableActionType & {
        getForm: () => FormActionType
    }
] {

    const tableRef = ref<Nullable<TableActionType>>(null);
    const loadedRef = ref<Nullable<boolean>>(false);
    const formRef = ref<Nullable<UseTableMethod>>(null);
    function register(instance: TableActionType, formInstance: UseTableMethod) {
        isProdMode() && onUnmounted(() => {
            tableRef.value = null;
            loadedRef.value = null;
        });

        if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return;
        tableRef.value = instance;
        formRef.value = formInstance;
        tableProps && instance.setProps(getDynamicProps(tableProps));
        loadedRef.value = true;
        stopWatch?.();
        stopWatch = watch(
            () => tableProps,
            () => {
                tableProps && instance.setProps(getDynamicProps(tableProps));
            },
            {
                immediate: true,
                deep: true
            }
        )
    }
    function getTableInstance(): TableActionType {
        const table = unref(tableRef);
        if (!table) {
            error(
                '尚未获取表实例，请确保在执行表操作时显示该表'
            )
        }
        return table as TableActionType
    }

    const methods: TableActionType & {
        getForm: () => FormActionType;
    } = {
        reload: async (opt?: FetchParams) => {
            return await getTableInstance().reload(opt);
        },
        setProps: (props: Partial<BasicTableProps>) => {
            getTableInstance().setProps(props);
        },
        redoHeight: () => {
            getTableInstance().redoHeight();
        },
        setLoading: (loading: boolean) => {
            getTableInstance().setLoading(loading);
        },
        getDataSource: () => {
            return getTableInstance().getDataSource();
        },
        getRawDataSource: () => {
            return getTableInstance().getRawDataSource();
        },
        getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
            const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
            return toRaw(columns);
        },
        setColumns: (columns: BasicColumn[]) => {
            getTableInstance().setColumns(columns);
        },
        setTableData: (values: any[]) => {
            return getTableInstance().setTableData(values);
        },
        setPagination: (info: Partial<PaginationProps>) => {
            return getTableInstance().setPagination(info);
        },
        deleteSelectRowByKey: (key: string) => {
            getTableInstance().deleteSelectRowByKey(key);
        },
        getSelectRowKeys: () => {
            return toRaw(getTableInstance().getSelectRowKeys());
        },
        getSelectRows: () => {
            return toRaw(getTableInstance().getSelectRows());
        },
        clearSelectedRowKeys: () => {
            getTableInstance().clearSelectedRowKeys();
        },
        setSelectedRowKeys: (keys: string[] | number[]) => {
            getTableInstance().setSelectedRowKeys(keys);
        },
        getPaginationRef: () => {
            return getTableInstance().getPaginationRef();
        },
        getSize: () => {
            return toRaw(getTableInstance().getSize());
        },
        updateTableData: (index: number, key: string, value: any) => {
            return getTableInstance().updateTableData(index, key, value);
        },
        deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => {
            return getTableInstance().deleteTableDataRecord(rowKey);
        },
        insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
            return getTableInstance().insertTableDataRecord(record, index);
        },
        updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
            return getTableInstance().updateTableDataRecord(rowKey, record);
        },
        findTableDataRecord: (rowKey: string | number) => {
            return getTableInstance().findTableDataRecord(rowKey);
        },
        getRowSelection: () => {
            return toRaw(getTableInstance().getRowSelection());
        },
        getCacheColumns: () => {
            return toRaw(getTableInstance().getCacheColumns());
        },
        getForm: () => {
            return unref(formRef) as unknown as FormActionType;
        },
        setShowPagination: async (show: boolean) => {
            getTableInstance().setShowPagination(show);
        },
        getShowPagination: () => {
            return toRaw(getTableInstance().getShowPagination());
        },
        expandAll: () => {
            getTableInstance().expandAll();
        },
        expandRows: (keys: string[]) => {
            getTableInstance().expandRows(keys);
        },
        collapseAll: () => {
            getTableInstance().collapseAll();
        },
        scrollTo: (pos: string) => {
            getTableInstance().scrollTo(pos);
        },
    };
    return [register, methods]

}