<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <!-- <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape> -->
    <div ref="EditWrapper" v-for="(item) in widgetComponents" :key="item.id">
        <span :id="item.id" v-bind="{ widgetTitle: item.title }">{{ item.id }}</span>
    </div>
    <hr>
    <div ref="EditWrapper" v-for="(item) in widgetComponents" :key="item.id">
        <component :is="item.name" v-bind="{ ...item.props, widgetTitle: item.title }" :id="item.id">
        </component>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, StyleValue } from 'vue'
import { useStore } from '@/store/index'
const $store = useStore()

const widgetComponents = computed(() => {
    return $store.state.editorStore.components
})

</script>

<style scoped lang='scss'>
.out {
    margin: 10px auto;
    height: 667px;
    width: 500px;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>
