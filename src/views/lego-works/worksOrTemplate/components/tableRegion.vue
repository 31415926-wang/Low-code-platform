<template>
    <a-table :columns="columns" :data-source="listData" :loading="loadStatus" :pagination="false">

        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'createdAt'">
                {{ handleFormat(record.createdAt) }}
            </template>
            <template v-if="column.key === 'action'">
                <a-button type="primary" shape="round" :loading="record.loadingStatus"
                    @click="recycle(record.id, record)">恢复作品</a-button>
            </template>
        </template>

    </a-table>

</template>

<script setup lang='ts'>
import { WorkItem } from '@/type/api/work'
import moment from 'moment'
import { reqRecycleWork } from '@/api/works/workItem'
import { message } from 'ant-design-vue'
import { inject } from 'vue'

defineProps<{
    loadStatus: boolean,
    listData: WorkItem[]
}>()

const columns = [
    {
        title: '作品名称',
        dataIndex: 'title',
        width: '25%'
    },
    {
        title: '作品ID',
        dataIndex: 'id',
        sorter: {
            compare: (a, b) => a.id - b.id
        },
        width: '20%'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: '30%'
    },
    {
        title: '操作',
        width: '25%',
        key: 'action'
    }
]

const handleFormat = (str) => {
    return moment(new Date(str)).format('YYYY-MM-DD　hh:mm:ss ')
}

const recycle = async (id: number, record: WorkItem) => {
    record.loadingStatus = true
    try {
        await reqRecycleWork(id)
        message.success('恢复成功')
        updateListFn()
    } catch (error) {

    } finally {
        record.loadingStatus = false
    }
}

const updateListFn = inject('updateList') as () => void

</script>

<style scoped lang='scss'>
::v-deep() .ant-table {
    background: none;
}

::v-deep() .ant-table-thead>tr>th {
    background: #fafafab2;
}

::v-deep() .ant-table-tbody>tr>td.ant-table-cell-row-hover {
    background-color: rgba(230, 216, 190, 0.664);
}

::v-deep() .ant-table-tbody>tr.ant-table-row:hover>td {
    background-color: rgba(230, 216, 190, 0.664);
}

::v-deep() .ant-table-tbody>tr>td {
    border-top: 1px solid rgb(207, 206, 206) !important;
}

::v-deep() .ant-table-tbody>tr:first-child>td {
    border-top: none !important;
}
</style>
