<template>
    <layout>
        <template v-slot:empty>
            <div class="empty-row" v-if="listData.length === 0 && !loadStatus && $route.params.isTemplate === '0'">
                <a-empty description="暂无数据"></a-empty>
            </div>
        </template>
        <template v-if="$route.params.isTemplate !== undefined" v-slot:card-context>
            <div class="card-box">
                <cardRegion :isTemplate="Boolean(Number($route.params.isTemplate))" :loadStatus="loadStatus"
                    :listData="listData"></cardRegion>
            </div>
        </template>
        <template v-else v-slot:table-context>
            <div class="table-box">
                <tableRegion :loadStatus="loadStatus" :listData="listData"></tableRegion>
            </div>
        </template>
        <template v-slot:pagination>
            <pagination ref="paginationRef" :get-data-api="reqWorks" v-model:pageParam="pageParam"
                v-model:listData="listData" v-model:loadStatus="loadStatus">
            </pagination>
        </template>
    </layout>
</template>

<script setup lang='ts'>
import { ref, watch, nextTick, provide } from 'vue'
import { reqWorks } from '@/api/works/workList'
import { PageParams } from '@/type/api/index'
import { WorkItem } from '@/type/api/work'
import cardRegion from './components/cardRegion.vue'
import tableRegion from './components/tableRegion.vue'
import layout from './components/layout.vue'
import pagination from './components/pagination.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const paginationRef = ref()

// 页面这边只需要：请求的列表的结果、加载中状态
const pageParam = ref<PageParams>({
    pageIndex: 0,
    pageSize: 8,
    [Object.keys($route.params)[0]]: Number([Object.values($route.params)[0]])
})

const listData = ref<WorkItem[]>([] as WorkItem[])
const loadStatus = ref<boolean>(false)

watch(listData, () => {
    listData.value.forEach((item: WorkItem, index) => {
        if (Number($route.params.isTemplate) === 1) {
            if (index < 4) item.isHot = true
        } else if (Number($route.params.isTemplate) === 0) {
            item.isPublish = true
        } else if (Number($route.params.status) === 0) {
            item.loadingStatus = false
        }
    })
})

watch(() => $route.params, async () => {
    const {
        pageIndex,
        pageSize
    } = pageParam.value
    pageParam.value = {
        pageIndex,
        pageSize,
        [Object.keys($route.params)[0]]: Number([Object.values($route.params)[0]])
    }
    nextTick(() => {
        updateList()
    })
})

const updateList = () => {
    paginationRef.value.getListData()
}

provide('updateList', updateList)

</script>

<style scoped lang='scss'>
.empty-row {
    display: flex;
    justify-content: center;
}

.card-box {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    // margin-bottom: 25px;
}

.table-box {
    width: 100%;
}
</style>
