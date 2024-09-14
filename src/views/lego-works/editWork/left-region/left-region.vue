<template>
    <a-tabs class="card-tab" v-model:activeKey="activeKey" :tabBarGutter="14">
        <a-tab-pane :key=1>
            <template #tab>
                <AppstoreOutlined />组件
            </template>
            <commonWidgetsList></commonWidgetsList>
        </a-tab-pane>
        <a-tab-pane :key=2>
            <template #tab>
                <BarsOutlined />图层
            </template>
            <layerList></layerList>
            <!-- <layerListPractice></layerListPractice> -->
        </a-tab-pane>
    </a-tabs>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import commonWidgetsList from './components/commonWidgetsList.vue'
import layerList from './components/layerList.vue'
// import layerListPractice from './components/layerListPractice.vue'

const activeKey = ref(1)
</script>

<style scoped lang='scss'>
// 只让面板设置面板宽占满
::v-deep() .ant-tabs-tabpane[id$='panel-2'] {
    position: absolute;
    left: 0;
    width: 100%;
}

::v-deep() .ant-tabs-content {
    position: static;
}
</style>
