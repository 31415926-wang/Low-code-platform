<template>

    <div class="nav-box ">
        <a-button type="primary" @click="onCreateWork" :loading="createLoading">
            <template #icon>
                <PlusOutlined />
            </template>
            新建作品
        </a-button>
        <a-menu class="menu" mode="inline" :selectedKeys="selectedKeys" :items="items" @click="handleClick" />
        <!-- <router-link to="/test">测试页面</router-link> -->
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
import { reqCreateWork } from '@/api/works/workItem'
import { message } from 'ant-design-vue'

const $route = useRoute()
const $router = useRouter()

const selectedKeys = ref([$route.fullPath]) // 初始化选中的路由
const createLoading = ref<boolean>(false)

const items = ref([
    {
        key: '/home/my-works/0',
        icon: () => h(ProfileFilled),
        label: '我的作品'
    },
    {
        key: '/home/my-template/1',
        icon: () => h(StarFilled),
        label: '个人模版'
    },
    {
        key: '/home/recycle-work/0',
        icon: () => h(DeleteFilled),
        label: '回收站'
    }
] as ItemType[])

const handleClick: MenuProps['onClick'] = menuInfo => {
    $router.push({ path: menuInfo.key as string })
    selectedKeys.value = [menuInfo.key as string]
}

const onCreateWork = async () => {
    createLoading.value = true
    // 请求创建
    try {
        const result = await reqCreateWork({
            title: '未命名作品',
            coverImg: '',
            desc: ''
        })
        // 成功后跳转
        $router.push('/edit-work/' + result.data.id)
        message.success('新建作品成功!')
    } catch (error) {
        message.error('创建作品出现问题，请稍后再试！')
    } finally {
        createLoading.value = false
    }
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
