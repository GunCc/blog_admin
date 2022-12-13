<template>
    <Form :model="LoginForm">
        <FormItem name="username" v-model:value="LoginForm.username">
            <Input type="text" placeholder="请填写账号" />
        </FormItem>
        <FormItem name="password" v-model:value="LoginForm.password">
            <InputPassword placeholder="请填写密码"></InputPassword>
        </FormItem>
        <FormItem name="captcha" v-model:value="LoginForm.captcha">
            <CaptchaInput :send-captcha-api="getCaptcha"></CaptchaInput>
        </FormItem>

        <Button type="primary" block>登录</Button>
    </Form>
</template>

<script setup lang="ts" >
import { Form, Input, Button } from "ant-design-vue"
import { reactive } from "vue";
import { CaptchaInput } from "@/components/Captcha"
import { getCaptcha } from "@/api/v1/sys/user"

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm = reactive({
    username: "admin",
    password: "123456",
    captcha: "",
    captcha_id: ""
})
</script>
