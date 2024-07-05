<template>
    <div class="widget-wrapper" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>
import { widgetData } from '@/type/widgets/index'
import { useStore } from '@/store/index'
const $props = defineProps<{
    widget: widgetData
}>()

const $store = useStore()

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
