<template>

    <div class="nav-box ">
        <a-button type="primary" href="/edit-work">
            <template #icon>
                <PlusOutlined />
            </template>
            新建作品
        </a-button>
        <a-menu class="menu" mode="inline" :selectedKeys="selectedKeys" :items="items" @click="handleClick" />
        <router-link to="/test">测试页面</router-link>
    </div>

</template>

<script setup lang='ts'>
import { h, ref } from 'vue'
import type { MenuProps, ItemType } from 'ant-design-vue'
import {
    ProfileFilled,
    StarFilled,
    DeleteFilled
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

const selectedKeys = ref([$route.fullPath]) // 初始化选中的路由

const items = ref([
    {
        key: '/home/hot-template',
        icon: () => h(ProfileFilled),
        label: '热门模版'
    },
    {
        key: '/home/my-works',
        icon: () => h(ProfileFilled),
        label: '我的作品'
    },
    {
        key: '/home/my-template',
        icon: () => h(StarFilled),
        label: '个人模版'
    },
    {
        key: '/home/recycle-work',
        icon: () => h(DeleteFilled),
        label: '回收站'
    }
] as ItemType[])
const handleClick: MenuProps['onClick'] = menuInfo => {
    $router.push({ path: menuInfo.key as string })
    selectedKeys.value = [menuInfo.key as string]
}

</script>

<style scoped lang='scss'>
.nav-box {
    width: 100%;
    padding-right: 20px;
}

.menu {
    font-size: 15px;
    margin: 30px 0;
}

.ant-menu-light {
    background-color: transparent;
    border-inline-end: none !important;
}
</style>
