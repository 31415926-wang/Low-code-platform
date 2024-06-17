<template>
    <div class="box" @click="click">
        <div class="inbox"></div>
    </div>
</template>

<script setup lang='ts'>

const click = function () {
    console.log('点击', click)
    // //1111
    console.log('22')
}
</script>

<style scoped lang='scss'>
.box {
    position: absolute;
    border: 1px solid red;
    top: 200px;

    .inbox {
        width: 100px;
        height: 100px;
        border: 1px solid blue;

    }
}
</style>
