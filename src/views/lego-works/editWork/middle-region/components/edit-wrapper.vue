<template>
    <div class="edit-wrapper" :class="{ active: isActive }" @mousedown="moveSeriesEvent">
        <slot></slot>
        <!-- 拖拽大小的四个点 -->
        <div class="resize-point" @mousedown.stop="resizeSeriesEvent">
            <div class="point1"></div>
            <div class="point2"></div>
            <div class="point3"></div>
            <div class="point4"></div>
            <div class="pointA"></div>
            <div class="pointB"></div>
            <div class="pointC"></div>
            <div class="pointD"></div>
        </div>
        <!-- 旋转点 -->
        <div class="rotatePoint" @mousedown.stop="rotateSeriesEvent">
            <IconSvg name="editor-rotate" fill="#f4801a"></IconSvg>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue'
import useMouseGroupEvent from '@/hook/useMouseGroupEvent'
import { AllWidgetProps } from 'question-star-bricks'
import {
    widgetData
} from '@/type/store/modules/editorStore'
import { message } from 'ant-design-vue'
import { throttle } from 'lodash-es'
import eventBus from '@/utils/eventBus'

const $props = defineProps<{
    widgetId: string,
    isActive: boolean,
}>()

interface updateWidgetPropsParams {
    Key: keyof AllWidgetProps | string[],
    Value: any
}
// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'selectWidget', params: string): void,
    (e: 'updateWidgetProps', params: updateWidgetPropsParams): void,
    (e: 'getWidget', params: (params: widgetData) => void): void,
}>()

const selectWidget = () => {
    $emit('selectWidget', $props.widgetId)
}

// 计算画布区域内的x范围与y的范围
const computeEditorRange = () => {
    const allowRange = new Map()
    const editorBoxDom = document.querySelector('.middle-box') as HTMLElement
    const editorBoxDomRect = editorBoxDom.getBoundingClientRect()

    const xRange = {
        min: editorBoxDomRect.left,
        max: editorBoxDomRect.left + editorBoxDomRect.width
    }
    const yRange = {
        min: editorBoxDomRect.top,
        max: editorBoxDomRect.top + editorBoxDomRect.height
    }
    allowRange.set('X', xRange)
    allowRange.set('Y', yRange)
    return allowRange
}

// 处理拖拽移动、尺寸改变的鼠标移动距离
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
const calculateDistance = (needAbs = false) => { // 得出鼠标移动的X、Y变化值
    const distanceX = moveData.end.X - moveData.start.X
    const distanceY = moveData.end.Y - moveData.start.Y
    return needAbs
        ? {
            distanceX: Math.abs(distanceX),
            distanceY: Math.abs(distanceY)
        }
        : {
            distanceX,
            distanceY
        }
}

const tipShow = throttle((context: string) => {
    message.info(context)
}, 3000)

// 高阶函数，1.处理锁定时不要移动和修改尺寸，只能修改中间执行层即可
//  2.不要让移动、修改尺寸的中间层到画布之外
const judgeLockedWrapper = (originFn) => {
    // 自定义添加前置处理
    const wrapperFn = (...args) => {
        // 若元素已锁定，则不移动
        $emit('getWidget', (params: widgetData) => {
            try {
                if (params.isLocked) {
                    throw new Error('锁定')
                }
                // 如果移动过程到了边界，停止移动、大小改变
                const event = args[0] as MouseEvent
                if (computeEditorRange().get('X').min > event.clientX ||
                    computeEditorRange().get('X').max < event.clientX ||
                    computeEditorRange().get('Y').min > event.clientY ||
                    computeEditorRange().get('Y').max < event.clientY
                ) {
                    tipShow('超出画布范围！')
                    return
                }

                originFn(...args)
            } catch (error) {
                tipShow('元素已锁定')
            }
        })
    }

    return wrapperFn
}

/* 移动、改变尺寸原理：点击时初始化记录，以及目标dom，运动过程计算动态修改目标dom，结束时将目标dom的值情况发送给仓库 */
const onMovestart = function (downEvent: MouseEvent) {
    downEvent.preventDefault() // 避免了误选中文字或者默认拖拽图片和文字的默认行为
    selectWidget()
    moveData.start.X = downEvent.clientX
    moveData.start.Y = downEvent.clientY
}
const onMoveProcess = judgeLockedWrapper(function (moveEvent: MouseEvent, mouseTarget: HTMLElement) {
    // console.log('onMoveProcess')
    moveData.moveProgress = true
    // 先考虑右下角，再考虑其它角发现没问题
    moveData.end.X = moveEvent.clientX
    moveData.end.Y = moveEvent.clientY

    const calculateResult = calculateDistance()
    // 锁定拖拽元素：父级wrapper，直接修改定位（需注意应该查找直接父元素wrapper）
    const goalWrapper = (mouseTarget).closest('.edit-wrapper') as HTMLElement
    if (goalWrapper) {
        // const goalNodeClientRects = goalWrapper.getBoundingClientRect() //里面的偏移量是相对视口的
        goalWrapper.style.left = (goalWrapper.offsetLeft + calculateResult.distanceX) + 'px'
        goalWrapper.style.top = (goalWrapper.offsetTop + calculateResult.distanceY) + 'px'
    }

    // 标线显示与吸附
    eventBus.emit('moveWidget', {
        widgetWrapper: goalWrapper,
        moveProgress: true,
        calculateResult: calculateResult
    })

    // 每计算移动一次，初始的坐标就得改
    onMovestart(moveEvent)
})
const onMoveEnd = function (upEvent: MouseEvent, mouseTarget: HTMLElement) {
    // console.log('onMoveEnd')
    if (!moveData.moveProgress) { // 修复点击即移动
        return
    }
    const goalWrapper = (mouseTarget).closest('.edit-wrapper') as HTMLElement
    // 发送仓库，持久化修改
    $emit('updateWidgetProps', { Key: ['left', 'top'], Value: [goalWrapper.style.left, goalWrapper.style.top] })

    moveData.moveProgress = false
    eventBus.emit('moveWidget', {
        widgetWrapper: goalWrapper,
        moveProgress: false
    })
}

// 将鼠标按下、移动、抬起一系列事件挂载成一个函数
const { mousedownEvent: moveSeriesEvent } = useMouseGroupEvent(onMovestart, onMoveProcess, onMoveEnd)

// 处理拖拽大小
const onResizeStart = function (downEvent: MouseEvent) {
    downEvent.preventDefault()
    // 判断是点击哪个方向, 核心依然是先知道鼠标移动距离
    selectWidget()
    moveData.start.X = downEvent.clientX
    moveData.start.Y = downEvent.clientY
    /* 如果元素开启了缩放，需关闭缩放，不然会有问题 */
    $emit('getWidget', (params: widgetData) => {
        if (params.props.scale !== 1) {
            $emit('updateWidgetProps', { Key: 'scale', Value: 1 })
        }
        if (params.props.rotate !== '0deg') {
            $emit('updateWidgetProps', { Key: 'rotate', Value: '0deg' })
        }
    })
}
const onResizeProcess = judgeLockedWrapper(function (moveEvent: MouseEvent, mouseTarget: HTMLElement) {
    moveData.moveProgress = true
    moveData.end.X = moveEvent.clientX
    moveData.end.Y = moveEvent.clientY
    const { distanceX, distanceY } = calculateDistance() // 不使用绝对值能适应距离变化

    // const goalPoint = moveEvent.target as HTMLElement
    const goalPoint = mouseTarget
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

        // 上边点，影响高、top
        case goalPoint.classList.contains('pointA'):
            goalWidget.style.height = (goalWidgetRect.height - distanceY) + 'px'
            goalWrapper.style.top = (goalWrapper.offsetTop + distanceY) + 'px'
            break

        // 右边点，影响宽
        case goalPoint.classList.contains('pointB'):
            goalWidget.style.width = (goalWidgetRect.width + distanceX) + 'px'
            break

        // 下边点，影响高
        case goalPoint.classList.contains('pointC'):
            goalWidget.style.height = (goalWidgetRect.height + distanceY) + 'px'
            break

        // 左边点，影响宽、left
        case goalPoint.classList.contains('pointD'):
            goalWidget.style.width = (goalWidgetRect.width - distanceX) + 'px'
            goalWrapper.style.left = (goalWrapper.offsetLeft + distanceX) + 'px'
            break
    }
    onMovestart(moveEvent)
})
const onResizeEnd = function (upEvent: MouseEvent, mouseTarget: HTMLElement) {
    // const goalPoint = upEvent.target as HTMLElement
    const goalPoint = mouseTarget
    const goalWrapper = goalPoint.closest('.edit-wrapper') as HTMLElement
    const goalWidget = goalPoint.closest('.edit-wrapper')?.firstElementChild as HTMLElement
    const goalWidgetRect = goalWidget.getBoundingClientRect()

    // 修改仓库对应的物料宽高
    // $emit('updateWidgetProps', { Key: 'width', Value: goalWidgetRect.width + 'px' })
    // $emit('updateWidgetProps', { Key: 'height', Value: goalWidgetRect.height + 'px' })

    const { width, height } = goalWidgetRect
    const { offsetTop, offsetLeft } = goalWrapper

    // console.log('断点1', width)
    // console.log('断点2', height)

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

        case goalPoint.classList.contains('pointA'):
            $emit('updateWidgetProps', { Key: ['height', 'top'], Value: [height + 'px', offsetTop + 'px'] })
            break
        case goalPoint.classList.contains('pointB'):// 右边点
            $emit('updateWidgetProps', { Key: 'width', Value: width + 'px' })
            break
        case goalPoint.classList.contains('pointC'):// 下边点
            $emit('updateWidgetProps', { Key: 'height', Value: height + 'px' })
            break
        case goalPoint.classList.contains('pointD'):
            $emit('updateWidgetProps', { Key: ['width', 'left'], Value: [width + 'px', offsetLeft + 'px'] })
            break
    }
}
const { mousedownEvent: resizeSeriesEvent } = useMouseGroupEvent(onResizeStart, onResizeProcess, onResizeEnd)

const rotateDate = reactive({
    center: {
        X: 0,
        Y: 0
    },
    startDegree: 0,
    endDegree: 0
})
/* 旋转的一系列事件 */
const onRotateStart = (downEvent: MouseEvent, oldMouseTarget?: HTMLElement) => {
    downEvent.preventDefault()
    // 计算物料的中心坐标，旋转角度需相对该坐标
    let wrapperDom
    if (oldMouseTarget) {
        wrapperDom = oldMouseTarget.closest('.edit-wrapper') as HTMLElement
    } else {
        wrapperDom = (downEvent.target as HTMLElement).closest('.edit-wrapper') as HTMLElement
    }
    const wrapperDomRect = wrapperDom.getBoundingClientRect()
    rotateDate.center.X = wrapperDomRect.left + wrapperDomRect.width * 1 / 2
    rotateDate.center.Y = wrapperDomRect.top + wrapperDomRect.height * 1 / 2
    // 一开始的点击时的角度，Math.atan2返回的是弧度，需转为角度
    /* 采用了两个强行理解：相对坐标、变化的角度 */
    rotateDate.startDegree = Math.atan2(downEvent.clientY - rotateDate.center.Y, downEvent.clientX - rotateDate.center.X) * (180 / Math.PI)
}
const onRotateProcess = (moveEvent: MouseEvent, mouseTarget: HTMLElement) => {
    moveEvent.preventDefault()
    rotateDate.endDegree = Math.atan2(moveEvent.clientY - rotateDate.center.Y, moveEvent.clientX - rotateDate.center.X) * (180 / Math.PI)
    const wrapperDom = mouseTarget.closest('.edit-wrapper') as HTMLElement
    wrapperDom.style.rotate = Number(parseFloat(wrapperDom.style.rotate) + rotateDate.endDegree - rotateDate.startDegree) + 'deg'
    onRotateStart(moveEvent, mouseTarget)
}
const onRotateEnd = (upEvent: MouseEvent, mouseTarget: HTMLElement) => {
    const wrapperDom = mouseTarget.closest('.edit-wrapper') as HTMLElement
    // 结束时再影响到仓库
    $emit('updateWidgetProps', { Key: 'rotate', Value: wrapperDom.style.rotate })
}
const { mousedownEvent: rotateSeriesEvent } = useMouseGroupEvent(onRotateStart, onRotateProcess, onRotateEnd)

</script>

<style scoped lang='scss'>
.edit-wrapper {
    cursor: pointer;
    // border: 1px solid transparent;

    .rotatePoint {
        display: none;
    }

    .resize-point {
        display: none;

        div[class^="point"] {
            position: absolute;
            width: 7px;
            height: 7px;
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

        @mixin transformPoint {
            transform: translateX(-50%) translateY(-50%);
        }

        .pointA {
            top: 0;
            left: 50%;
            @include transformPoint();
            cursor: n-resize;
        }

        .pointB {
            top: 50%;
            left: 100%;
            @include transformPoint();
            cursor: w-resize;
        }

        .pointC {
            left: 50%;
            top: 100%;
            @include transformPoint();
            cursor: n-resize;
        }

        .pointD {
            top: 50%;
            left: 0;
            @include transformPoint();
            cursor: w-resize;
        }

    }

    .rotatePoint {
        position: absolute;
        left: 50%;
        top: -15px;
        transform: translateX(-50%) translateY(-50%);
        font-size: 23px;
        cursor: grab;
    }

    &.active {
        border: 1px solid $theme_color;

        .resize-point {
            display: block;
        }

        .rotatePoint {
            display: block;
        }

    }

}
</style>
