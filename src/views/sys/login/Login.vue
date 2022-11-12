<template>
    <div :class="prefixCls" class="relative w-full h-full px-4">

        <!-- 右边form模块 -->
        <div class="container relative h-full py-2 mx-auto sm:px-10">
            <div class="flex h-full">
                <!-- 左边 -->
                <div class="hidden min-h-full pl-4 mr-4 xl:flex xl-flex-col xl:w-6/12">

                    <div class="my-auto">
                        <img src="../../../assets/svg/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" :alt="title">
                        <div class="mt-10 font-medium text-white -enter-x">
                            <span class="inline-block mt-4 text-3xl">芒果博客后台管理系统</span>
                        </div>
                    </div>

                </div>
                <!-- 右边 -->
                <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
                    <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
                        <div :class="`${prefixCls}-form`"
                            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x">
                            <LoginFormTitle />
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useDesign } from "@/hooks/web/useDesign"
import { useGlobSetting } from "/@/settings";
import LoginForm from "./LoginForm.vue"
import LoginFormTitle from "./LoginFormTitle.vue"
import { useStore } from "vuex"
const store = useStore();
console.log(store)
const globSetting = useGlobSetting();
const { prefixCls } = useDesign("login");

const title = computed(() => globSetting?.title ?? '')

</script>

<style lang="less" >
@prefix-cls: ~'@{namespace}-login';
@logo-prefix-cls: ~'@{namespace}-app-logo';
@countdown-prefix-cls: ~'@{namespace}-countdown-input';

.@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    @media (max-width: @screen-xl) {
        background-color: #293146;

        .@{prefix-cls}-form {
            background-color: #fff;
        }
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-left: -48%;
        background-image: url(/@/assets/svg/login-bg.svg);
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        content: '';

        @media (max-width: @screen-xl) {
            display: none;
        }
    }

    .@{logo-prefix-cls} {
        position: absolute;
        top: 12px;
        height: 30px;

        &__title {
            font-size: 16px;
            color: #fff;
        }

        img {
            width: 32px;
        }
    }

    .container {
        .@{logo-prefix-cls} {
            display: flex;
            width: 60%;
            height: 80px;

            &__title {
                font-size: 24px;
                color: #fff;
            }

            img {
                width: 48px;
            }
        }
    }

    &-sign-in-way {
        .anticon {
            font-size: 22px;
            color: #888;
            cursor: pointer;

            &:hover {
                color: @primary-color;
            }
        }
    }

    input:not([type='checkbox']) {
        min-width: 360px;

        @media (max-width: @screen-xl) {
            min-width: 320px;
        }

        @media (max-width: @screen-lg) {
            min-width: 260px;
        }

        @media (max-width: @screen-md) {
            min-width: 240px;
        }

        @media (max-width: @screen-sm) {
            min-width: 160px;
        }
    }

    .@{countdown-prefix-cls} input {
        min-width: unset;
    }

    .ant-divider-inner-text {
        font-size: 12px;
        color: @text-color-secondary;
    }
}
</style>