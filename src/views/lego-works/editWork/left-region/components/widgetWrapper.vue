<template>
    <div class="widget-wrapper" draggable="true" @click="handleClick" @dragstart="ondragstart($event, $props.widget)">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>
import { widgetData } from '@/type/store/modules/editorStore'
import { useStore } from '@/store/index'
import useDragWidget from '@/hook/useDragWidget'

const $props = defineProps<{
    widget: widgetData
}>()

const $store = useStore()
const { ondragstart } = useDragWidget()

const handleClick = () => {
    $store.commit('editorStore/addWidget', {
        widgetData: $props.widget
    })
}

</script>

<style scoped lang='scss'>
.widget-wrapper {
    cursor: pointer;
}
</style>
