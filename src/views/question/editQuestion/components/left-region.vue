<template>
     <a-tabs v-model:activeKey="activeKey" :tabBarGutter="12">
        <a-tab-pane :key=1>
            <template #tab>
                    <AppstoreOutlined />组件
            </template>
            Tab 1
        </a-tab-pane>
        <a-tab-pane :key=2>
            <template #tab>
                    <BarsOutlined />图层
            </template>
            Tab 2
        </a-tab-pane>
    </a-tabs>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
const activeKey = ref(1)
</script>

<style scoped lang='scss'></style>
