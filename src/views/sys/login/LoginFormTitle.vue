<template>
    <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
        {{ getFormTitle }}
    </h2>
</template>

<script setup lang="ts" >
import { computed, unref } from "vue";
import { useLoginState, LoginStateEnum } from "./useLogin"
import { useI18n } from '/@/hooks/web/useI18n';

const { getLoginState } = useLoginState()

const { t } = useI18n();

const getFormTitle = computed(() => {
    const titleObj = {
        [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),

    }
    return titleObj[unref(getLoginState)]
})

// const {t} = useIn8n()
</script>
