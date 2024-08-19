<template>
    <component :is="$props.tag" :style="styleProps">
        <pre>{{ $props.textValue || $props.titleValue || $props.widgetTitle }}</pre>
    </component>

</template>

<script setup lang='ts'>
import { textProps, commonProps } from '@/type/widgets/index'
import { textStyleKeys } from '@/widgets/widgetStyleKey'
import useHandleWidget from '@/hook/useHandleWidget'

const $props = defineProps<commonProps & textProps & {
    widgetTitle: string // 用于空文本时显示为物料标题
}>()

// 注意，prop接收后的属性key都会变成驼峰
const { styleProps } = useHandleWidget<commonProps & textProps & { widgetTitle: string }>($props, textStyleKeys)

/* 这里似乎会有缓存问题，但添加新样式名后 */
// console.log('断点', styleProps)

</script>

<style scoped lang='scss'></style>
