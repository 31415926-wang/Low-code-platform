<template>
    <template v-if="!($route.path === '/edit-work')">
        <IndexHead></IndexHead>
    </template>
    <template v-else>
        <WorkHead></WorkHead>
    </template>

</template>

<script setup lang='ts'>
import IndexHead from '@/views/home/components/head.vue'
import WorkHead from '@/views/lego-works/editWork/head-region/head-region.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

</script>
