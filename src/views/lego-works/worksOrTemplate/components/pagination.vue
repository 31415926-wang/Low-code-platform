<template>
    <a-pagination v-model:current="current" v-model:page-size="pageSizeRef" :page-size-options="pageSizeOptions"
        :total="total" show-size-changer @showSizeChange="onShowSizeChange">
        <template #buildOptionText="props">
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-else>全部</span>
        </template>
    </a-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50'])
const current = ref(1)
const pageSizeRef = ref(10)
const total = ref(50)
const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize)
    pageSizeRef.value = pageSize
}
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
