<template>
    <div class="middle-box ">
        <editWrapper v-for="item in $store.state.editorStore.components" :key="item.id" :widgetId="item.id!"
            @selectWidget="selectWidget" :isActive="item.id == $store.state.editorStore.currentComponent">
            <component :is="item.name" :props="item.props" :title=item.title>
            </component>
        </editWrapper>
    </div>
</template>

<script setup lang='ts'>
import { useStore } from '@/store/index' // 采用重写后的useStore方法
import editWrapper from './edit-wrapper.vue'
const $store = useStore()

const selectWidget = (id: string) => {
    $store.commit('editorStore/selectWidget', id)
}
</script>

<style scoped lang='scss'>
.middle-box {
    background-color: white;
    padding: 24px 20px;

}
</style>
