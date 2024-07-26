<template>
    <a-modal v-model:open="switchModel" :width="410" :footer="null" title="快捷键操作" @ok="switchModel = false">
        <ul class="model-inner">
            <li v-for="(item, index) in tipList" :key="index">
                <span class="name">{{ item.name }}</span>
                <span class="text">{{ item.text }}</span>
            </li>
        </ul>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const switchModel = ref<boolean>(false)

interface TipItem {
    name: string,
    text: string
}

const tipList = ref<TipItem[]>([
    {
        name: '拷贝图层',
        text: '⌘C / Ctrl+C'
    },
    {
        name: '粘贴图层',
        text: '⌘V / Ctrl+V'
    },
    {
        name: '删除图层',
        text: 'Backspace / Delete'
    },
    {
        name: '取消选中',
        text: 'ESC'
    },
    {
        name: '撤销',
        text: '⌘Z / Ctrl+Z'
    },
    {
        name: '重做',
        text: '⌘⇧Z / Ctrl+Shift+Z'
    },
    {
        name: '上下左右移动一像素',
        text: '↑ ↓ → ←'
    },
    {
        name: '上下左右移动十像素',
        text: 'Shift + ↑ ↓ → ←'
    }
])

defineExpose({
    switchModel
})
</script>

<style lang="scss" scoped>
.model-inner {
    padding: 15px 26px 10px;

    li {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        opacity: 0.7;
        margin-bottom: 7px;

        &:last-child {
            margin-bottom: 0px;
        }

        .text {
            font-size: 15px;
            color: $theme_color;
        }
    }
}
</style>
