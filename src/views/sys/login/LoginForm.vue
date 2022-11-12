<template>
    <Form :model="LoginForm">
        <FormItem name="username" v-model:value="LoginForm.username">
            <Input type="text" />
        </FormItem>
        <FormItem name="password" v-model:value="LoginForm.password">
            <InputPassword></InputPassword>
        </FormItem>
        <Button type="primary" block>登录</Button>
    </Form>
</template>

<script setup lang="ts" >
import { Form, Input, Button } from "ant-design-vue"
import { reactive } from "vue";

const FormItem = Form.Item;
const InputPassword = Input.Password;
const LoginForm = reactive({
    username: "admin",
    password: "123456"
})
</script>
