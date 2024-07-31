<template>
    <div class="out border">
        <div class="in"></div>
        <div class="over"></div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.out {
    position: relative;
    height: 667px;
    width: 500px;
    overflow-x: auto;
    background-color: pink;
}

.in {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: burlywood
}

.over {
    position: absolute;
    top: 0%;
    left: 150%;
    height: 50px;
    width: 50px;
    background-color: burlywood
}
</style>
