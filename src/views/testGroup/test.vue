<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape>
</template>

<script setup lang='ts'>
import { defaultTextProps, defaultCommonProps, defaultShapeProps } from 'question-star-bricks'

console.log('实验', defaultShapeProps)

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
