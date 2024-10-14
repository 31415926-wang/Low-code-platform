<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <!-- <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape> -->
    <div>
        <propsTest :id="123456" widgeTitle='图片' padding-top-a="边距"></propsTest>
    </div>

    <ContextMenu :menuList="[
        {
            name: '拷贝图层',
            tip: '⌘C / Ctrl+C',
            fn: () => {
            }
        },
        {
            name: '粘贴图层',
            tip: '⌘V / Ctrl+V',
            fn: () => {
            }
        },
        {
            name: '删除图层',
            tip: 'Backspace / Delete',
            fn: () => {
            }
        },
        {
            name: '取消选中',
            tip: 'ESC',
            fn: () => {
            }
        }
    ]"></ContextMenu>

    -{{ prop }}-
</template>

<script setup lang='ts'>
import propsTest from './propsTest.vue'
import { computed } from 'vue'
const test = () => {
    //
}
const prop = computed(() => {
    // @ts-ignore
    return document.querySelector('.menu-list').style.display
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
