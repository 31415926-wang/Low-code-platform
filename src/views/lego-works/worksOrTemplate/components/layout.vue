<template>
    <div class="container custom-scrollbar">
        <slot name="empty"></slot>
        <slot name="card-context"></slot>
        <slot name="table-context"></slot>
        <slot name="pagination"></slot>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 21px;
    overflow: auto;
    height: 100%;
    padding: 7px 22px 0 22px;
}

::v-deep() .ant-empty .ant-empty-image {
    height: 170px;
}
</style>
