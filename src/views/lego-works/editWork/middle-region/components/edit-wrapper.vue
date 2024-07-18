<template>
    <div class="edit-wrapper" :class="{ active: isActive }" @mousedown="moveSeriesEvent">
        <slot></slot>
        <!-- 拖拽大小的四个点 -->
        <div class="resize-point" @mousedown.stop="resizeSeriesEvent">
            <div class="point1"></div>
            <div class="point2"></div>
            <div class="point3"></div>
            <div class="point4"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { throttle } from 'lodash-es'
import useMouseGroupEvent from '@/hook/useMouseGroupEvent'
import { AllWidgetProps } from '@/type/widgets/index'

const $props = defineProps<{
    widgetId: string,
    isActive: boolean
}>()

interface updateWidgetPropsParams {
    Key: keyof AllWidgetProps | string[],
    Value: any
}
// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'selectWidget', params: string): void,
    (e: 'updateWidgetProps', params: updateWidgetPropsParams): void
}>()

const handleClick = () => {
    $emit('selectWidget', $props.widgetId)
}

// 处理拖拽移动
const moveData = reactive({
    moveProgress: false, // 用来判断是否在移动拖拽，才能决定是否修改仓库
    start: {
        X: 0,
        Y: 0
    },
    end: {
        X: 0,
        Y: 0
    }
})
const calculateDistance = () => { // 得出鼠标移动的X、Y变化值
    const distanceX = moveData.end.X - moveData.start.X
    const distanceY = moveData.end.Y - moveData.start.Y
    return {
        distanceX,
        distanceY
    }
}

const onMovestart = function (originalE: MouseEvent) {
    originalE.preventDefault() // 避免了误选中文字或者默认拖拽图片和文字的默认行为
    handleClick()
    moveData.start.X = originalE.clientX
    moveData.start.Y = originalE.clientY
}
const onMove = function (originalE: MouseEvent, documentEvent: MouseEvent) {
    moveData.moveProgress = true
    // 先考虑右下角，再考虑其它角发现没问题
    moveData.end.X = documentEvent.clientX
    moveData.end.Y = documentEvent.clientY

    const calculateResult = calculateDistance()
    // 锁定拖拽元素：父级wrapper，直接修改定位（需注意应该查找直接父元素wrapper）
    const goalWrapper = (originalE.target as HTMLElement).closest('.edit-wrapper') as HTMLElement
    if (goalWrapper) {
        // const goalNodeClientRects = goalWrapper.getBoundingClientRect() //里面的偏移量是相对视口的
        goalWrapper.style.left = (goalWrapper.offsetLeft + calculateResult.distanceX) + 'px'
        goalWrapper.style.top = (goalWrapper.offsetTop + calculateResult.distanceY) + 'px'
    }

    // 每计算移动一次，初始的坐标就得改
    onMovestart(documentEvent)
}
const onMoveEnd = function (originalE: MouseEvent) {
    if (!moveData.moveProgress) { // 修复点击即移动
        return
    }
    const goalWrapper = (originalE.target as HTMLElement).closest('.edit-wrapper') as HTMLElement
    // 发送仓库，持久化修改
    $emit('updateWidgetProps', { Key: ['left', 'top'], Value: [goalWrapper.style.left, goalWrapper.style.top] })

    moveData.moveProgress = false
}

// 将鼠标按下、移动、抬起一系列事件挂载成一个函数
const { mousedownEvent: moveSeriesEvent } = useMouseGroupEvent(onMovestart, onMove, onMoveEnd)

// 处理拖拽大小
const onResizeStart = function (originalE: MouseEvent) {
    originalE.preventDefault()
    // 判断是点击哪个方向, 核心依然是先知道鼠标移动距离
    handleClick()
    moveData.start.X = originalE.clientX
    moveData.start.Y = originalE.clientY
}
const onResizeProcess = function (originalE: MouseEvent, documentEvent: MouseEvent) {
    moveData.moveProgress = true
    moveData.end.X = documentEvent.clientX
    moveData.end.Y = documentEvent.clientY
    const { distanceX, distanceY } = calculateDistance()

    const goalPoint = originalE.target as HTMLElement
    const goalWrapper = goalPoint.closest('.edit-wrapper') as HTMLElement
    const goalWidget = goalPoint.closest('.edit-wrapper')?.firstElementChild as HTMLElement
    /*
       这里没有修改仓库，而是先考虑在视觉层面上
       注意宽高不应该修改在wrapper层，而是物料本身
       而偏移量应该修改在wrapper层
       */
    const goalWidgetRect = goalWidget.getBoundingClientRect() // getBoundingClientRect获取的宽高，不包括边框
    switch (true) {
        case goalPoint.classList.contains('point1'):
            goalWidget.style.width = (goalWidgetRect.width - distanceX) + 'px'
            goalWidget.style.height = (goalWidgetRect.height - distanceY) + 'px'
            goalWrapper.style.top = (goalWrapper.offsetTop + distanceY) + 'px'
            goalWrapper.style.left = (goalWrapper.offsetLeft + distanceX) + 'px'
            break
        case goalPoint.classList.contains('point2'):// 右上角，影响宽高、top
            goalWidget.style.width = (goalWidgetRect.width + distanceX) + 'px'
            // 如果Y是增加的，高只会减小； Y是减小的，高只会增加
            goalWidget.style.height = (goalWidgetRect.height - distanceY) + 'px'
            // top与Y的偏移正相关
            goalWrapper.style.top = (goalWrapper.offsetTop + distanceY) + 'px'
            break
        case goalPoint.classList.contains('point3'): // 左下角, 影响宽高、left
            goalWidget.style.width = (goalWidgetRect.width - distanceX) + 'px'
            goalWidget.style.height = (goalWidgetRect.height + distanceY) + 'px'
            goalWrapper.style.left = (goalWrapper.offsetLeft + distanceX) + 'px'
            break
        case goalPoint.classList.contains('point4'):// 右下角，影响宽高
            goalWidget.style.width = (goalWidgetRect.width + distanceX) + 'px'
            goalWidget.style.height = (goalWidgetRect.height + distanceY) + 'px'
            break
    }
    onMovestart(documentEvent)
}
const onResizeEnd = function (originalE: MouseEvent) {
    const goalPoint = originalE.target as HTMLElement
    const goalWrapper = goalPoint.closest('.edit-wrapper') as HTMLElement
    const goalWidget = goalPoint.closest('.edit-wrapper')?.firstElementChild as HTMLElement
    const goalWidgetRect = goalWidget.getBoundingClientRect()

    // 修改仓库对应的物料宽高
    // $emit('updateWidgetProps', { Key: 'width', Value: goalWidgetRect.width + 'px' })
    // $emit('updateWidgetProps', { Key: 'height', Value: goalWidgetRect.height + 'px' })

    const { width, height } = goalWidgetRect
    const { offsetTop, offsetLeft } = goalWrapper

    switch (true) {
        case goalPoint.classList.contains('point1'):
            $emit('updateWidgetProps', { Key: ['width', 'height', 'top', 'left'], Value: [width + 'px', height + 'px', offsetTop + 'px', offsetLeft + 'px'] })
            break
        case goalPoint.classList.contains('point2'):// 右上角
            $emit('updateWidgetProps', { Key: ['width', 'height', 'top'], Value: [width + 'px', height + 'px', offsetTop + 'px'] })
            break
        case goalPoint.classList.contains('point3'):
            $emit('updateWidgetProps', { Key: ['width', 'height', 'left'], Value: [width + 'px', height + 'px', offsetLeft + 'px'] })
            break
        case goalPoint.classList.contains('point4'):// 右下角
            $emit('updateWidgetProps', { Key: ['width', 'height'], Value: [width + 'px', height + 'px'] })
            break
    }
}
const { mousedownEvent: resizeSeriesEvent } = useMouseGroupEvent(onResizeStart, onResizeProcess, onResizeEnd)

</script>

<style scoped lang='scss'>
.edit-wrapper {
    cursor: pointer;
    border: 1px solid transparent;

    .resize-point {
        display: none;

        div[class^="point"] {
            position: absolute;
            width: 9px;
            height: 9px;
            border: 1px solid $theme_color;
            border-radius: 50%;
            background: white;
        }

        .point1 {
            top: 0;
            left: 0;
            transform: translateX(-50%) translateY(-50%);
            cursor: nwse-resize;
        }

        .point2 {
            top: 0;
            right: 0;
            transform: translateX(50%) translateY(-50%);
            cursor: nesw-resize;
        }

        .point3 {
            bottom: 0;
            left: 0;
            transform: translateX(-50%) translateY(50%);
            cursor: nesw-resize;
        }

        .point4 {
            bottom: 0;
            right: 0;
            transform: translateX(50%) translateY(50%);
            cursor: nwse-resize;
        }
    }

    &.active {
        border: 1px solid $theme_color;

        .resize-point {
            display: block;
        }

    }

}
</style>
