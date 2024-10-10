<template>
    <cardBox>
        <template v-slot:title>手机号登录</template>
        <template v-slot:form>
            <a-form ref="formRef" :model="formData" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" :rules="rules"
                autocomplete="off">
                <a-form-item label="手机号" name="phoneNumber">
                    <a-input v-model:value="formData.phoneNumber" />
                </a-form-item>

                <a-form-item label="验证码" name="veriCode">
                    <a-input v-model:value="formData.veriCode" />
                </a-form-item>

                <a-form-item :wrapper-col="{ sm: { offset: 8, span: 16 } }">
                    <a-button type="primary" @click="submitForm">登录</a-button>
                    <a-button style="margin-left: 10px" @click="genVeriCode" :disabled="timeSwitch">
                        <span v-if="!timeSwitch">
                            获取验证码
                        </span>
                        <div v-else>
                            倒计时{{ Math.round(timeNumber / 1000) }}s
                        </div>
                    </a-button>
                </a-form-item>
            </a-form>
        </template>
    </cardBox>
</template>

<script setup lang='ts'>
import cardBox from './components/cardBox.vue'
import type { Rule, FormInstance } from 'ant-design-vue/es/form'
import { reactive, ref } from 'vue'
import { PhoneRules } from '@/utils/FormRules'
import { PhoneLoginParams } from '@/type/api/user'
import { reqGetVeriCode } from '@/api/user/index'
import { message } from 'ant-design-vue'
import useGenVeriCode from '@/hook/useGenVeriCode'
import { useStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const rules: Record<string, Rule[]> = {
    phoneNumber: PhoneRules,
    veriCode: [
        { required: true, message: '请输入四位验证码', trigger: 'change' },
        { len: 4, message: '验证码长度为四位数字', trigger: 'change' }
    ]
}

const formRef = ref<FormInstance>()
const formData = reactive<PhoneLoginParams>({
    phoneNumber: '',
    veriCode: ''
})

const { timeNumber, timeSwitch } = useGenVeriCode()

const submitForm = () => {
    formRef.value!.validate().then(async () => {
        // 将数据都带给仓库请求
        $store.dispatch('userStore/phoneLogin', formData).then(() => {
            setTimeout(() => {
                $router.push($route.query.redirect ? $route.query.redirect as string : '/')
            }, 2000)
        }).catch((error) => {
            console.log(error)
        })
    }).catch(() => {
        console.log('校验不通过')
    }
    )
}

const genVeriCode = () => {
    formRef.value?.validateFields('phoneNumber').then(async () => {
        try {
            await reqGetVeriCode(formData.phoneNumber)
            message.success('发送验证码成功，请注意查收!')
            timeSwitch.value = true
        } catch (error) {
        }
    }).catch(() => {
        message.error('请先输入正确的手机号')
    })
}
</script>

<style scoped lang='scss'></style>
