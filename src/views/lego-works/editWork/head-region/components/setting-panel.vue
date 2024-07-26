<template>
    <a-drawer v-model:open="openPanel" title="设置面板" placement="right" @after-open-change="afterOpenChange" :width="490"
        :closable="false">
        <template v-slot:extra>
            <CloseOutlined @click="openPanel = false" />
        </template>
        <a-form ref="formRef" class="setting-form" :model="formState" :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }" autocomplete="off" labelAlign="left">
            <a-form-item label="扫码预览">
                <img src="" class="border" />
            </a-form-item>

            <a-form-item label="上传封面" name="coverImg" :rules="[{ required: true, message: '作品封面不能为空!' }]">
                <FilesUpload :successCallback="successCallback">
                    <div class="img-echo border">
                        <img class="cover-img" v-if="formState.coverImg && formState.coverImg.length > 0"
                            :src="formState.coverImg" alt="作品封面">
                        <div class="cover-img" v-else src=""></div>
                    </div>
                </FilesUpload>

                <a-button type="dashed" style="margin-top: 10px;">
                    <template #icon>
                        <VideoCameraOutlined />
                    </template>将作品截图作为封面</a-button>
                <a-form-item-rest>
                    <a-input v-model:value="formState.coverImg" style="display:none;" />
                </a-form-item-rest>
            </a-form-item>

            <a-form-item label="标题" name="title" :rules="[{ required: true, message: '作品标题不能为空!' }]">
                <a-input v-model:value="formState.title" placeholder="请输入作品名称" />
            </a-form-item>

            <a-form-item label="副标题">
                <a-input v-model:value="formState.desc" placeholder="请输入作品描述" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" shape="round" html-type="submit" :loading="saveLoading"
                    @click="onSubmit">保存</a-button>
                <a-button shape="round" style="margin-left: 10px;" @click="onCancel">返回</a-button>
            </a-form-item>
        </a-form>

    </a-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { PageDate } from '@/type/widgets/index'
import { useStore } from '@/store/index'
import { pick } from 'lodash-es'
import { message } from 'ant-design-vue'
import type { Rule, FormInstance } from 'ant-design-vue/es/form'

const $store = useStore()

const openPanel = ref<boolean>(false)
const formState = ref<Omit<PageDate, 'id' | 'props'>>({
    title: '',
    desc: '',
    coverImg: ''
})
const saveLoading = ref(false)
const formRef = ref<FormInstance>()

const afterOpenChange = () => {
    formState.value = pick($store.state.editorStore.page, ['title', 'desc', 'coverImg'])
}

const successCallback = (param: string | { urls: string[] }) => {
    if (typeof param !== 'string') {
        formState.value.coverImg = param.urls[0]
        message.success('上传新封面成功!')
    }
}

const onSubmit = async () => {
    formRef.value!.validate().then(async () => {
        saveLoading.value = true
        // 先赋值给仓库
        $store.state.editorStore.page = {
            ...$store.state.editorStore.page,
            ...formState.value
        }
        try {
            await $store.dispatch('editorStore/saveWork')
            openPanel.value = false
        } catch (error) {

        } finally {
            saveLoading.value = false
        }
    }).catch(() => {
        //
    }
    )
}

const onCancel = () => {
    openPanel.value = false
}

defineExpose({
    openPanel
})
</script>

<style>
.ant-drawer-title {
    font-size: 18px !important;
    font-weight: normal !important;
}
</style>
<style scoped lang='scss'>
::v-deep() .ant-form-item .ant-row {
    align-items: center;
}

.setting-form {
    img {
        width: 120px;
        height: 120px;
    }

    .img-echo {
        overflow: hidden;
        // border-radius: 50%;
        border: 2px dotted rgba(126, 126, 126, 0.486);
        padding: 7px;
        cursor: pointer;

        .cover-img {
            width: 180px;
            height: 220px;
        }

        &:hover {
            border-color: $theme_color;
        }
    }
}

.ant-input {
    border-radius: 15px;
}

.border {
    border-color: rgb(145, 144, 144);
}
</style>
