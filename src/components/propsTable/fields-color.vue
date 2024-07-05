<template>
    <div class="color-set-box">
        <input class="inputColor" type="color" :value="$props.value ? $props.value : ''" @change="handleChange">
        <ul class="color-option">
            <li @click="setOptionColor(item)" v-for="(item, index) in colorOption" :key="index"
                :style="{ 'background-color': item }"></li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const $props = defineProps<{
    value: string
}>()
// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'update:value', param: string): void
}>()

const handleChange = (param: Event) => {
    // @ts-ignore
    $emit('update:value', param.target.value)
}

const colorOption = ref<string[]>(['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#000000'])
const setOptionColor = (value: typeof colorOption.value[number]) => {
    $emit('update:value', value)
}

</script>

<style scoped lang='scss'>
.color-set-box {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;

    .inputColor {
        width: 35%;
        height: 115%;
        padding: 0;
        border: none;
        // 解决默认颜色选择有白色边框的问题
        background-color: transparent;
    }

    .color-option {
        // display: flex;
        // flex-wrap: wrap;
        width: 45%;
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(12, minmax(0, 1fr));

        li {
            box-sizing: content-box;
            height: 21px;
            grid-column: span 3 / span 3;
            border-radius: 5px;
            border: 1px solid transparent;

            &:hover {
                border: 1px solid rgb(105, 105, 105);
                cursor: pointer;
            }
        }
    }
}
</style>
