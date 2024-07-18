<template>
    <layout>
        <template v-slot:context>
            <card v-for="item in listData" :key="item.id" :card-item="item"></card>
        </template>
        <template v-slot:pagination>
            <pagination></pagination>
        </template>
    </layout>
</template>

<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue'
import { reqWorks } from '@/api/works/workList'
import { PageParams } from '@/type/api/index'
import { WorkItem } from '@/type/api/work'
import card from './components/card.vue'
import layout from './components/layout.vue'
import pagination from './components/pagination.vue'

const pageParam = reactive<PageParams>({
    pageIndex: 0,
    pageSize: 12
})

const listData = ref<WorkItem[]>([])

const getList = async () => {
    const result = await reqWorks(pageParam)
    console.log('分页结果', result)
    listData.value = result.data.list
    listData.value.forEach((item: WorkItem, index) => {
        // if (index < 4)
        item.isPublish = true
    })
}

onMounted(() => {
    getList()
})

</script>

<style scoped lang='scss'></style>
