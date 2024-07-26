<template>
    <a-modal v-model:open="openDonate" :footer=null title="转赠作品" @ok="donateWork" okText="确定转赠" cancelText="取消">
        <a-form style="margin-top: 17px;" :model="formState" name="basic" :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }" autocomplete="off">
            <a-form-item label="好友昵称" name="username" :rules="[{ required: true, message: '请输入好友昵称!' }]">
                <a-input v-model:value="formState.username" placeholder="输入好友昵称进行转赠" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                <a-button type="primary" round @click="donateWork">确定转赠</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { reqDonateWork } from '@/api/works/workItem'
import { message } from 'ant-design-vue'

const openDonate = ref<boolean>(false)

const formState = ref({
    id: null,
    username: ''
})

const donateWork = async () => {
    try {
        await reqDonateWork()
    } catch (error) {
        //
    }
}

defineExpose({
    openDonate,
    formState
})
</script>

<style scoped lang='scss'></style>
