<template>
    <a-upload v-model:file-list="fileList" name="file-upload" :multiple='$props.multiple'
        :action="$store.state.apiStore.fileUploadApi" :headers="headers" @change="handleChange" :showUploadList="false">
        <slot></slot>
    </a-upload>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadChangeParam } from 'ant-design-vue'
import { useStore } from '@/store/index'

const fileList = ref([])
const headers = {
    authorization: 'authorization-text'
}

const $props = withDefaults(defineProps<{
    multiple?: boolean,
    // eslint-disable-next-line
    successCallback?: (param: string) => void
}>(), {
    multiple: false
})

const $store = useStore()

// 上传的文件状态改变时执行
const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
        console.log('上传成功', info.file.response.data)
        // 回显
        $props.successCallback && $props.successCallback(info.file.response.data)
    }
}

</script>
