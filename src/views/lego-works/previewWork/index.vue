<template>
    <div class="container" v-if="workData" :style="pageStyle">
        <div v-for="(item, index) in workData?.components" :key="item.id"
            :style="{ ...getParentWrapperStyle(processPx(item.props)), 'z-index': index }">
            <component :is="item.name" v-bind="{ ...processPx(item.props), widgetTitle: item.title }" :id="item.id">
            </component>
        </div>

    </div>
    <!-- <div class="box">我会是vw单位</div> -->
    <!-- <pre>
         {{ workData?.components }}
        </pre> -->
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, StyleValue } from 'vue'
import { reqDetailWork } from '@/api/works/workItem'
import { ContextData } from '@/type/api/work'
import type { AllWidgetProps } from 'question-star-bricks'
import { parentWrapperStyleKeys } from 'question-star-bricks'
import { pick } from 'lodash-es'

const $route = useRoute()
const workData = ref<ContextData>()
const defaultWidth = ref()

const getParentWrapperStyle = (widgetsOwnProps: Partial<AllWidgetProps>) => {
    return pick(widgetsOwnProps, parentWrapperStyleKeys) as any
}

const getWorkDate = async () => {
    const result = await reqDetailWork(Number($route.params.id))
    workData.value = result.data.content
    // 存储默认宽度
    defaultWidth.value = parseInt(workData.value?.props.width as string)
}

// 页面属性
const pageStyle = computed(() => {
    const { props } = workData.value!
    const propsTemp = processPx(props)

    return {
        ...propsTemp,
        'background-image': propsTemp['background-image']
            ? `url(${propsTemp['background-image']})`
            : ''
        // 修复url(undefined)的请求404问题
    } as StyleValue
})

// 加工成vw单位
const processPx = (styleObj: object) => {
    for (const key in styleObj) {
        if (typeof styleObj[key] === 'string' && styleObj[key].includes('px') && styleObj[key].split('px').length === 2) {
            // 找出比例
            const designWidth = defaultWidth.value
            const newValue = ((Number(styleObj[key].replace('px', '')) / designWidth) * 100).toFixed(2) + 'vw'
            styleObj[key] = newValue
        }
    }
    return styleObj
}

onMounted(() => {
    getWorkDate()
})
</script>

<style>
html,
body,
#app {
    height: auto !important;
}
</style>
<style scoped lang='scss'>
.container {
    position: relative;
    background-size: cover;
}

.box {
    border: 1px solid red;
    width: 300px;
    height: 667px;
}
</style>
