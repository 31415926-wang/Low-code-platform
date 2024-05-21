<template>
    <input type="color" :value="$props.value ? $props.value : ''" @change="handleChange">
</template>

<script setup lang='ts'>

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

</script>

<style scoped lang='scss'></style>
