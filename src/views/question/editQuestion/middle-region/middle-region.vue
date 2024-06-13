<template>
    <div class="middle-box ">
        <!-- 可能需要符合文档流的元素才能排序 -->
        <VueDraggableNext class="VueDraggableNext" v-model="dragComponentsData" :sort="false" group="draggableGroup">
            <editWrapper v-for="item in $store.state.editorStore.components" :key="item.id" :widgetId="item.id!"
                @selectWidget="selectWidget"
                :isActive="item.id == $store.state.editorStore.currentComponent && !item.isHidden">
                <template v-if="!item.isHidden">
                    <component :is="item.name" v-bind="item.name == 'QsText' ?
                        { ...item.props, widgetTitle: item.title } : { ...item.props }">
                    </component>
                </template>
            </editWrapper>
        </VueDraggableNext>
    </div>

    <!-- <pre>{{ $store.getters['editorStore/currentComponentWidget'] }}</pre> -->
    <!-- <pre>{{ $store.state.editorStore.components }}</pre> -->
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from '@/store/index' // 采用重写后的useStore方法
import editWrapper from './components/edit-wrapper.vue'
import type { widgetData } from '@/type/widgets/index'

const $store = useStore()

const selectWidget = (id: string) => {
    $store.commit('editorStore/selectWidget', id)
}
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
    background-color: white;
    padding: 24px 20px;
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
