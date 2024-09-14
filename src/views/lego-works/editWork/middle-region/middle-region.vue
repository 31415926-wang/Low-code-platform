<template>
    <div class="middle-box" :style="pageStyle" @dragover="ondragover" @drop="ondrop">
        <!-- 网格线 -->
        <gridLine v-if="$store.state.editorStore.openGridLine"></gridLine>

        <!-- 贴线与吸附功能 -->
        <stickLine></stickLine>

        <!-- 定位相关样式同时也挂载到父包裹层 -->
        <editWrapper ref="EditWrapper" v-for="(item, index) in widgetComponents" :key="item.id" :widgetId="item.id!"
            @selectWidget="selectWidget" @updateWidgetProps="updateWidgetProps" @getWidget="getWidget"
            :isActive="item.id == $store.state.editorStore.currentComponent && !item.isHidden"
            :style="{ ...getParentWrapperStyle(item.props), 'z-index': index }">
            <template v-if="!item.isHidden">
                <component :is="item.name" v-bind="{ ...item.props, widgetTitle: item.title }" :id="item.id">
                </component>
            </template>
        </editWrapper>
    </div>
    <!-- {{ $store.state.editorStore.page.props }} -->
</template>

<script setup lang='ts'>
import { computed, ref, StyleValue } from 'vue'
import { useStore } from '@/store/index' // 采用重写后的useStore方法
import editWrapper from './components/edit-wrapper.vue'
import type { AllWidgetProps } from 'question-star-bricks'
import { parentWrapperStyleKeys } from 'question-star-bricks'
import { pick } from 'lodash-es'
import gridLine from './components/grid-line.vue'
import stickLine from './components/stickLine.vue'
import {
    widgetData
} from '@/type/store/modules/editorStore'
import useDragWidget from '@/hook/useDragWidget'

const $store = useStore()
const EditWrapper = ref()
const { ondragover, ondrop } = useDragWidget()

// 用于判断鼠标是否在画布之外，引入新bug
// const { isOutside } = useMouseInElement(editorBox)

const widgetComponents = computed(() => {
    return $store.state.editorStore.components
})

/* 注意，直接给行内样式赋值，无论是key或者value有一个不合法，都不会使用该属性，调试也看不到 */
const pageStyle = computed(() => {
    return {
        ...$store.state.editorStore.page.props,
        'background-image': $store.state.editorStore.page.props['background-image']
            ? `url(${$store.state.editorStore.page.props['background-image']})`
            : ''
        // 修复url(undefined)的请求404问题
    } as StyleValue
})

const getParentWrapperStyle = (widgetsOwnProps: Partial<AllWidgetProps>) => {
    return pick(widgetsOwnProps, parentWrapperStyleKeys)
}

const selectWidget = (id: string) => {
    $store.commit('editorStore/selectWidget', id)
}
const getWidget = (fn: (params: widgetData) => void) => {
    fn($store.getters['editorStore/selectedWidget'])
}

interface updateWidgetPropsParams {
    Key: keyof AllWidgetProps | string[],
    Value: any
}
const updateWidgetProps = ({ Key, Value }: updateWidgetPropsParams) => {
    $store.commit('editorStore/updateWidget', {
        changeKey: Key,
        changeValue: Value,
        changeType: 'widgetProps'
    })
}

</script>

<style scoped lang='scss'>
.middle-box {
    position: relative;
    width: 100%;
    // background-color: white;
    // padding: 24px 20px;
    // border: 1px solid rgb(241, 203, 193);
    overflow: hidden;
    background-size: cover;

}

// 确保有拖拽区域
.VueDraggableNext {
    height: 100%;
}

// 拖拽预览的样式影响
::v-deep() .widget-item {
    border: 1px dashed rgb(244, 128, 26);
    width: 60%;

    .title {
        font-size: 14px;
        flex-grow: 1;
    }
}
</style>
