<template>
    <div class="stickLine">
    </div>
</template>

<script setup lang='ts'>

// 如果元素没在移动，不显示标线、也不贴边处理

// 如果元素在移动，判断所有的物料的六个线，哪些在贴边距离的范围内，显示标线再吸附。
</script>

<style scoped lang='scss'>
.stickLine {
    width: 100%;
    height: 100%;
    border: 1px solid red;
}
</style>
