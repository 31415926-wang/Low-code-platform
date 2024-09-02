<template>
    <div class="work-head-box">
        <div ref="headLeftRef" class="head-left">
            <a-button type="default" @click="$router.push('/')">
                <template #icon>
                    <RollbackOutlined />
                </template>
            </a-button>
            <div class="work-name ">
                <IconSvg name="index-work" fill="#f4801a"></IconSvg>
                <InlineEdit class="InlineEdit" :value="$store.state.editorStore.page.title" @update:value="setPageName">
                </InlineEdit>
            </div>
        </div>

        <div class="head-middle">
            <HeadTools></HeadTools>
        </div>

        <div class="head-right">
            <div class="head-dataset">
                <div>画布大小 <a-input size="small" @change="updatePageProps('width')" v-model:value="canvasWidth" /> *
                    <a-input size="small" @change="updatePageProps('height')" v-model:value="canvasHeight" />
                </div>
                <div class="rate">画布比例
                    <a-input-number :min="0.8" :step="0.2" :max="2" size="small" @change="updatePageProps('rate')"
                        v-model:value="canvasRate" :formatter="formatterInput" :parser="parserInput" />%
                </div>
            </div>
            <a-button @click="openSettingPanel">作品设置</a-button>
            <span></span>
            <a-button type="default" id="saveBt" @click="handleSave" :loading="saveWorkLoading"
                :disabled="!$store.getters['editorStore/isWithoutSave']">
                保存
            </a-button>
            <a-button type="primary" :loading="publishWorkLoading" @click="openPublishPanel">
                发布
            </a-button>
        </div>
    </div>

    <settingPanel ref="settingPanelRef"></settingPanel>
    <publishPanel ref="publishPanelRef" :openSettingPanel="openSettingPanel"></publishPanel>
</template>

<script setup lang='ts'>
import HeadTools from './components/head-tools.vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '@/store/index'
import { ref, onMounted, onUnmounted, provide, computed, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import settingPanel from './components/setting-panel.vue'
import publishPanel from './components/publish-panel.vue'
import { reqPublishWork } from '@/api/works/workItem'

const headLeftRef = ref()
const settingPanelRef = ref()
const publishPanelRef = ref()

const $store = useStore()
const $router = useRouter()

const saveWorkLoading = ref(false)
const publishWorkLoading = ref(false)
// 间隔时间自动保存
let timer: number | null = null

const canvasWidth = ref(0)
const canvasHeight = ref(0)
const canvasRate = ref(0)
const pageProps = computed(() => {
    return $store.state.editorStore.page.props
})
watch(() => $store.state.editorStore.page.props, () => {
    canvasWidth.value = parseInt(pageProps.value.width + '')
    canvasHeight.value = parseInt(pageProps.value.height + '')
    canvasRate.value = $store.state.editorStore.canvasRate
}, { deep: true })

const updatePageProps = (type: 'width' | 'height' | 'rate') => {
    if (type === 'rate') {
        $store.commit('editorStore/setRate', canvasRate.value)
    } else {
        if (canvasWidth.value && canvasHeight.value) {
            $store.commit('editorStore/updateWidget', {
                changeKey: type,
                changeValue: (type === 'width' ? canvasWidth.value : canvasHeight.value) + 'px',
                changeType: 'page'
            })
        }
    }
}

const formatterInput = (value: number) => {
    return (value * 100).toFixed(0)
}
const parserInput = (value: number) => {
    return (value / 100)
}

const openSettingPanel = () => {
    settingPanelRef.value.openPanel = true
}
const openPublishPanel = async () => {
    publishWorkLoading.value = true
    try {
        await reqPublishWork($store.state.editorStore.page.id)
        publishPanelRef.value.openPanel = true
        publishPanelRef.value.changeTab(1)
    } catch (error) {

    } finally {
        publishWorkLoading.value = false
    }
}

const handleSave = () => {
    saveWorkLoading.value = true
    $store.dispatch('editorStore/saveWork').finally(() => {
        saveWorkLoading.value = false
    })
}

const setPageName = (val: string) => {
    $store.commit('editorStore/setPageName', val)
}

// 因为要跳转的路由复用了该组件，即使有v-if
onBeforeRouteUpdate((to, from, next) => {
    if ($store.getters['editorStore/isWithoutSave']) {
        Modal.confirm({
            title: '作品还未保存,是否保存?',
            okText: '保存',
            okType: 'primary',
            cancelText: '不保存',
            onOk() {
                $store.dispatch('editorStore/saveWork')
                next()
            },
            onCancel() {
                next()
            }
        })
    } else {
        next()
    }
})

timer = setInterval(() => {
    if ($store.getters['editorStore/isWithoutSave']) {
        document.getElementById('saveBt')?.click()
    }
}, 60000) as any
onUnmounted(() => {
    clearInterval(timer!)
    timer = null
})

// defineExpose({ //这个一般是暴露给父组件用的
//     headLeftRef
// })
provide('headLeftRef', headLeftRef)

</script>

<style scoped lang='scss'>
.work-head-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .head-left {
        display: flex;
        gap: 22px;
        align-items: center;
        font-size: 18px;

        .work-name {
            display: flex;
            align-items: center;
            gap: 10px;

            svg {
                font-size: 30px !important;
            }

            .InlineEdit {
                max-width: 170px;
            }
        }
    }

    .head-middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        display: flex;
        gap: 10px;
        align-items: center;
        height: 100%;
    }

    .head-right {
        display: flex;
        align-items: center;
        gap: 13px;

        .head-dataset {
            display: flex;
            align-items: center;
            gap: 13px;
            font-size: 15px;
            margin-right: 15px;
            font-weight: normal;
            color: rgba(0, 0, 0, 0.753);

            .ant-input {
                width: 57px;
            }

            .rate .ant-input {
                width: 42px;
            }

            .ant-input-number {
                width: 60px;
            }
        }
    }
}

@media screen and (max-width:1680px) {
    .head-dataset {
        display: none !important;
    }
}

::v-deep() .ant-input-affix-wrapper-sm {
    padding: 4px 11px;
    font-size: 16px;
}
</style>
