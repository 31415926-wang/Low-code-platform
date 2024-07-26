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
            <a-button @click="openSettingPanel">预览与设置</a-button>
            <span></span>
            <a-button type="default" id="saveBt" @click="handleSave" :loading="saveWorkLoading"
                :disabled="!$store.getters['editorStore/isWithoutSave']">
                保存
            </a-button>
            <a-button type="primary" @click="openPublishPanel">
                发布
            </a-button>
        </div>
    </div>

    <settingPanel ref="settingPanelRef"></settingPanel>
    <publishPanel ref="publishPanelRef"></publishPanel>
</template>

<script setup lang='ts'>
import HeadTools from './components/head-tools.vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '@/store/index'
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { Modal } from 'ant-design-vue'
import settingPanel from './components/setting-panel.vue'
import publishPanel from './components/publish-panel.vue'

const headLeftRef = ref()
const settingPanelRef = ref()
const publishPanelRef = ref()

const $store = useStore()
const $router = useRouter()

const saveWorkLoading = ref(false)
// 间隔时间自动保存
let timer: number | null = null

const openSettingPanel = () => {
    settingPanelRef.value.openPanel = true
}
const openPublishPanel = () => {
    publishPanelRef.value.openPanel = true
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
}, 30000)
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
        gap: 13px;
    }
}

::v-deep() .ant-input-affix-wrapper-sm {
    padding: 4px 11px;
    font-size: 16px;
}
</style>
