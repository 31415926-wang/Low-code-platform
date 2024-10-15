<template>
    <a-spin :spinning="spinning" size="large" tip="加载中">
        <div class="detail-box">
            <div class="left ">
                <img :src="detailData.coverImg" alt="" v-if="detailData">
            </div>
            <div class="right">
                <div class="title">{{ detailData.title }}</div>
                <div class="desc">{{ detailData.desc }}</div>
                <div class="desc">
                    <span>
                        <UserOutlined />
                    </span>
                    <span>该模版由</span>
                    <!-- <span>{{ detailData.author }}</span> -->
                    <span>admin</span>
                    <span>创作</span>
                </div>
                <div class="bt-group">
                    <a-button shape="round" size="middle" type='primary'
                        @click="editWork(detailData.id)">编辑模版</a-button>
                    <a-button shape="round" size="middle" @click="onDownload(detailData.title, detailData.coverImg)">
                        <template #icon>
                            <DownloadOutlined />
                        </template>
                        下载封面</a-button>
                </div>
                <div class="">
                    <div class="desc" style="padding-bottom: 6px;">扫一扫，手机预览</div>
                    <canvas id="canvas-work" class="code"></canvas>
                </div>

                <div class="bt-group-footer">
                    <a-button shape="round" size="middle" danger :loading="deleteTemplateLoading"
                        @click="showDeleteConfirm(detailData.id)">
                        <template #icon>
                            <DeleteOutlined />
                        </template>
                        删除模版</a-button>
                    <a-button shape="round" size="middle" @click="$router.go(-1)">
                        <RedoOutlined />返回列表
                    </a-button>
                </div>

            </div>
        </div>
    </a-spin>
</template>

<script setup lang='ts'>
import { ref, onMounted, createVNode, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqDetailWork, reqDeleteWork } from '@/api/works/workItem'
import { DetailTemplateOrWork } from '@/type/api/work'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import onDownload from '@/utils/downloadFile'
import renderCode from '@/utils/renderCode'

const $route = useRoute()
const $router = useRouter()

const spinning = ref<boolean>(false)
const detailData = ref<DetailTemplateOrWork>({} as DetailTemplateOrWork)
const deleteTemplateLoading = ref(false)

const urlPre = computed(() => {
    const isHash = $router.options.history.base.includes('#')
    return process.env.VUE_APP_PublicPath! + (isHash ? '/#' : '')
})

onMounted(async () => {
    spinning.value = true
    // 加载模版详细
    try {
        const result = await reqDetailWork(Number($route.params.id))
        if (result.errno !== 0) {
            $router.go(-1)
        } else {
            detailData.value = result.data
            // 加载二维码
            renderCode('canvas-work', `${location.origin}${urlPre.value}/previewTemplate/${detailData.value.id}`)
        }
    } catch (error) {
        $router.go(-1)
    } finally {
        spinning.value = false
    }
})

const editWork = async (id: number) => {
    // 先复制，再访问
    // const result = await reqCopyWork(id)
    // $router.push('/edit-work/' + result.data.id)
    $router.push('/edit-work/' + id)
}

const showDeleteConfirm = (id: number) => {
    Modal.confirm({
        title: '确定删除该模版吗？',
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
            deleteWork(id)
        },
        onCancel() {
            console.log('Cancel')
        }
    })
}

const deleteWork = async (id: number) => {
    deleteTemplateLoading.value = true
    try {
        await reqDeleteWork(id)
        message.success('删除作品成功')
        $router.go(-1)
    } catch (error) {

    } finally {
        deleteTemplateLoading.value = false
    }
}

</script>

<style scoped lang='scss'>
.ant-spin-nested-loading {
    height: 100%;
}

::v-deep() .ant-spin-nested-loading>div {
    height: 100%;
}

::v-deep() .ant-spin {
    max-height: 100% !important;
}

.detail-box {
    display: flex;
    justify-content: center;
    gap: 17px;
    padding-top: 35px;
    // min-height: 600px;

    .left {
        width: 35%;

        img {
            min-height: 620px;
            object-fit: fill;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        gap: 18px;
        height: 100%;
        width: 35%;

        .title {
            font-size: 23px;
        }

        .desc {
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0.7;
            font-size: 15px;

            &>span:first-child {
                background-color: rgb(204, 204, 204);
                padding: 5px;
                border-radius: 50%;
            }
        }

        .bt-group {
            display: flex;
            gap: 9px;
        }

        .bt-group-footer {
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 7px;

            ::v-deep() .ant-btn {
                height: 38px !important;
            }
        }
    }
}
</style>
