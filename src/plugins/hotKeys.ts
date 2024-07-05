import useHotKeys from '@/hook/useHotKeys'
import { useStore } from '@/store/index'
import { computed } from 'vue' // 其实在setuo直接执行函数，内容都可以理解为hooks
import { HotkeysEvent, KeyHandler } from 'hotkeys-js'
import debounce from '@/utils/debounce'

// 高阶函数，核心是返回函数本身
const wrap = (fn: KeyHandler) => {
    const wrapperFn = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => { // wrapperFn充当直接执行函数相当于event事件参数在这里接收了
        keyboardEvent.preventDefault()
        fn(keyboardEvent, hotkeysEvent)
    }
    return wrapperFn
}

// 统一添加编辑器快捷键，库已经封装好
export default function addHotKeys() {
    const $store = useStore()

    const selectWidget = computed<HTMLElement | null>(() => {
        return $store.getters['editorStore/selectWidgetDom']
    })
    const selectWidgetId = computed(() => {
        return $store.state.editorStore.currentComponent
    })

    let moveDistance = 1
    const debounceFn = debounce((changeKey: string) => {
        // console.log('防抖成功')
        const selectWidgetWrapper = selectWidget.value?.closest('.edit-wrapper') as HTMLElement

        $store.commit('editorStore/updateWidget', {
            changeKey,
            changeValue: selectWidgetWrapper.style[changeKey]
        })
    }, 500)

    // 删除、取消选中
    useHotKeys('Delete,Backspace', wrap(() => {
        $store.commit('editorStore/deleteWidget', {})
    }))
    useHotKeys('Esc', wrap(() => {
        $store.commit('editorStore/selectWidget', '')
    }))

    // 复制、粘贴
    useHotKeys('Ctrl+C', wrap(() => {
        if (selectWidgetId.value) {
            $store.commit('editorStore/copyComponent')
        }
    }))
    useHotKeys('Ctrl+V', wrap(() => {
        $store.commit('editorStore/pasteComponent')
    }))

    // 元素移动、快速移动
    useHotKeys('up,down,left,right,shift+up,shift+down,shift+left,shift+right', wrap((event: KeyboardEvent, handler: HotkeysEvent) => {
        if (event.type === 'keydown') {
            // 因为赋值时要拿到视觉上的top，定位属性挂载在wrapper上，不然可能出现百分百
            const selectWidgetWrapper = selectWidget.value?.closest('.edit-wrapper') as HTMLElement
            const isVertical = handler?.key.includes('up') || handler?.key.includes('down')
            const distance = handler?.key.includes('shift') ? moveDistance++ : moveDistance

            const changeKey = isVertical ? 'top' : 'left'
            const changeDistadance = (handler?.key.includes('right') || handler?.key.includes('down')) ? distance : -distance
            const WrapperDomKey = isVertical ? 'offsetTop' : 'offsetLeft'

            // 视觉上优先改变
            selectWidgetWrapper.style[changeKey] = (selectWidgetWrapper[WrapperDomKey] + changeDistadance) + 'px'

            // 防抖，以最后一次操作为准，再存入记录
            debounceFn(changeKey)
        }

        if (event.type === 'keyup') {
            moveDistance = 1
        }
    }), { keyup: true })

    // 撤销、重做
    useHotKeys('Ctrl+Z', wrap(() => {
        $store.dispatch('editorStore/undo')
    }))
    useHotKeys('Ctrl+Shift+Z', wrap(() => {
        $store.dispatch('editorStore/redo')
    }))
}
