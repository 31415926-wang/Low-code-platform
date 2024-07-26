<template>
    <div class=" middle-box custom-scrollbar" :style="{ ...pageStyle }">
        <!-- 排序功能暂时屏蔽：海报模式有问题 -->
        <!-- <VueDraggableNext :disabled="true" class="VueDraggableNext" v-model="dragComponentsData" :sort="false"
            :force-fallback="true" group="draggableGroup"> -->
        <!-- 定位相关样式同时也挂载到父包裹层 -->
        <editWrapper ref="EditWrapper" v-for="(item, index) in $store.state.editorStore.components" :key="item.id"
            :widgetId="item.id!" @selectWidget="selectWidget" @updateWidgetProps="updateWidgetProps"
            :isActive="item.id == $store.state.editorStore.currentComponent && !item.isHidden"
            :style="{ ...getParentWrapperStyle(item.props), 'z-index': index }">
            <template v-if="!item.isHidden">
                <component :is="item.name" v-bind="{ ...item.props, widgetTitle: item.title }" :id="item.id">
                </component>
                <!-- <pre> {{ item.props }}</pre> -->
            </template>
        </editWrapper>
        <!--  </VueDraggableNext> -->
    </div>

    <!-- <pre>{{ $store.getters['editorStore/selectedWidget'] }}</pre> -->
    <!-- <pre>{{ $store.state.editorStore.page }}</pre> -->
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from '@/store/index' // 采用重写后的useStore方法
import editWrapper from './components/edit-wrapper.vue'
import type { widgetData } from '@/type/widgets/index'
import { AllWidgetProps } from '@/type/widgets/index'
import { parentWrapperStyleKeys } from '@/widgets/defaultProps'
import { pick } from 'lodash-es'

const $store = useStore()
const EditWrapper = ref()

const pageStyle = computed<any>(() => {
    return $store.state.editorStore.page.props
})

const getParentWrapperStyle = (widgetsOwnProps: Partial<AllWidgetProps>) => {
    return pick(widgetsOwnProps, parentWrapperStyleKeys)
}

const selectWidget = (id: string) => {
    $store.commit('editorStore/selectWidget', id)
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

// 拖拽库响应的数据更新
const dragComponentsData = computed({
    get() {
        return $store.state.editorStore.components
    },
    set(newValue: widgetData[]) {
        // 没有id便是来自物料的待初始化的项
        let waitAddWidgetIndex = -1// 即将添加的物料所在的索引
        const waitAddWidget = newValue.find((item: widgetData, index: number) => {
            if (item.id === undefined) {
                waitAddWidgetIndex = index
                return true
            } else {
                return false
            }
        })
        console.log('set', waitAddWidgetIndex)
        if (waitAddWidgetIndex !== -1) { // 严谨
            $store.commit('editorStore/addWidget', {
                widgetData: waitAddWidget,
                widgetIndex: waitAddWidgetIndex
            })
        }
    }
})

</script>

<style scoped lang='scss'>
.middle-box {
    position: relative;
    height: 100%;
    background-color: white;
    padding: 24px 20px;
    border: 1px solid rgb(241, 203, 193);
    overflow-x: hidden;
    overflow-y: auto;
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
