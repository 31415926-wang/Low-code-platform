<template>
    <div class="out">
        <div class="in">11</div>
        <div class="in">22</div>
        <div class="in">33</div>
        <div class="in">44</div>
    </div>

</template>
<script lang="ts" setup>

</script>

<style scoped lang='scss'>
.out {
    width: 50%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .in {
        width: 48%;
        border: 1px solid red;
    }
}
</style>
