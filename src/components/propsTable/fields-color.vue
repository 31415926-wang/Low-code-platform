<template>
    <div class="color-set-box">
        <input class="inputColor" v-if="$props.value !== 'transparent'" type="color" :value="$props.value"
            @change="handleChange">
        <div v-else class="inputColor transparent"></div>
        <ul class="color-option">
            <li :class="item === 'transparent' ? 'transparent' : ''" @click="setOptionColor(item)"
                v-for="(item, index) in colorOption" :key="index" :style="{ 'background-color': item }"></li>
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

const colorOption = ref<string[]>(['#ffffff', '#ffc0cb', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#000000',
    'transparent'])
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

    .transparent {
        background: url('@/assets/image/transparent.png');
    }

    .inputColor {
        width: 32%;
        height: 115%;
        padding: 0;
        border: none;
        // 解决默认颜色选择有白色边框的问题
        background-color: transparent;

        &.transparent {
            height: 100%;
        }
    }

    .color-option {
        // display: flex;
        // flex-wrap: wrap;
        width: 47%;
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(10, minmax(0, 1fr));

        li {
            box-sizing: content-box;
            height: 21px;
            grid-column: span 2 / span 2;
            border-radius: 3px;
            // border: 1px solid red;

            &:hover {
                // border: 1px solid rgb(105, 105, 105);
                cursor: pointer;
            }

        }
    }
}
</style>
