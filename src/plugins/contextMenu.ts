
// 全局方法，给指定的选择器容器添加右键事件

import { onMounted, onUnmounted, h, render } from 'vue'
import { isInContainOrEqual } from '@/utils/tools'
import ContextMenu from '@/components/ContextMenu.vue'

export declare interface MenuListItem {
    name: string,
    tip?: string,
    fn: () => void
}

export default function (menuList: MenuListItem[], selector: string) {
    // 创建并插入菜单虚拟节点，传入列表给菜单组件
    const vnodeContainerDom = document.createElement('div') // 作为渲染Vnode的中介
    const vnode = h(ContextMenu, { menuList }) // h函数将vue组件成创建虚拟节点，打印是一个对象（后续操作可以对该虚拟Dom进行修改，要注意vnode这个对象内部的属性是有异步情况的）
    render(vnode, vnodeContainerDom) // render函数将虚拟Dom（vn）添加到容器，渲染成真实Dom
    document.body.appendChild(vnodeContainerDom)

    // console.log('实验1', ContextMenu)
    // console.log('实验2', vnode)

    const menuFn = function (e: MouseEvent) {
        e.preventDefault()
        if (isInContainOrEqual(e.target as HTMLElement, selector)) {
            // console.log('点中目标', e)
            // 显示列表、并定位其位置
            // @ts-ignore
            vnode.component.setupState.showMenu = true
            const menuDom = document.querySelector('.menu-list') as HTMLElement
            menuDom.style.top = e.clientY + 'px'
            menuDom.style.left = e.clientX + 'px'
        }
    }

    onMounted(() => {
        document.addEventListener('contextmenu', menuFn)
    })
    onUnmounted(() => {
        // 移除相关的虚拟节点
        document.body.removeChild(vnodeContainerDom)
        document.removeEventListener('contextmenu', menuFn)
    })

    return {

    }
}
