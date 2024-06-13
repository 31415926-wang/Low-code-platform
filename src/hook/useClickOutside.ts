import { onUnmounted, ref, Ref, watch } from 'vue'
/*
    挂载时机：需要点击外侧有事件时
    卸载时机：组件销毁/不需要点击外侧有事件时，如标签状态、蒙层关闭
    （因为是加在document,要排除复用的组件都有、全局一直挂载着）
*/
// DOM必须是响应式的，不然会null
export default function (goalElement: Ref, fn: (param?: any) => void) {
    const isOpenListenOut = ref<boolean>(false) // 由组件决定要不要点击外侧的监听
    const handleClickOutside = function (event: MouseEvent) {
        // contains方法判断是否是自身及其子节点
        if (!goalElement.value.contains(event.target)) {
            console.log('点击外部')
            fn(goalElement)
        } else {
            // console.log('点击内部')
        }
    }
    const addEvent = () => {
        document.addEventListener('click', handleClickOutside)
    }
    const removeEvent = () => {
        document.removeEventListener('click', handleClickOutside)
    }

    watch(isOpenListenOut, (newValue) => {
        if (newValue) {
            addEvent()
        } else {
            removeEvent()
        }
    })

    onUnmounted(() => {
        removeEvent()
    })

    return {
        isOpenListenOut
    }
}
