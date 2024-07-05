
// 若该元素包含在指定父元素内部，或者就是父元素； 参数目标元素，选择器
export function isInContainOrEqual(goalElement: HTMLElement, select: string) {
    let result = false
    if (goalElement.classList.contains(select) || goalElement.closest(select) !== null) {
        result = true
    }
    return result
}
