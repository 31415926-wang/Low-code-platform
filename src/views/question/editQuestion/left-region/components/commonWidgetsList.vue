<template>
    <div class="widget-template-box" v-for="(item, index) in defaultTemplate" :key="index">
        <h3>{{ item.label }}</h3>
        <!-- 拖拽跨组件需注意样式问题 -->
        <!-- <VueDraggableNext :disabled="true" v-model="item.widgetList" :sort="false" class="widget-type-box"
            :group="{ name: 'draggableGroup', pull: 'clone', put: false }" @dragstart="onDragstart()">
             -->
        <div :class="item.isRenderCard ? 'widget-card-box' : 'widget-type-box'">
            <a-col :span="11" v-for="(widget, inIndex) in item.widgetList" :key="inIndex">
                <WidgetWrapper class="widget-item" :widget="widget">
                    <span v-if="!item.isRenderCard" class="icon-box flex-center">
                        <IconSvg :name='widget.icon'></IconSvg>
                    </span>
                    <h4 class="title"
                        :style="item.renderStyleKey ? { [item.renderStyleKey]: widget.props[item.renderStyleKey] } : {}">
                        {{ widget.title }}
                    </h4>
                </WidgetWrapper>
            </a-col>
        </div>
        <!-- </VueDraggableNext> -->
    </div>

    <!-- <div style="color:red">{{ $store.state.editorStore.history.index }}</div>
    <pre>{{ test() }}</pre> -->
    <!-- <pre>
        {{ defaultTemplate }}
    </pre> -->
</template>

<script setup lang='ts'>
import defaultTemplate from '@/widgets/defaultTemplate'
import WidgetWrapper from './widgetWrapper.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { cloneDeep } from 'lodash-es'

import { useStore } from '@/store/index'
const $store = useStore()

// 拖拽
const onDragstart = () => {
    $store.commit('editorStore/selectWidget', '')
    console.log('拖拽')
}

const test = () => {
    const testStr = cloneDeep($store.state.editorStore.history.historyRecords)
    testStr.forEach((item) => {
        // @ts-ignore
        if (item.data.widgetData) {
            // @ts-ignore
            item.data.widgetData = item.data.widgetData.id
        }
    })
    return testStr
}
</script>

<style scoped lang='scss'>
.widget-template-box>* {
    margin-bottom: 12px;
}

.widget-type-box {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .widget-item {
        display: flex;
        border-radius: 7px;
        background-color: rgba(255, 255, 255, 0.5);
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

}

.widget-card-box {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px 0 19px 0;

    .ant-col {
        display: flex;
        justify-content: center;
        // align-items: center;
    }

    .widget-item {
        text-align: center;
        // border: 1px solid red;
        padding-top: 15px;
        font-size: 14px;

        .title {
            font-weight: 500;
        }
    }
}

::v-deep() svg {
    width: auto !important;
    height: 100% !important;
}
</style>

<style lang='scss'></style>
