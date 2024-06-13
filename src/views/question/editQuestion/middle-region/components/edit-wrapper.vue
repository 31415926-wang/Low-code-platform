<template>
    <div class="wrapper" :class="{ active: isActive }" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup lang='ts'>

const $props = defineProps<{
    widgetId: string,
    isActive: boolean
}>()

// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'selectWidget', val: string): void
}>()

const handleClick = () => {
    $emit('selectWidget', $props.widgetId)
}
</script>

<style scoped lang='scss'>
.wrapper {
    cursor: pointer;
    border: 1px solid transparent;

    &.active {
        border: 1px solid rgba(255, 166, 0, 0.721);
    }
}
</style>
