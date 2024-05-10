<template>
    <div class="middle-box">
        <component v-for="item in $store.state.editorStore.components" :is="item.name" :key="item.id"
        :props="item.props"
        >
        </component>
    </div>
</template>

<script setup lang='ts'>
import { useStore } from '@/store/index' // 采用重写后的useStore方法

const $store = useStore()
// console.log('断点', $store.state.editorStore.components)

</script>

<style scoped lang='scss'>
.middle-box {
    background-color: white;
    padding: 24px 20px;

}
</style>
