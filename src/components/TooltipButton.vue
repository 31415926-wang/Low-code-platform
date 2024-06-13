<template>
    <a-tooltip :placement="placement">
        <template #title>
            {{ tip }}
        </template>
        <a-button :shape="shape" v-bind="$attrs" @click="($event) => $emit('click', $event)">
            <template #icon>
                <component :is="icon" />
            </template>
        </a-button>
    </a-tooltip>
</template>

<script setup lang='ts'>
import { useAttrs, withDefaults } from 'vue'
withDefaults(
    // eslint-disable-next-line
    defineProps<{
        tip: string,
        icon: string,
        shape?: string,
        placement?: string
    }>(), {
    shape: 'circle',
    placement: 'bottom'
})
// eslint-disable-next-line
const $emit = defineEmits<{ //vue3中，接收了就是自定义事件
    (e: 'click', param: Event): void
}>()
const $attrs = useAttrs()

</script>

<style scoped lang='scss'></style>
