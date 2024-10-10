<template>
    <button @click="test">测试</button>
    <button @click="testGet">获取gist</button>
    <button @click="updateGist">修改gist</button>
</template>

<script setup lang='ts'>
import axios from 'axios'
import { reqGetGist, reqUpdateGist } from '@/api/common/index'

const test = () => {
    axios.get('https://aspiring-paper-olivine.glitch.me/test')
        .then(response => {
            // 处理成功的响应
            console.log('数据:', response.data)
        })
        .catch(error => {
            console.error('发生错误:', error)
        })
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
