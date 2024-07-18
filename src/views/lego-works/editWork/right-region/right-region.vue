<template>
    <a-tabs v-model:activeKey="activeKey" :tabBarGutter="19">
        <a-tab-pane :key=1>
            <template #tab>
                <BgColorsOutlined />属性
            </template>
            <propsSection></propsSection>
        </a-tab-pane>
        <a-tab-pane :key=2>
            <template #tab>
                <SettingOutlined />全局设置
            </template>
            <div v-for="(propsTypeItem, index) in pagePropsTemplate" :key="index">
                <PropsTable :propsBuild="propsTypeItem.build" changeType="page"></PropsTable>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import propsSection from './components/props-section.vue'
import { useStore } from '@/store/index'
import { propsToFormFn } from '@/widgets/propsTableMap'
import PropsTable from './components/props-table.vue'

const activeKey = ref(1)
const $store = useStore()

const pagePropsTemplate = computed(() => {
    return propsToFormFn($store.state.editorStore.page.props)
})
</script>

<style scoped lang='scss'>
// 只让属性设置面板宽占满
::v-deep() .ant-tabs-tabpane[id$='panel-1'] {
    position: absolute;
    left: 0;
    width: 100%;
}

::v-deep() .ant-tabs-content {
    position: static
}
</style>
