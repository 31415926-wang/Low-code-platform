<template>
    <a-tooltip placement="bottom">
        <template #title>
            {{ tip }}
        </template>
        <a-button :shape="shape" v-bind="$attrs">
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
        shape?: string
    }>(), {
    shape: 'circle'
})

const $attrs = useAttrs()

</script>

<style scoped lang='scss'></style>
