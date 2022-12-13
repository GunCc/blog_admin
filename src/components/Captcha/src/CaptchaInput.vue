<template>
    <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
        <template #addonAfter>
            <Image :width="80" />
        </template>
        <template #suffix>
            <Tooltip title="点击刷新验证码" @click="handleChangeCaptchaImage">
                <redo-outlined />
            </Tooltip>
        </template>
    </a-input>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { Input, Tooltip, Image } from 'ant-design-vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import { getCaptchaModal } from '/@/api/v1/sys/model/userModal';
import { isFunction } from '/@/utils/is';
const props = {
    value: {
        type: String,
    },
    size: {
        type: String,
        validator: (v) => ['default', 'large', 'small'].includes(v)
    },
    sendCaptchaApi: {
        type: Function as PropType<() => Promise<getCaptchaModal>>,
        default: null
    }
}
export default defineComponent({
    name: "CaptchaInput",
    props,
    inheritAttrs: false,
    components: { Input, Tooltip, Image },
    setup(props) {
        const { prefixCls } = useDesign('countdown-input')

        const [state] = useRuleFormItem(props);

        const { sendCaptchaApi } = props

        const loading = ref(false)
        // 获取验证码
        const handleChangeCaptchaImage = async () => {

            if (sendCaptchaApi && isFunction(sendCaptchaApi)) {
                loading.value = true
                try {
                    const res = await sendCaptchaApi();
                    console.log(res)
                } finally {
                    loading.value = false
                }
            }
        }

        // 生命周期函数
        onMounted(() => {
            handleChangeCaptchaImage();
        })

        return { prefixCls, handleChangeCaptchaImage, state, loading }
    },
})
</script>
<style lang='less' scoped>

</style>