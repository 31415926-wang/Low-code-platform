<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape>
</template>

<script setup lang='ts'>
import { defaultShapeProps } from 'question-star-bricks'
import test from './test.md'

console.log('尝试获取md文件内容', test)
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
