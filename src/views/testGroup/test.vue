<template>
    <!-- <QsText v-bind="{ ...defaultTextProps, ...defaultCommonProps, widgetTitle: 'item.title' }"></QsText> -->
    <!-- <QsShape
        v-bind="{ ...defaultShapeProps, 'backgroundColor': 'red', width: '100px', height: '100px', widgetTitle: 'item.title', shapeValue: 'circular' }"
        class="border">
    </QsShape> -->
    <div ref="EditWrapper" v-for="(item) in widgetComponents" :key="item.id">
        <div v-bind="{ widgetTitle: item.title }">
            <img :id="item.id" :src="iphoneHeadImgUrl" alt="">
        </div>
    </div>
    <hr>
    <div ref="EditWrapper" v-for="(item) in widgetComponents" :key="item.id">
        <component :is="item.name" v-bind="{ ...item.props, widgetTitle: item.title }" :id="item.id">
        </component>
    </div>

    <button @click="test">测试</button>
    <button @click="testGet">获取gist</button>
    <button @click="updateGist">修改gist</button>

</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store/index'
import iphoneHeadImgUrl from '@/assets/image/phone-head.png'
import axios from 'axios'
import { reqGetGist, reqUpdateGist } from '@/api/common/index'

const $store = useStore()

const widgetComponents = computed(() => {
    return $store.state.editorStore.components
})

const test = () => {
    //
}

const testGet = () => {
    reqGetGist().then(response => {
        // 处理成功的响应
        console.log('数据:', response.data.files.mylogin.content)
    })
        .catch(error => {
            console.error('发生错误:', error)
        })
}
const updateGist = () => {
    reqUpdateGist('newContent').then(response => {
        // 处理成功的响应
        console.log('数据:', response.data.files.mylogin.content)
    })
        .catch(error => {
            console.error('发生错误:', error)
        })
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
