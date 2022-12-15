<template>
    <Form :model="LoginForm" ref="formRef">
        <FormItem name="username">
            <Input type="text" placeholder="请填写账号" v-model:value="LoginForm.username" />
        </FormItem>
        <FormItem name="password">
            <InputPassword placeholder="请填写密码" v-model:value="LoginForm.password"></InputPassword>
        </FormItem>
        <FormItem name="captcha">
            <CaptchaInput v-model:value="LoginForm.captcha" :loading="data.loading" :pic-path="data.picPath"
                @handle-fresh="handleFresh">
            </CaptchaInput>

        </FormItem>
        <img :src="data.picPath" alt="">
        <Button type="primary" block @click="handleLogin()" :loading="data.buttonLoading">登录</Button>
    </Form>
</template>

<script setup lang="ts" >
import { Form, Input, Button } from "ant-design-vue"
import { reactive, ref, onMounted, unref } from "vue";
import { CaptchaInput } from "@/components/Captcha"
import { getCaptcha } from "@/api/v1/sys/user"
import { isFunction } from "/@/utils/is";
import { useStore } from "/@/store";
import { useFormValid } from "./useLogin";

const FormItem = Form.Item;
const InputPassword = Input.Password;
const formRef = ref()
const data = reactive({
    loading: false,
    buttonLoading: false,
    picPath: ""
})
const LoginForm = reactive({
    username: "",
    password: "",
    captcha: "",
    captchaId: ""
})
// 获取验证码
const handleChangeCaptchaImage = async () => {
    if (getCaptcha && isFunction(getCaptcha)) {
        data.loading = true
        try {
            const res = await getCaptcha();

            data.picPath = res.picPath
            LoginForm.captchaId = res.captchaId
        } finally {
            data.loading = false
        }
    }
}
const handleFresh = () => {
    handleChangeCaptchaImage();
}
// 生命周期函数
onMounted(() => {
    handleChangeCaptchaImage();
})
const handleLogin = async () => {
    try {
        data.buttonLoading = true;
        const store = useStore();
        await store.dispatch("UserStore/login", unref(LoginForm))

    } catch (error) {

    } finally {
        data.buttonLoading = false
    }
}
</script>
