<template>

    <!-- <a-popconfirm title="确定删除选择组件吗" ok-text="确定" cancel-text="取消"> -->
    <TooltipButton icon='DeleteOutlined' :disabled="!hasSelectWidget" tip="删除"
        @click="$store.commit('editorStore/deleteWidget', {})"></TooltipButton>
    <!-- </a-popconfirm> -->

    <TooltipButton :icon="selectWidget?.isHidden ? 'EyeOutlined' : 'EyeInvisibleOutlined'" :disabled="!hasSelectWidget"
        :tip="selectWidget?.isHidden ? `显示` : `隐藏`" @click="changeWidgetStatus('isHidden', !selectWidget?.isHidden)">
    </TooltipButton>
    <TooltipButton :icon="selectWidget?.isLocked ? 'UnlockOutlined' : 'LockOutlined'" :disabled="!hasSelectWidget"
        :tip="selectWidget?.isLocked ? `解锁` : `锁定`" @click="changeWidgetStatus('isLocked', !selectWidget?.isLocked)">
    </TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='CopyOutlined' @click="$store.commit('editorStore/copyComponent')" :disabled="!hasSelectWidget"
        tip="复制"></TooltipButton>
    <TooltipButton icon='SnippetsOutlined' @click="$store.commit('editorStore/pasteComponent')"
        :disabled="!$store.state.editorStore.copiedComponent" tip="粘贴"></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='BookOutlined' tip="快捷键提示" @click="showKeyboardTip"></TooltipButton>
    <TooltipButton icon='QuestionOutlined' tip="步骤演示" @click="showTourStep"></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='UndoOutlined' @click="undoOrRedo('undo')" :disabled="!$store.getters['editorStore/allowUndo']"
        tip="撤销"></TooltipButton>
    <TooltipButton icon='RedoOutlined' @click="undoOrRedo('redo')" :disabled="!$store.getters['editorStore/allowRedo']"
        tip="重做"></TooltipButton>

    <keyboardTip ref="keyboardTipRef"></keyboardTip>
    <tourStep ref="tourStepRef"></tourStep>

</template>

<script setup lang='ts'>
import { useStore } from '@/store/index'
import { computed, ref } from 'vue'
import { widgetData } from '@/type/widgets/index'
import keyboardTip from './keyboard-tip.vue'
import tourStep from './tour-step.vue'

const $store = useStore()
const keyboardTipRef = ref()
const tourStepRef = ref()

const hasSelectWidget = computed(() => {
    return $store.state.editorStore.currentComponent !== ''
})

const selectWidget = computed<widgetData | null>(() => {
    return $store.getters['editorStore/selectedWidget']
})

const showKeyboardTip = () => {
    keyboardTipRef.value.switchModel = true
}

const showTourStep = () => {
    tourStepRef.value.openTour = true
}

const undoOrRedo = (type: 'undo' | 'redo') => {
    $store.dispatch('editorStore/' + type)
}

const changeWidgetStatus = (key: string, newValue: boolean | string) => {
    $store.commit('editorStore/updateWidget', {
        changeKey: key,
        changeValue: newValue,
        changeType: 'widget'
    })
}
</script>

<style scoped lang='scss'>
.divider {
    height: 100%;
    margin: 0px;
}
</style>
