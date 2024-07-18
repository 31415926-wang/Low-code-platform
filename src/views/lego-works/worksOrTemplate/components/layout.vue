<template>
    <div class="container custom-scrollbar">
        <div class="list-box">
            <slot name="context"></slot>
        </div>
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
    gap: 15px;
    overflow: auto;
    height: 100%;
    padding: 10px 22px;
}

.list-box {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}
</style>
