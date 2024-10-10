<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <!-- <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape> -->
    <div>
        <propsTest :id="123456" widgeTitle='图片' padding-top-a="边距"></propsTest>
    </div>
</template>

<script setup lang='ts'>
import propsTest from './propsTest.vue'
const test = () => {
    //
}
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
