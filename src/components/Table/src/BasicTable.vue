<!--
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-17 17:49:13
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 17:58:04
 * @FilePath: \blog_admin\src\components\Table\src\BasicTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <Table ref="tableElRef">

        </Table>
    </div>
</template>
<script  lang='ts'>
import { computed, defineComponent } from 'vue';
import { Table } from "ant-design-vue"
export default defineComponent({
    components: {
        Table
    },
    setup() {
        // const getBindValues = computed(()=>{
        //     const dataSource = unref(getData)
        // })
    }
})
</script>
<style lang='less' scoped>

</style>