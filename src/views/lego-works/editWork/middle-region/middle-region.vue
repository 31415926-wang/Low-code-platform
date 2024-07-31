<template>
    <div class="middle-box " :style="{ ...pageStyle }">
        <!-- 网格线 -->
        <gridLine v-if="$store.state.editorStore.openGridLine"></gridLine>

        <!-- 定位相关样式同时也挂载到父包裹层 -->
        <editWrapper ref="EditWrapper" v-for="(item, index) in $store.state.editorStore.components" :key="item.id"
            :widgetId="item.id!" @selectWidget="selectWidget" @updateWidgetProps="updateWidgetProps"
            :isActive="item.id == $store.state.editorStore.currentComponent && !item.isHidden"
            :style="{ ...getParentWrapperStyle(item.props), 'z-index': index }">
            <template v-if="!item.isHidden">
                <component :is="item.name" v-bind="{ ...item.props, widgetTitle: item.title }" :id="item.id">
                </component>
            </template>
        </editWrapper>
    </div>

    <!-- <pre>{{ $store.getters['editorStore/selectedWidget'] }}</pre> -->
</template>

<script setup lang='ts'>
import { computed, ref, onMounted, nextTick } from 'vue'
import { useStore } from '@/store/index' // 采用重写后的useStore方法
import editWrapper from './components/edit-wrapper.vue'
import { AllWidgetProps } from '@/type/widgets/index'
import { parentWrapperStyleKeys } from '@/widgets/defaultProps'
import { pick } from 'lodash-es'
import gridLine from './components/grid-line.vue'
import adjustChidHieght from '@/utils/adjustChidHieght'
import useObserveDomSize from '@/hook/useObserveDomSize'

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

</script>

<style scoped lang='scss'>
.middle-box {
    position: relative;
    width: 100%;
    background-color: white;
    // padding: 24px 20px;
    // border: 1px solid rgb(241, 203, 193);
    overflow: hidden;

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
