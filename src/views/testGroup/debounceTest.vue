<template>
    <a-input v-model:value="value" @change="debounce.apply($event, [change1, 1000])()" />
    <a-input v-model:value="value" @change="change2" />
    <a-input v-model:value="value" @change="change3" />
    <a-input v-model:value="value" @change="change5" />
</template>

<script lang="ts" setup>
import debounce from '@/utils/debounce'

import { watch, ref } from 'vue'
const value = ref<string>('')

// 无效
const change1 = () => {
    console.log('change')
}
// 有效
const change2 = debounce(() => {
    console.log('change')
}, 500)
// 无效每次执行的必包返回的函数都不是同一个
const change3 = function (e) {
    debounce(change1, 500)()
}
const change4 = debounce(() => {
    console.log('change')
}, 500)
// 仍然有效
const change5 = () => {
    change4() // 确保了执行的闭包返回函数是同一个即可
}
</script>
