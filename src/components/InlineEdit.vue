<template>
    <div ref="inlineEditWrapper">
        <a-input v-show="!isLabel" :status="textStatus" id="aInput" type="text" v-model:value="textValue" allowClear
            size="small"></a-input>
        <label v-show="isLabel" @click="clickLabel">{{ $props.value }}</label>
    </div>
</template>

<script setup lang='ts'>
import { watch, ref, nextTick, Ref } from 'vue'
import useClickOutside from '@/hook/useClickOutside'
import useKeyPress from '@/hook/useKeyPress'
import { message } from 'ant-design-vue'

const $props = defineProps<{
    value: string
}>()
// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'update:value', param: string): void
}>()

// 防止传入的值变化，不然textValue只在setup执行一次
watch(() => $props.value, (newValue) => {
    textValue.value = newValue
})

const isLabel = ref<boolean>(true)
const textValue = ref($props.value)
const textStatus = ref('')
let inputNode: null | HTMLInputElement
const inlineEditWrapper = ref(null) // 避开a-input无法设置ref

const clickLabel = async function (e: Event) {
    isLabel.value = false
    // @ts-ignore
    inputNode = e.target.previousSibling.firstElementChild as HTMLInputElement
    await nextTick()
    // console.log('最近的输入框', inputNode)
    inputNode && inputNode.focus()
}

watch(textValue, (newValue) => {
    textStatus.value = newValue.length === 0 ? 'error' : ''
})
// 确定修改结束，再发送事件
const handleFinishFn = async (goalElement?: Ref) => {
    // 需校验，如果是空的话，不要修改仓库和标签状态。给出提示
    if (textValue.value.length !== 0) {
        $emit('update:value', textValue.value)
        isLabel.value = true
    } else {
        message.warning({
            content: '图层名称不能为空'
        })
        // 聚焦
        if (goalElement) {
            inputNode = goalElement.value.querySelector('#aInput')
            await nextTick()
            inputNode && inputNode.focus()
        }
    }
}
const handleCancelFn = () => {
    textValue.value = $props.value
    isLabel.value = true
}

const { isOpenListenOut } = useClickOutside(inlineEditWrapper, handleFinishFn)
const { isOpenKeyPress: openEnter } = useKeyPress('Enter', handleFinishFn)
const { isOpenKeyPress: openEsc } = useKeyPress('Escape', handleCancelFn)

watch(isLabel, (newValue) => {
    isOpenListenOut.value = !newValue
    openEnter.value = !newValue
    openEsc.value = !newValue
})

</script>

<style scoped lang='scss'>
.ant-input-affix-wrapper {
    border-radius: 12px !important;
}
</style>
