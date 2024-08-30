
// 鼠标移动的三件套
type functionType = (event: MouseEvent) => void
type functionTypeTow = (event: MouseEvent, mouseTarget: HTMLElement) => void

export default function (onMovestart: functionType, onMoveProcess: functionTypeTow, onMoveEnd: functionTypeTow) {
    // 对外提供一个函数，按下鼠标，即可执行三件套（事件都是鼠标事件，指向点击的物料内部）
    const mousedownEvent = function (downEvent: MouseEvent) {
        // 存储一开始点击的目标，防止鼠标移动过快
        const mouseTarget: HTMLElement | null = downEvent.target as HTMLElement
        onMovestart(downEvent)
        const mousemoveFn = function (moveEvent: MouseEvent) {
            onMoveProcess(moveEvent, mouseTarget) // 因为还需要一开始的点击目标DOM
        }
        document.addEventListener('mousemove', mousemoveFn) // 注意此时的e.target，在document事件时会改变
        const mouseupFn = function (upEvent) { // 因为需要移除自身，需抽离出来
            document.removeEventListener('mousemove', mousemoveFn)
            onMoveEnd(upEvent, mouseTarget) // 修改仓库
            document.removeEventListener('mouseup', mouseupFn)
        }
        document.addEventListener('mouseup', mouseupFn)
    }

    return {
        mousedownEvent
    }
}
