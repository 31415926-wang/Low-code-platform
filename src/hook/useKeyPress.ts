import { ref, watch, onMounted, onUnmounted } from 'vue'

export default function (key: string, fn: () => void, isInitOpenKeyPress = false) {
    const isOpenKeyPress = ref(isInitOpenKeyPress)// 手动决定是否添加键盘事件
    const triggerEvent = function (event: KeyboardEvent) {
        // console.log('按下键盘', event.key)
        if (event.key === key) {
            // console.log('按下键盘')
            fn()
        }
    }
    const addkeyPress = () => {
        document.addEventListener('keydown', triggerEvent)
    }
    const removekeyPress = () => {
        document.removeEventListener('keydown', triggerEvent)
    }
    watch(isOpenKeyPress, (newValue) => {
        if (newValue) {
            addkeyPress()
        } else {
            removekeyPress()
        }
    }, { immediate: true })
    onUnmounted(() => {
        removekeyPress()
    })

    return {
        isOpenKeyPress
    }
}
