import { widgetData } from '@/type/store/modules/editorStore'
import { useStore } from '@/store/index'
import { ref } from 'vue'

// 这里形成必包，不建议
/* let originOffestX = 0
let originOffestY = 0 */

interface dataTransferData {
    widgetData: widgetData,
    originOffestX: number,
    originOffestY: number
}

export default function useDragWidget() {
    const $store = useStore()

    // 一开始点击物料时的内部偏移量，注意，因为拖拽函数在不同的vue组件,ref变量并没有共享
    // const originOffestX = ref(0)
    // const originOffestY = ref(0)
    const ondragstart = (e: DragEvent, widgetData: widgetData) => {
        const targetWrapper = (e.target as HTMLElement).closest('.widget-wrapper') as HTMLElement
        const targettWrapperRect = targetWrapper.getBoundingClientRect()
        const originOffestX = e.clientX - targettWrapperRect.left
        const originOffestY = e.clientY - targettWrapperRect.top
        /* 因为setData只能存一个 */
        e.dataTransfer?.setData('text/plain', JSON.stringify({
            widgetData,
            originOffestX,
            originOffestY
        } as dataTransferData))
    }
    const ondragover = (e: DragEvent) => {
        e.preventDefault() // 不能省略，否则拖拽效果还是浏览器默认行为
        e.dataTransfer!.dropEffect = 'copy'
    }
    // 在 ondragend 中获取数据不适合，结束时会清空， 数据通常在 drop 事件中获取
    const ondrop = (e: DragEvent) => {
        e.preventDefault()
        const dataTransferParams = JSON.parse(e.dataTransfer!.getData('text/plain')!) as dataTransferData
        const targetRegion = (e.target as HTMLElement).closest('.middle-box') as HTMLElement
        const targetRegionRect = targetRegion.getBoundingClientRect()
        const newX = e.clientX - targetRegionRect.left - dataTransferParams.originOffestX
        const newY = e.clientY - targetRegionRect.top - dataTransferParams.originOffestY
        dataTransferParams.widgetData.props.left = newX + 'px'
        dataTransferParams.widgetData.props.top = newY + 'px'
        $store.commit('editorStore/addWidget', {
            widgetData: dataTransferParams.widgetData
        })
        e.dataTransfer?.clearData()
    }
    return {
        ondragstart,
        ondragover,
        ondrop
    }
}
