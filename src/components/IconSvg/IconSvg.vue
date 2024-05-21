<template>
    <!-- ant库的图标 -->
    <component v-if="isAntImg" :is="name"></component>
    <svg v-else aria-hidden="true" :width="width" :height="height" :fill="fill">
        <use :xlink:href="`#icon-${$props.name}`"></use>
    </svg>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
const $props = defineProps({
    name: {
        type: String,
        default: ''
    },
    // font-size属性可以直接控制
    width: {
        type: String,
        default: '1em'
    },
    height: {
        type: String,
        default: '1em'
    },
    fill: {
        type: String,
        default: '#000'
    }
})
const isAntImg = computed(() => {
    return $props.name.indexOf('-') === -1
})
</script>

<style scoped lang='scss'></style>
