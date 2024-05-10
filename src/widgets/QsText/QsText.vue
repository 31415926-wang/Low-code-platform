<template>
    <component :is="$props.props.tag" :style="styleProps">{{ $props.props.text }}</component>

</template>

<script setup lang='ts'>
import { textProps, commonProps } from '@/type/widgets/index'
import { textStyleKeys } from '@/widgets/defaultProps'
import useHandleWidget from '@/hook/useHandleWidget'

const $props = defineProps<{
    props: commonProps & textProps
}>()

const { styleProps } = useHandleWidget<commonProps & textProps>($props.props, textStyleKeys)

</script>

<style scoped lang='scss'></style>
