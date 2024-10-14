
// 全局方法，给指定的选择器容器添加右键事件

import { onMounted, onUnmounted, h, render, resolveComponent, cloneVNode } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'

export declare interface MenuListItem {
    name: string,
    tip?: string,
    fn: () => void
}

export default function (menuList: MenuListItem[], selector: string) {
    // 创建并插入菜单虚拟节点，传入列表给菜单组件
    const vnodeContainerDom = document.createElement('div') // 作为渲染Vnode的中介
    // const vcomponent = resolveComponent('ContextMenu')
    const vnode = h(ContextMenu, { menuList, selector }) // h函数将vue组件成创建虚拟节点，打印是一个对象
    render(vnode, vnodeContainerDom) // render函数将虚拟Dom（vn）添加到容器，渲染成真实Dom

    /*  // 控制菜单是否出现，应该由菜单本身去做决定才好处理
     const menuFn = function (e: MouseEvent) {
         e.preventDefault()
         if (isInContainOrEqual(e.target as HTMLElement, selector)) {
             // 显示列表、并定位其位置
             // @ts-ignore
             // 官网建议不直接修改vnode，实践发现生产环境下没有响应式
             // vnode.component.setupState.showMenu = true
             const clonevnode = cloneVNode(vnode, { showMenu: true })
             render(clonevnode, vnodeContainerDom)
             appDom.replaceChild(vnodeContainerDom, vnodeContainerDom)

             const menuDom = document.querySelector('.menu-list') as HTMLElement
             menuDom.style.top = e.clientY + 'px'
             menuDom.style.left = e.clientX + 'px'
         }
     } */

    onMounted(() => {
        const appDom = document.querySelector('#app') as HTMLElement // 也可以挂载在指定容器
        appDom.appendChild(vnodeContainerDom)
    })
    onUnmounted(() => {
        // 移除相关的虚拟节 点
        document.body.removeChild(vnodeContainerDom)
    })
}
