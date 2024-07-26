<template>
    <a-pagination v-model:current="current" v-model:page-size="pageSizeRef" :page-size-options="pageSizeOptions"
        :total="total" show-size-changer @change="onPageChange">
        <template #buildOptionText="props">
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-else>全部</span>
        </template>
    </a-pagination>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { PageParams } from '@/type/api/index'
import { WorkListResult, WorkItem } from '@/type/api/work'
import { ServeData } from '@/utils/request'

/* 接收接口、联动加载状态 */

const $prop = defineProps<{
    getDataApi: (param: PageParams) => Promise<ServeData<WorkListResult>>,
    pageParam: PageParams,
    listData: WorkItem[],
    loadStatus: boolean
}>()

const $emit = defineEmits<{
    (e: 'update:pageParam', parem: PageParams): void
    (e: 'update:listData', parem: WorkItem[]): void
    (e: 'update:loadStatus', parem: boolean): void
}>()

const current = ref($prop.pageParam.pageIndex + 1)
const pageSizeRef = ref($prop.pageParam.pageSize)

const total = ref(0)
const pageSizeOptions = ref<string[]>(['8', '12', '16', '20', '24'])

const onPageChange = async (current: number, pageSize: number) => {
    // 请求的分页参数相应改变
    $emit('update:pageParam', {
        ...$prop.pageParam,
        pageIndex: current - 1,
        pageSize
    })
    await nextTick(() => { // 存在异步情况
        getListData()
    })
}

const getListData = async () => {
    $emit('update:loadStatus', true)
    try {
        const result = await $prop.getDataApi($prop.pageParam)
        $emit('update:listData', result.data.list)
        total.value = result.data.count
    } finally {
        $emit('update:loadStatus', false)
    }
}

onMounted(() => {
    getListData()
})

defineExpose({
    getListData
})

</script>

<style scoped lang="scss">
@mixin itemStyle() {
    background-color: #fff;
    border: 1px solid #fdfdfd;
    border-radius: 50%;
}

::v-deep() .ant-pagination-item {
    @include itemStyle()
}

::v-deep() .ant-pagination-prev {
    @include itemStyle()
}

::v-deep() .ant-pagination-next {
    @include itemStyle()
}

::v-deep() .ant-pagination-next:hover {
    border-color: $theme_color;
}

::v-deep() .ant-pagination-prev:hover {
    border-color: $theme_color;
}

::v-deep() .ant-pagination-item:hover {
    border-color: $theme_color;
}

::v-deep() .ant-pagination-next .ant-pagination-item-link:hover {
    background-color: transparent;
}

::v-deep() .ant-pagination-prev .ant-pagination-item-link:hover {
    background-color: transparent;
}

::v-deep() .ant-pagination-item a:hover {
    background-color: #fff;
    border-radius: 50%;
}

::v-deep() .ant-pagination-item-active {
    border-color: $theme_color;
}
</style>
