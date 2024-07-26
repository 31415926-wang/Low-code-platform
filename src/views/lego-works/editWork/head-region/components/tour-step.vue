<template>
    <a-tour v-model:current="current" :open="openTour" :steps="steps" @close="openTour = false" @finish="finish" />
</template>
<script lang="ts" setup>
import { ref, watch, inject, Ref } from 'vue'
import type { TourProps } from 'ant-design-vue'

const openTour = ref<boolean>(false)
const current = ref(0)

const firstDom: Ref<HTMLElement> = inject('headLeftRef')!

const steps = ref<TourProps['steps']>([])
const stepsDate: TourProps['steps'] = [
    {
        title: '作品信息展示区',
        description: '点击作品名称可以进行修改',
        target: () => { // 直接赋值会在一开始就执行
            return firstDom && firstDom.value
        }

    },
    {
        title: '左侧组件区域',
        description: '点击或者拖拽左侧的各类组件，可以往中间画布添加新元素',
        target: () => {
            return document.querySelector('.left-col')!
        },
        placement: 'right'
    },
    {
        title: '画布区域',
        description: '新添加的元素会显示在这里，您可以直接拖拽移动元素、改变元素尺寸',
        target: () => document.querySelector('.middle-col')!,
        placement: 'right'
    },
    {
        title: '快捷工具区域',
        description: '在画布中选中元素后，可以在此进行图层操作',
        target: () => document.querySelector('.head-middle')!
    },
    {
        title: '右侧属性区域',
        description: '在画布中选中元素后，可以在此修改元素的属性',
        target: () => document.querySelector('.right-col')!,
        placement: 'left'
    },
    {
        title: '保存/发布区域',
        description: '在完成作品设置后，可以点击保存/发布(每隔30秒会自动保存一次哦)',
        target: () => document.querySelector('.head-right')!
    }

]

watch(openTour, (val) => {
    if (val) {
        steps.value = stepsDate
    }
})

const finish = () => {
    current.value = 0
}

defineExpose({
    openTour
})

</script>

<style>
.ant-tour-footer {
    margin-top: 15px;
}
</style>
