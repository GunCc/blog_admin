<!--
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-13 16:34:59
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 17:59:23
 * @FilePath: \blog_admin\src\views\article\type\Type.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <PageWrapper>

        <BasicTable @regisetr="registerTable"></BasicTable>
    </PageWrapper>
</template>
<script setup lang='ts'>
import { PageWrapper } from "@/components/Page"
import { BasicTable } from '@/components/Table';
import { getTypeList } from "/@/api/v1/article/type";
import { useTable } from "/@/components/Table/hooks/useTable";
const [registerTable, { reload }] = useTable({
    title: "测试表格",
    api: getTypeList,
    pagination: { pageSize: 10 },
})
// function handleReloadCurrent() {
//     reload();
// }

// function handleReload() {
//     reload({
//         page: 1,
//     });
// }
</script>
<style lang='less' scoped>

</style>