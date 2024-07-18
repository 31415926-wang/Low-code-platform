<template>
    <div :style="boxStyle">
        <!-- viewBox定义了视口范围，使得 SVG 的坐标系统是正方形，范围从 (0,0) 到 (100,100)。 -->
        <!-- preserveAspectRatio 属性用于控制 SVG 图形在其视口内部的显示方式。它可以确保 SVG 图形在不同尺寸的视口中按照指定的规则进行缩放和对齐。
            第一个方式是对齐方式、第二个决定是否保存比例
        -->
        <svg viewBox="0 0 100 100" preserveAspectRatio="none slice">
            <polygon points="0 100,50 0 ,100 100" :fill="colorValue" v-if="$props.shapeValue === 'triangle'" />

            <rect x="0" y="0" width="100" height="100" :fill="colorValue" v-else-if="$props.shapeValue === 'square'">
            </rect>

            <circle cx='50%' cy='50%' r='50%' :fill="colorValue" v-else-if="$props.shapeValue === 'circular'"></circle>
        </svg>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { shapeProps } from '@/type/widgets/index'
import { shapeStyleKeys } from '@/widgets/defaultProps'
import useHandleWidget from '@/hook/useHandleWidget'
import { pick } from 'lodash-es'

const $props = defineProps<shapeProps & {
    widgetTitle: string // 用于空文本时显示为物料标题
}>()

// 注意，prop接收后的属性key都会变成驼峰
const { styleProps } = useHandleWidget<shapeProps & { widgetTitle: string }>($props, shapeStyleKeys)

const boxStyle = computed(() => {
    return pick(styleProps.value, ['height', 'width', 'opacity', 'rotate'])
})

const colorValue = computed(() => {
    return Object.values(pick(styleProps.value, ['backgroundColor']))[0]
})

</script>

<style scoped lang='scss'>
svg {
    width: 100%;
    height: 100%;
}
</style>
