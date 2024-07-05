<template>
    <a-input v-model:value="value" placeholder="Basic usage" />
    <a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" @input="change" />
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
const value = ref<string>('')
const value1 = ref<string>('')

const change = () => {
    console.log('改变')
}
</script>
