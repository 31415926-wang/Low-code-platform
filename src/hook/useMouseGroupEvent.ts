
// 鼠标移动的三件套
type functionType = (event1: MouseEvent) => void

export default function (onMovestart: functionType, onMove: (event1: MouseEvent, event2: MouseEvent) => void, onMoveEnd: functionType) {
    // 对外提供一个函数，按下鼠标，即可执行三件套
    const mousedownEvent = function (originalE: MouseEvent) {
        onMovestart(originalE)
        const mousemoveFn = function (documentEvent: MouseEvent) {
            onMove(originalE, documentEvent) // 因为还需要一开始的点击目标DOM
        }
        document.addEventListener('mousemove', mousemoveFn) // 注意此时的e.target，在document事件时会改变
        const mouseupFn = function () { // 因为需要移除自身，需抽离出来
            document.removeEventListener('mousemove', mousemoveFn)
            onMoveEnd(originalE) // 需要一开始的点击目标DOM，修改仓库
            document.removeEventListener('mouseup', mouseupFn)
        }
        document.addEventListener('mouseup', mouseupFn)
    }

    return {
        mousedownEvent
    }
}
