<template>
    <div class="widget-template-box" v-for="(item, index) in defaultTemplate" :key="index">
        <h3>{{ item.label }}</h3>
        <!-- 拖拽跨组件需注意样式问题 -->
        <VueDraggableNext :disabled="true" v-model="item.widgetList" :sort="false" class="widget-type-box"
            :group="{ name: 'draggableGroup', pull: 'clone', put: false }" @dragstart="onDragstart()">
            <a-col :span="11" v-for="(widget, inIndex) in item.widgetList" :key="inIndex">
                <WidgetWrapper class="widget-item" :widget="widget">
                    <span class="icon-box flex-center">
                        <IconSvg :name='widget.icon'></IconSvg>
                    </span>
                    <h4 class="title">{{ widget.title }}</h4>
                </WidgetWrapper>
            </a-col>
        </VueDraggableNext>
    </div>

    <!-- <pre>
        {{ defaultTemplate }}
    </pre> -->
</template>

<script setup lang='ts'>
import defaultTemplate from '@/widgets/defaultTemplate'
import WidgetWrapper from './widgetWrapper.vue'
import { VueDraggableNext } from 'vue-draggable-next'

import { useStore } from '@/store/index'
const $store = useStore()

// 拖拽
const onDragstart = () => {
    $store.commit('editorStore/selectWidget', '')
    console.log('拖拽')
}
</script>

<style scoped lang='scss'>
.widget-type-box {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px 0;

}

::v-deep() svg {
    width: auto !important;
    height: 100% !important;
}
</style>

<style lang='scss'>
.widget-item {
    display: flex;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 7px 0;
    text-align: center;

    .icon-box {
        width: 36%;
        padding: 3px 0;

        .anticon {
            height: 100%;
        }
    }

    .title {
        flex-grow: 1;
        font-size: 15px;
    }
}
</style>
