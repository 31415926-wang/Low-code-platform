<template>
    <div class="stickLine">
        <template v-for="(value, key) in lines" :key="key">
            <div class="line" :class="key.includes('x') ? 'xline' : 'yline'" v-show="value" :id="key"
                :style="key.includes('x') ? { top: moveWidgetDistance[key] + 'px', left: 0 } : { top: 0, left: moveWidgetDistance[key] + 'px' }">
            </div>
        </template>
        <!-- <pre>
    {{ moveWidgetDistance.yl }}
    {{ moveWidgetDistance.yc }}
    {{ moveWidgetDistance.yr }}
</pre>
        <pre>
    {{ lines }}
</pre> -->
    </div>

</template>

<script setup lang='ts'>
import { reactive, ref, nextTick } from 'vue'
import eventBus from '@/utils/eventBus'
import { useStore } from '@/store/index'
import { widgetData } from '@/type/store/modules/editorStore'
// import { throttle, debounce } from 'lodash-es'

const $store = useStore()

const lines = reactive({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false
})
const diff = 12

interface AxisData {
    xt: number,
    xc: number,
    xb: number,
    yl: number,
    yc: number,
    yr: number
}

const moveWidgetDistance = reactive<AxisData>({
    xt: 0,
    xc: 0,
    xb: 0,
    yl: 0,
    yc: 0,
    yr: 0
})
// 有线的时候吸附一次
const openAdsorb = reactive({
    xt: true,
    xc: true,
    xb: true,
    yl: true,
    yc: true,
    yr: true
})
const editorAxis = reactive({
    top: 0,
    left: 0
})

type CalculateResult = {
    distanceX: number,
    distanceY: number
}
type Params = {
    widgetWrapper: HTMLElement,
    moveProgress: boolean,
    calculateResult: CalculateResult
}

const calculateResult = ref<CalculateResult>({
    distanceX: 0,
    distanceY: 0
})

// @ts-ignore
eventBus.on('moveWidget', (params: Params) => {
    /*  如果元素没在移动，不显示标线、也不贴边处理;
 如果元素在移动，判断所有的物料的六个线，哪些在贴边距离的范围内，显示标线再吸附。 */
    if (params.moveProgress) {
        const widgetWrapper = params.widgetWrapper
        setEditorAxis(widgetWrapper)
        setMoveWidgetData(widgetWrapper)
        handleAllWidgetStickLine()
        calculateResult.value = params.calculateResult
    } else {
        // 隐藏所有标线
        for (const key in lines) {
            lines[key] = false
        }
    }
})

const setEditorAxis = (widgetWrapper: HTMLElement) => {
    const editorDom = widgetWrapper.closest('.middle-box') as HTMLElement
    const editorDomRect = editorDom.getBoundingClientRect()
    editorAxis.top = editorDomRect.top
    editorAxis.left = editorDomRect.left
}
const setMoveWidgetData = (widgetWrapper: HTMLElement) => {
    // 将当前动态移动的物料6个边界存储起来
    const widgetWrapperRect = widgetWrapper.getBoundingClientRect()
    moveWidgetDistance.xt = widgetWrapper.offsetTop
    moveWidgetDistance.xc = widgetWrapper.offsetTop + widgetWrapperRect.height * 1 / 2
    moveWidgetDistance.xb = widgetWrapper.offsetTop + widgetWrapperRect.height
    moveWidgetDistance.yl = widgetWrapper.offsetLeft
    moveWidgetDistance.yc = widgetWrapper.offsetLeft + widgetWrapperRect.width * 1 / 2
    moveWidgetDistance.yr = widgetWrapper.offsetLeft + widgetWrapperRect.width
}

type widgetAxisData = {
    id: string,
    axisData: AxisData
}
const handleAllWidgetStickLine = async () => {
    // 将所有物料的每个物料的6个边界，存起来，以做判断
    const components = $store.state.editorStore.components
    const widgetAxisArr: widgetAxisData[] = [] as widgetAxisData[]
    await nextTick()
    components.forEach((component: widgetData) => {
        if (component.id === $store.state.editorStore.currentComponent) {
            return
        }
        const WidgetDom = document.getElementById(component.id!) as HTMLElement
        const WidgetDomWrapper = WidgetDom.closest('.edit-wrapper') as HTMLElement
        const WidgetDomWrapperRect = WidgetDomWrapper.getBoundingClientRect()

        const temp: AxisData = {
            xt: WidgetDomWrapper.offsetTop,
            xc: WidgetDomWrapper.offsetTop + WidgetDomWrapperRect.height * 1 / 2,
            xb: WidgetDomWrapper.offsetTop + WidgetDomWrapperRect.height,
            yl: WidgetDomWrapper.offsetLeft,
            yc: WidgetDomWrapper.offsetLeft + WidgetDomWrapperRect.width * 1 / 2,
            yr: WidgetDomWrapper.offsetLeft + WidgetDomWrapperRect.width
        }
        widgetAxisArr.push({
            id: component.id!,
            axisData: temp
        })
    })
    // console.log('结果数组', widgetAxisArr)
    onShowLines(widgetAxisArr)
}

const onShowLines = (widgetAxisArr: widgetAxisData[]) => {
    // 当前物料的六线逐个与所有物料的六线对比，默认将六线与当前移动物料对齐，判断到吸附范围，再做两步，吸附和显示对应的线即可
    for (const key in moveWidgetDistance) {
        // 当前物料的一条线，如果数组中有一个数值在吸附范围，则显示该线并吸附
        // if (!key.includes('y')) {
        //     continue
        // }
        let valuesArr: number[] = []
        widgetAxisArr.forEach((widgetAxis: widgetAxisData) => {
            let values: number[]
            if (key.includes('x')) {
                values = Object.values(widgetAxis.axisData).slice(0, 3)
            } else {
                values = Object.values(widgetAxis.axisData).slice(3)
            }
            valuesArr = [...valuesArr, ...values]
        })

        // 如果在该方向存在一个值在吸附范围
        const showLineResult = valuesArr.find((value) => {
            // return !lines[key] && (moveWidgetDistance[key] <= value + diff) && (moveWidgetDistance[key] >= value - diff)
            return !lines[key] && (Math.abs(moveWidgetDistance[key] - value) <= diff)
        })
        if (showLineResult) {
            // 显示标线
            lines[key] = true
            // console.log('显示标线')
            // 吸附
            onAdsorb(key, showLineResult)
        } else {
            // 该方向的线没有一个值在吸附范围
            lines[key] = false
        }
    }
}

const onAdsorb = async (key: string, absorbValue: number) => {
    console.log('selectWidgetDom1', $store.state.editorStore.currentComponent)
    console.log('selectWidgetDom2', $store.getters['editorStore/selectWidgetDom'])
    await nextTick()
    const currentComponentDom = $store.getters['editorStore/selectWidgetDom'] as HTMLElement
    const currentComponentDomRect = currentComponentDom.getBoundingClientRect()
    const currentComponentDomWrapper = currentComponentDom.closest('.edit-wrapper') as HTMLElement
    // 需分方向，解决一个方向移动时，多个方向都触发吸附
    if (openAdsorb[key]) {
        if (key.includes('xt') && calculateResult.value.distanceY < 0) {
            currentComponentDomWrapper.style.top = absorbValue + 'px'
            tempFn(key)
        }
        if (key.includes('xb') && calculateResult.value.distanceY > 0) {
            currentComponentDomWrapper.style.top = absorbValue - currentComponentDomRect.height + 'px'
            tempFn(key)
        }
        if (key.includes('yl') && calculateResult.value.distanceX < 0) {
            currentComponentDomWrapper.style.left = absorbValue + 'px'
            tempFn(key)
        }
        if (key.includes('yr') && calculateResult.value.distanceY > 0) {
            currentComponentDomWrapper.style.left = absorbValue - currentComponentDomRect.width + 'px'
            tempFn(key)
        }
    }
}

const tempFn = (key: string) => {
    openAdsorb[key] = false // 吸附一次后，过一会再开启
    setTimeout(() => {
        openAdsorb[key] = true
    }, 800)
}

</script>

<style scoped lang='scss'>
.stickLine {
    position: relative;
    width: 100%;
    height: 100%;

    .line {
        position: absolute;
        background-color: #f4801ad2;
    }

    .xline {
        width: 100%;
        height: 1px;
    }

    .yline {
        height: 100%;
        width: 1px;
    }
}
</style>
