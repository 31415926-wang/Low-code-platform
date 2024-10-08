import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useStore } from '@/store/index'

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL), // GitHub Pages上线时无法处理history模式
  routes
})

router.beforeEach((to, from, next) => { // next写了就必须要用
  const $store = useStore()
  const whiteList = ['/phoneLogin', '/accountLogin', '/test']

  if (!$store.state.userStore.token && !whiteList.includes(to.path)) { // 无token且不在白名单中
    next({
      path: '/phoneLogin',
      query: { redirect: to.fullPath }
    })
  } else {
    // 如果是有token的情况下，不要去登录页了
    if ($store.state.userStore.token && to.path === '/phoneLogin') {
      next('/')
    } else {
      next()
    }
    // 如果有token，没有用户信息，请求一下
    if ($store.state.userStore.token) {
      if (Object.keys($store.state.userStore.userInfo).length === 0) {
        $store.dispatch('userStore/getUserInfo')
      }
    }
  }
})

export default router
