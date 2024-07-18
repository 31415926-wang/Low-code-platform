<template>
    <div class="index-head-box">
        <div class="logo" @click="$router.push('home')">
            ✨智慧乐高
        </div>
        <div class="user" v-if="!isLoginPage" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
            <a-avatar :size="40">
                <template #icon>
                    <img :src="$store.state.userStore.userInfo.picture" alt=""
                        v-if="$store.state.userStore.userInfo.picture">
                    <UserOutlined v-else></UserOutlined>
                </template>
            </a-avatar>
            {{ $store.state.userStore.userInfo.nickName }}
            <ul class="user-menu" v-if="showMenu">
                <li @click="toUserCenter">个人中心</li>
                <li @click="loginOut">退出登录</li>
            </ul>
        </div>

        <div v-else class="login-way" @click="changeLoginWay">
            <SwapOutlined />
            <span v-if="isPhoneLogin">账号登录</span>
            <span v-else>手机号登录</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'

const $route = useRoute()
const $router = useRouter()
const $store = useStore()

const showMenu = ref(false)

const isLoginPage = computed(() => {
    return $route.fullPath.includes('Login')
})
const isPhoneLogin = computed(() => {
    return $route.fullPath.includes('phoneLogin')
})

const changeLoginWay = () => {
    const goalUrl = isPhoneLogin.value ? 'accountLogin' : 'phoneLogin'
    $router.push(goalUrl)
}

const toUserCenter = () => {
    $router.push('/user')
}

const loginOut = () => {
    $store.dispatch('userStore/loginOut')
}

</script>

<style scoped lang='scss'>
.index-head-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &>.logo {
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }

    &>.user {
        position: relative;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 19px;
        // border: 1px solid red;

        .user-menu {
            width: max-content;
            cursor: pointer;
            // border: 1px solid rgb(123, 255, 0);
            position: absolute;
            left: 43px;
            bottom: -75px;
            background-color: #ffffff;
            color: #545659;

            li {
                font-size: 16px;
                padding: 12px 15px;
            }

            li:hover {
                color: $theme_color;
            }
        }
    }

    &>.login-way {
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 19px;
        cursor: pointer;
    }
}
</style>
