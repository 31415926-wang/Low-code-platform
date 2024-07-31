
/* 自定义一个方法，判断父容器是否出现滚动条，两个方向。若出现，则调整手动子元素宽度和高度为父容器 */

export function hasScrollbar(el: HTMLElement) {
    return (el.scrollHeight > el.clientHeight) || (el.scrollWidth > el.clientWidth)
}

export default function adjustChidHieght(parentSelector: string, childSelector: string) {
    const parentDom = document.querySelector(parentSelector) as HTMLElement | null
    const childDom = parentDom?.querySelector(childSelector) as HTMLElement | null
    if (parentDom && hasScrollbar(parentDom)) {
        if (childDom) {
            // console.log('断点2', parentDom.scrollHeight)
            // console.log('断点3', parentDom.clientHeight)
            childDom.style.height = parentDom.scrollHeight + 'px'
            childDom.style.width = parentDom.scrollWidth + 'px'
        }
    }
}
