import useHotKeys from '@/hook/useHotKeys'
import { useStore } from '@/store/index'
import { computed } from 'vue' // 其实在setuo直接执行函数，内容都可以理解为hooks
import type { widgetData, AllWidgetProps } from '@/type/widgets/index'

// 统一添加编辑器快捷键，库已经封装好
export default function addHotKeys() {
    const $store = useStore()

    const selectWidget = computed<HTMLElement | null>(() => {
        return $store.getters['editorStore/selectWidgetDom']
    })
    const selectWidgetId = computed(() => {
        return $store.state.editorStore.currentComponent
    })

    // 删除、取消选中
    useHotKeys('Delete,Backspace', () => {
        $store.commit('editorStore/deleteWidget')
    })
    useHotKeys('Esc', () => {
        $store.commit('editorStore/selectWidget', '')
    })

    // 复制、粘贴
    useHotKeys('Ctrl+C', () => {
        if (selectWidgetId.value) {
            $store.commit('editorStore/copyComponent')
        }
    })
    useHotKeys('Ctrl+V', () => {
        $store.commit('editorStore/pasteComponent')
    })

    // 元素移动、快速移动
    useHotKeys('up,down,left,right,shift+up,shift+down,shift+left,shift+right', (event, handler) => {
        // 因为赋值时要拿到视觉上的top，定位属性挂载在wrapper上，不然可能出现百分百
        const selectWidgetWrapper = selectWidget.value?.closest('.wrapper') as HTMLElement
        const isVertical = handler?.key.includes('up') || handler?.key.includes('down')
        const distance = handler?.key.includes('shift') ? 10 : 1

        const changeKey = isVertical ? 'top' : 'left'
        const changeDistadance = (handler?.key.includes('right') || handler?.key.includes('down')) ? distance : -distance
        const WrapperDomKey = isVertical ? 'offsetTop' : 'offsetLeft'
        $store.commit('editorStore/updateWidget', {
            changeKey,
            changeValue: (selectWidgetWrapper[WrapperDomKey] + changeDistadance) + 'px'
        })
    })
}
