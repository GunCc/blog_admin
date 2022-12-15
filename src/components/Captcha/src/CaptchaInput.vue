<template>
    <a-input placeholder="请填写验证码" v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
        <template #addonAfter>
            <Image :width="80" :src="picPath" :loading="loading" />
        </template>
        <template #suffix>
            <Tooltip title="点击刷新验证码" @click="handleChangeCaptchaImage">
                <redo-outlined />
            </Tooltip>
        </template>
    </a-input>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { Tooltip, Image } from 'ant-design-vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
const props = {
    picPath: {
        type: String
    },
    loading: {
        type: Boolean
    },
    value: {
        type: String,
    },
    size: {
        type: String,
        validator: (v) => ['default', 'large', 'small'].includes(v)
    },
}
export default defineComponent({
    name: "CaptchaInput",
    props,
    inheritAttrs: false,
    components: { Tooltip, Image },
    emits: ["handleFresh"],
    setup(props, { emit }) {
        const { prefixCls } = useDesign('countdown-input')
        const [state] = useRuleFormItem(props);
        const handleChangeCaptchaImage = () => {
            emit("handleFresh")
        }
        return { prefixCls, state, handleChangeCaptchaImage }
    },
})
</script>
<style lang='less' scoped>

</style>