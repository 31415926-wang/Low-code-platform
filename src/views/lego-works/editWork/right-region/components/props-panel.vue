<template>
    <!-- 根据Props表单的模版进行渲染 -->
    <a-collapse accordion class="type-box" v-model:activeKey="collapseActiveKey">
        <a-collapse-panel :key="index" :header="propsTypeItem.label" v-for="(propsTypeItem, index) in propsTemplate">
            <PropsTable :propsBuild="propsTypeItem.build" changeType="widgetProps"></PropsTable>
        </a-collapse-panel>
    </a-collapse>

    <!-- <pre>
        {{ propsTemplate }}
    </pre> -->

</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { propsToFormFn } from '@/widgets/propsTableMap'
import PropsTable from './props-table.vue'

const $store = useStore()
const collapseActiveKey = ref([0])

// 渲染的props模版
const propsTemplate = computed(() => {
    return $store.getters['editorStore/selectedWidget']
        ? propsToFormFn($store.getters['editorStore/selectedWidget'].props)
        : []
})

</script>

<style scoped lang='scss'>
.type-box {
    margin-bottom: 19px;

    ::v-deep() .ant-collapse-header-text {
        font-size: 16px;
    }

    ::v-deep() .ant-collapse-arrow {
        font-size: 17px;
    }

    ::v-deep() .ant-collapse-content {
        background-color: transparent !important;
    }

    ::v-deep() .ant-collapse-content-box {
        padding-left: 28px;
        padding-right: 28px;
    }
}

.ant-collapse {
    font-size: 15px !important;
    border-radius: 0px;
}
</style>
