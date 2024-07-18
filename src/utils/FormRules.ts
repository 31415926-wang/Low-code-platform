import type { Rule } from 'ant-design-vue/es/form'

export const PhoneRules: Rule[] = [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入合法的11位手机号',
        trigger: 'blur'
    }
]
