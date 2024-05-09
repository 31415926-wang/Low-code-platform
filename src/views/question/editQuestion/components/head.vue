<template>
    <div class="question-head-box">
        <div class="head-left">
            <a-button type="default" size="large" href="/">
                <template #icon>
                    <RollbackOutlined />
                </template>
            </a-button>
            问卷名称
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
import HeadTools from './head-tools.vue'
import { useRouter } from 'vue-router'
const $router = useRouter()

const handleSave = () => {
    console.log()
}
const handlePublish = () => {
    console.log()
    $router.push({ path: '/' })
}
</script>

<style scoped lang='scss'>
.question-head-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .head-left {
        display: flex;
        gap: 15px;
        align-items: center;
        font-size: 20px;
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
</style>
