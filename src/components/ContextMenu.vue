<template>
    <ul class="menu-list" ref="menu" v-show="showMenu">
        <li v-for="(item, index) in menuList" :key="index" @click="wrapperMenuFn(item.fn)">
            <span>{{ item.name }}</span>
            <span class="menu-tip">{{ item.tip }}</span>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, watch, onUnmounted, onMounted } from 'vue'
import { MenuListItem } from '@/plugins/contextMenu'
import useClickOutside from '@/hook/useClickOutside'
import { isInContainOrEqual } from '@/utils/tools'

// const $store = useStore()
// console.log('menu组件初始化1', $store)
// 如果是通过render函数，再将组件插入到页面，在这里引入store会有问题

const $props = defineProps<{
    menuList: MenuListItem[],
    selector: string // 决定右键哪个元素可以出发显示菜单
}>()

const menu = ref(null)
const showMenu = ref(false)

const wrapperMenuFn = (fn: any) => {
    closeFn()
    fn()
}

const { isOpenListenOut } = useClickOutside(menu, () => {
    closeFn()
})

const closeFn = () => {
    // 隐藏菜单列表
    showMenu.value = false
}

const menuFn = function (e: MouseEvent) {
    e.preventDefault()
    // 显示列表、并定位其位置
    if (isInContainOrEqual(e.target as HTMLElement, $props.selector)) {
        showMenu.value = true

        const menuDom = document.querySelector('.menu-list') as HTMLElement
        menuDom.style.top = e.clientY + 'px'
        menuDom.style.left = e.clientX + 'px'
    }
}

watch(showMenu, (val) => {
    console.log('监测到showMenu改变')
    if (val) {
        isOpenListenOut.value = true
    } else {
        isOpenListenOut.value = false
    }
})

onMounted(() => {
    document.addEventListener('contextmenu', menuFn)
})
onUnmounted(() => {
    document.removeEventListener('contextmenu', menuFn)
})

</script>

<style scoped lang='scss'>
.menu-list {
    position: absolute;
    background-color: white;
    top: 0;
    left: 0;
    z-index: 1000;
    // padding: 10px 16px;
    border: 1px solid rgb(192, 192, 192);
    font-size: 15px;
    font-weight: normal;
    color: rgb(48, 48, 48);

    li {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        cursor: pointer;
        padding: 12px 10px;

        .menu-tip {
            font-size: 13px;
            opacity: 0.5
        }

        &:hover {
            background-color: #efefef;
            color: $theme_color;
        }
    }

    // li:not(:last-child) {
    //     margin-bottom: 17px;
    // }
}
</style>
