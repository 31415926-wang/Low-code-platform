<template>
    <ul class="layer-list">
        <li class="layer-row" v-for="(item, index) in $store.state.editorStore.components" :key='index'
            :class="item.id === $store.state.editorStore.currentComponent ? 'active' : ''"
            @click="selectLayer(item.id!)" draggable="true" @dragenter="onDropEnter(index, $event)" @drop="onDrop"
            @dragover="onDragOver" @dragstart="onDragstart(index, $event)">
            <TooltipButton :icon="item.isHidden ? 'EyeOutlined' : 'EyeInvisibleOutlined'"
                :tip="item.isHidden ? '显示' : '隐藏'"
                @click="(event) => changeLayerStatus(item.id!, 'isHidden', !item.isHidden, event)">
            </TooltipButton>

            <TooltipButton :icon="item.isLocked ? 'UnlockOutlined' : 'LockOutlined'" :tip="item.isLocked ? '解锁' : '锁定'"
                @click="changeLayerStatus(item.id!, 'isLocked', !item.isLocked, $event)">
            </TooltipButton>

            <InlineEdit :value="item.layerName!"
                @update:value="(event) => changeLayerStatus(item.id!, 'layerName', event)" class="name"></InlineEdit>

            <TooltipButton icon='DragOutlined'  placement="right" tip="移动图层" class="dragButton"></TooltipButton>
        </li>
    </ul>

</template>

<script setup lang='ts'>
import { useStore } from '@/store/index'
import { reactive } from 'vue'

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

const dragData = reactive({
    start: -1,
    end: -1,
    allDrag: false // 防止其它拖拽元素进入监测区
})

// 拖拽
const onDragstart = (startIndex: number, event: DragEvent) => {
    dragData.start = startIndex
    dragData.allDrag = true
    // event.dataTransfer?.setData('application/json', JSON.stringify(dragData)) //可以通过拖拽事件存储数据
}
const onDropEnter = (endIndex: number, event: DragEvent) => {
    if (dragData.allDrag && dragData.start !== endIndex) {
        dragData.end = endIndex
        const {
            start,
            end
        } = dragData
        // arrayMoveMutable($store.state.editorStore.components, start, end) // 直接修改有时候不一定能影响到仓库，可能是开启了持久化，需要仓库有内容变动
        $store.commit('editorStore/adjustList', {
            start,
            end
        })
        dragData.start = endIndex // 移动一次成功后，下一次交换的起始索引应该改变
    }
}
const onDragOver = (e: DragEvent) => {
    e.preventDefault() // 确保drop触发
}
const onDrop = (event: DragEvent) => {
    // console.log('onDrop2', event.dataTransfer?.getData('application/json'))
    dragData.allDrag = false
}
</script>

<style scoped lang='scss'>
.layer-list {

    li {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 11px 15px;
        border: 1px solid transparent;
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
        border: 1px solid rgb(233, 175, 81);
    }

    // 该伪类来代替拖动
    .layer-row:active {
        background-color: rgba(255, 230, 191, 0.6);
    }

    .layer-row:hover {
        background-color: rgba(255, 230, 191, 0.6);
    }

    ::v-deep() .dragButton {
        cursor: move;
    }

}
</style>
