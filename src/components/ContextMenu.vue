<template>
    <ul class="menu-list" ref="menu" v-show="showMenu">
        <li v-for="(item, index) in menuList" :key="index" @click="wrapperMenuFn(item.fn)">
            <span>{{ item.name }}</span>
            <span class="menu-tip">{{ item.tip }}</span>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { MenuListItem } from '@/plugins/contextMenu'
import useClickOutside from '@/hook/useClickOutside'

defineProps<{
    menuList: MenuListItem[]
}>()

const menu = ref(null)
const showMenu = ref(false)

const wrapperMenuFn = (fn: any) => {
    // 隐藏菜单列表
    showMenu.value = false
    fn()
}

const { isOpenListenOut } = useClickOutside(menu, () => {
    // 隐藏菜单列表
    showMenu.value = false
})

watch(showMenu, (val) => {
    // console.log('监测到showMenu改变')
    if (val) {
        isOpenListenOut.value = true
    } else {
        isOpenListenOut.value = false
    }
}, { immediate: true })

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
