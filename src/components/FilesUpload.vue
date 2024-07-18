<template>
    <a-upload v-model:file-list="fileList" name="file-upload" :multiple='$props.multiple'
        :action="$store.state.apiStore.fileUploadApi" @change="handleChange" :showUploadList="showUploadList"
        :list-type="listType" :maxCount=1 :headers='headers'>
        <slot></slot>
    </a-upload>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { UploadChangeParam } from 'ant-design-vue'
import { useStore } from '@/store/index'
import { AxiosRequestHeaders } from 'axios'

const $store = useStore()
const $props = withDefaults(defineProps<{
    multiple?: boolean,
    // showUploadList、listType 能决定是否回显上传文件
    showUploadList?: boolean,
    listType?: string,
    // eslint-disable-next-line
    successCallback?: (param: string | { urls: string[] }) => void
}>(), {
    multiple: false,
    showUploadList: false,
    listType: 'text'
})

const fileList = ref([])
const headers = ref<AxiosRequestHeaders>({} as AxiosRequestHeaders)

// 上传的文件状态改变时执行
const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
        console.log('上传成功', info.file.response.data)
        // console.log('上传成功', fileList.value)
        // 回显
        $props.successCallback && $props.successCallback(info.file.response.data)
    }
}

onMounted(() => {
    headers.value.Authorization = 'Bearer ' + $store.state.userStore.token
})

</script>
