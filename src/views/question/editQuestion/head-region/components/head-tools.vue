<template>

    <!-- <a-popconfirm title="确定删除选择组件吗" ok-text="确定" cancel-text="取消"> -->
        <TooltipButton icon='DeleteOutlined' :disabled="disabled" tip="删除"  @click="hanldDelect"></TooltipButton>
    <!-- </a-popconfirm> -->

    <TooltipButton icon='EyeInvisibleOutlined' disabled tip="隐藏"></TooltipButton>
    <TooltipButton icon='LockOutlined' disabled tip="解锁/锁定" type="primary"></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='CopyOutlined' :disabled="disabled" tip="复制"></TooltipButton>
    <TooltipButton icon='SnippetsOutlined' disabled tip="粘贴"></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='UndoOutlined' disabled tip="撤销"></TooltipButton>
    <TooltipButton icon='RedoOutlined' disabled tip="重做"></TooltipButton>

</template>

<script setup lang='ts'>
import { useStore } from '@/store/index'
import { computed } from 'vue'
import { notification } from 'ant-design-vue'

const $store = useStore()

const disabled = computed(() => {
    return !($store.state.editorStore.currentComponent.length > 0)
})

const hanldDelect = () => {
    $store.commit('editorStore/deleteWidget')
    openNotification('删除选中组件成功')
}

const openNotification = (tip: string) => {
    notification.success({
        message: tip,
        duration: 2.5
    })
}

</script>

<style scoped lang='scss'>
.divider {
    height: 100%;
    margin: 0px;
}
</style>
