<template>
    <template v-if="!currentComponent">
        <a-empty description="未选中元素" />
    </template>
    <template v-else-if="currentComponent.isLocked">
        <a-empty description="元素已锁定" />
    </template>
    <template v-else>
        <propsTable></propsTable>
    </template>

</template>

<script setup lang='ts'>
import propsTable from './props-table.vue'
import { useStore } from '@/store/index'
import { computed } from 'vue'
const $store = useStore()

const currentComponent = computed(() => {
    return $store.getters['editorStore/selectedWidget']
})

</script>

<style scoped lang='scss'></style>
