<template>

    <div class="nav-box ">
        <a-button type="primary" href="/edit-question">
            <template #icon>
                <PlusOutlined />
            </template>
            新建问卷
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
        key: '/home/owner-question',
        icon: () => h(ProfileFilled),
        label: '我的问卷'
    },
    {
        key: '/home/star-question',
        icon: () => h(StarFilled),
        label: '收藏问卷'
    },
    {
        key: '/home/recycle-question',
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
    margin: 30px 0;
}

.ant-menu-light{
    background-color: transparent;
    border-inline-end:none !important;
}
</style>
