<template>
    <template v-if="$router.fullPath.includes('/home')">
        <IndexHead></IndexHead>
    </template>
    <template v-else>
        <QuestionHead></QuestionHead>
    </template>

</template>

<script setup lang='ts'>
import IndexHead from '@/views/home/components/head.vue'
import QuestionHead from '@/views/question/editQuestion/head-region/head-region.vue'
import { useRoute } from 'vue-router'

const $router = useRoute()

</script>
