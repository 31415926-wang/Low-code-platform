<template>
    <template v-if="!loadStatus">
        <card :isTemplate="isTemplate" v-for="item in listData" :key="item.id" :card-item="item"></card>
    </template>
    <template v-else>
        <skeletonCard v-for="(item, index) in 8" :key="index"></skeletonCard>
    </template>
</template>
<script setup lang='ts'>
import card from './card.vue'
import { WorkItem } from '@/type/api/work'
import skeletonCard from './skeletonCard.vue'

defineProps<{
    loadStatus: boolean,
    listData: WorkItem[],
    isTemplate?: boolean
}>()
</script>

<style scoped lang='scss'></style>
