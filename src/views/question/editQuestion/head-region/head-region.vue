<template>
    <div class="question-head-box">
        <div class="head-left">
            <a-button type="default" size="" href="/">
                <template #icon>
                    <RollbackOutlined />
                </template>
            </a-button>
            <div class="work-name">
                <IconSvg name="index-work" fill="#f4801a"></IconSvg>
                <InlineEdit :value="$store.state.editorStore.page.name" @update:value="setPageName"></InlineEdit>
            </div>
        </div>

        <div class="head-middle">
            <HeadTools></HeadTools>
        </div>
        <div class="head-right">
            <a-button type="default" @click="handleSave">
                保存
            </a-button>
            <a-button type="primary" @click="handlePublish">
                发布
            </a-button>
        </div>

    </div>
</template>

<script setup lang='ts'>
import HeadTools from './components/head-tools.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'

const $store = useStore()
const $router = useRouter()

const handleSave = () => {
    console.log()
}
const handlePublish = () => {
    console.log()
    $router.push({ path: '/' })
}

const setPageName = (val: string) => {
    console.log('修改', val)
    // $store.state.editorStore.page.name = val
    $store.commit('editorStore/setPageName', val)
}
</script>

<style scoped lang='scss'>
.question-head-box {
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
        }
    }

    .head-middle {
        display: flex;
        gap: 10px;
        align-items: center;
        height: 100%;
    }

    .head-right {
        display: flex;
        gap: 15px;
    }
}

::v-deep() .ant-input-affix-wrapper-sm {
    padding: 4px 11px;
    font-size: 16px;
}
</style>
