<template>
    <div class="md:flex">
        <template v-for="(item, index) in growCardList" :key="item.title">
            <Card size="small" :loading="loading" :title="item.title" class="md:w-1/4 w-full !md:mt-0"
                :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }">
                <template #extra>
                    <Tag :color="item.color">{{ item.action }}</Tag>
                </template>
            </Card>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { Tag, Card } from "ant-design-vue"
import { growCardList } from '../data';
// import { Icon } from '/@/components/Icon';
// import { CountTo } from '/@/components/CountTo/index';


defineProps({
    loading: {
        type: Boolean,
    },
});

</script>

