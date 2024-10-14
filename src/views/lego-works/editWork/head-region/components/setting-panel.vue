<template>
    <a-drawer v-model:open="openPanel" title="设置面板" placement="right" @after-open-change="afterOpenChange"
        :width="width > 768 ? 420 : 280" :closable="false">
        <template v-slot:extra>
            <CloseOutlined @click="openPanel = false" />
        </template>
        <a-form ref="formRef" class="setting-form" :model="formState" :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }" autocomplete="off" labelAlign="left">
            <!-- <a-form-item label="扫码预览 ">
                <img src="" class="border" />
            </a-form-item> -->

            <a-form-item name="coverImg" :rules="[{ required: true, message: '作品封面不能为空!' }]">
                <template v-slot:label>
                    <div class="label-tip">上传封面<br>
                        <span>(点击上传封面)</span>
                    </div>
                </template>
                <FilesUpload :successCallback="successCallback">
                    <div class="img-echo border">
                        <img class="cover-img" v-if="formState.coverImg && formState.coverImg.length > 0"
                            :src="formState.coverImg" alt="作品封面">
                        <div class="cover-img" v-else src=""></div>
                    </div>
                </FilesUpload>

                <a-button type="dashed" :loading="screenshotLoading" @click="onScreenshot" style="margin-top: 10px;">
                    <template #icon>
                        <VideoCameraOutlined />
                    </template>
                    将作品截图作为封面
                </a-button>
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
import { ref, nextTick } from 'vue'
import { PageDate } from '@/type/store/modules/editorStore'
import { useStore } from '@/store/index'
import { pick } from 'lodash-es'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue/es/form'
import html2canvas from 'html2canvas'
import canvasUpload from '@/utils/canvasUpload'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const $store = useStore()

const openPanel = ref<boolean>(false)
const formState = ref<Omit<PageDate, 'id' | 'props'>>({
    title: '',
    desc: '',
    coverImg: ''
})
const saveLoading = ref(false)
const screenshotLoading = ref(false)
const formRef = ref<FormInstance>()

const afterOpenChange = () => {
    formState.value = pick($store.state.editorStore.page, ['title', 'desc', 'coverImg'])
}

const onScreenshot = async () => {
    // 转为canvas前，1.得过滤掉插件不支持的css属性 2.取消物料选中 3.关闭网格
    $store.commit('editorStore/selectWidget', '')
    $store.commit('editorStore/setOpenGridLine', false)

    await nextTick(() => {
        const goalDom = document.querySelector('.middle-box') as HTMLElement
        screenshotLoading.value = true
        if (goalDom) {
            html2canvas(goalDom, {
                // proxy: 'http://localhost:8888/',
                useCORS: true, // 是否尝试使用CORS从服务器加载图像
                onclone: (document, element: HTMLElement) => { // 该回调可以在截图之前，获取文档与截图区域，允许做修改，且不影响原数据
                    const wrapperDoms = [...element.querySelectorAll('.edit-wrapper')]
                    wrapperDoms.forEach(wrapperDom => {
                        const widgetDom = wrapperDom.firstElementChild as HTMLElement
                        if (widgetDom.style.boxShadow) {
                            widgetDom.style.boxShadow = ''
                        }
                    })
                }
                // #region
                /*
                proxy、useCORS两个选项
                区别总结：
                    如果没有自己的代理服务器，可以选择配置 useCORS: true，并确保服务器端设置了正确的 CORS 头部，以允许跨域图片的加载。
                    如果有自己的代理服务器，并且希望统一通过代理服务器加载图片以确保稳定性和安全性，可以配置 proxy 选项，将图片加载请求转发到代理服务器处理。
                 */
                // #endregion
            }).then((canvas) => {
                // 将canvas转换为blod或者file，作为图片上传至后台
                canvasUpload(canvas).then((data) => {
                    formState.value.coverImg = data.urls[0]
                }).finally(() => {
                    screenshotLoading.value = false
                })
            })
        }
    })
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

    .ant-form-item-label {}

    .label-tip {
        line-height: 1.2;

        span {
            font-size: 10px;
        }
    }

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
            width: 170px;
            height: 200px;
            object-fit: contain;
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
