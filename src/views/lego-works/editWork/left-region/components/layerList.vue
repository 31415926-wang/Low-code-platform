<template>
    <VueDraggableNext v-model="componentsList" handle=".handle" class="layer-list">
        <li class="layer-row" v-for="(item, index) in $store.state.editorStore.components" :key='index'
            :class="item.id === $store.state.editorStore.currentComponent ? 'active' : ''"
            @click="selectLayer(item.id!)">
            <TooltipButton :icon="item.isHidden ? 'EyeOutlined' : 'EyeInvisibleOutlined'"
                :tip="item.isHidden ? '显示' : '隐藏'"
                @click="(event) => changeLayerStatus(item.id!, 'isHidden', !item.isHidden, event)">
            </TooltipButton>

            <TooltipButton :icon="item.isLocked ? 'UnlockOutlined' : 'LockOutlined'" :tip="item.isLocked ? '解锁' : '锁定'"
                @click="changeLayerStatus(item.id!, 'isLocked', !item.isLocked, $event)">
            </TooltipButton>

            <InlineEdit :value="item.layerName!"
                @update:value="(event) => changeLayerStatus(item.id!, 'layerName', event)" class="name"></InlineEdit>

            <TooltipButton icon='DragOutlined' placement="right" class="dragButton handle" tip="移动图层"></TooltipButton>
        </li>
    </VueDraggableNext>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store/index'
import { VueDraggableNext } from 'vue-draggable-next'

const $store = useStore()

const selectLayer = (id: string) => {
    $store.commit('editorStore/selectWidget', id)
}

const changeLayerStatus = (id: string, key: string, newValue: boolean | string, event?: Event) => { // 参数：选中的物料id、要修改的key、对应的新值
    event && event.stopPropagation()

    selectLayer(id)
    $store.commit('editorStore/updateWidget', {
        changeKey: key,
        changeValue: newValue,
        changeType: 'widget'
    })
}

const componentsList = computed({
    get() {
        return $store.state.editorStore.components
    },
    set(val) {
        $store.commit('editorStore/setList', { newlist: val })
    }
})
</script>

<style scoped lang='scss'>
.layer-list {

    li {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 11px 15px;
        border-bottom: 1px solid rgba(150, 150, 150, 0.4);
        cursor: pointer;

        .name {
            flex-grow: 1;
            margin-left: 3px;
            font-size: 14px;
            font-weight: lighter;
            color: rgb(53, 52, 52)
        }
    }

    .layer-row.active {
        background-color: rgb(255, 230, 191)
    }

    ::v-deep() .dragButton {
        cursor: move;
    }
}
</style>
