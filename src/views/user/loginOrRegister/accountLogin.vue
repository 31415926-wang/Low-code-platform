<template>
    <cardBox>
        <template v-slot:title>账号登录</template>
        <template v-slot:form>
            <a-form ref="formRef" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" :rules="rules"
                autocomplete="off">
                <a-form-item label="用户账号" name="username">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="用户密码" name="password">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ sm: { offset: 8, span: 16 } }">
                    <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ sm: { offset: 8, span: 16 } }">
                    <a-button type="primary" @click="submitForm">登录</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </template>
    </cardBox>
</template>

<script setup lang='ts'>
import cardBox from './components/cardBox.vue'
import type { Rule, FormInstance } from 'ant-design-vue/es/form'
import { reactive, ref } from 'vue'
import { loginMutationParams } from '@/type/store/modules/userStore'

const rules: Record<string, Rule[]> = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 11, message: '账号的长度在3到11位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 11, message: '账号的长度在3到11位', trigger: 'blur' }
    ]
}

const formRef = ref<FormInstance>()
const formState = reactive<loginMutationParams>({
    username: '',
    password: '',
    remember: true
})

const submitForm = () => {
    formRef.value!.validate().then(async () => {
        console.log('校验通过')
        // 将数据都带给仓库
    }).catch(() => {
        console.log('校验不通过')
    }
    )
}

const resetForm = () => {
    formRef.value!.resetFields()
}
</script>

<style scoped lang='scss'></style>
