<template>
    <component :is="$props.tag" :style="styleProps">
        {{ $props.textValue || $props.titleValue || $props.widgetTitle }}</component>

</template>

<script setup lang='ts'>
import { textProps, commonProps } from '@/type/widgets/index'
import { textStyleKeys } from '@/widgets/defaultProps'
import useHandleWidget from '@/hook/useHandleWidget'

const $props = defineProps<commonProps & textProps & {
    widgetTitle: string // 用于空文本时显示为物料标题
}>()

const { styleProps } = useHandleWidget<commonProps & textProps & { widgetTitle: string }>($props, textStyleKeys)

</script>

<style scoped lang='scss'></style>
