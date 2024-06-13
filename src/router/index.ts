import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        },
        children: [
          {
            path: 'owner-question',
            component: () => import('@/views/question/ownerQuestion/index.vue'),
            meta: {
              title: '我的问卷'
            }
          },
          {
            path: 'star-question',
            component: () => import('@/views/question/starQuestion/index.vue'),
            meta: {
              title: '收藏问卷'
            }
          },
          {
            path: 'recycle-question',
            component: () => import('@/views/question/recycleQuestion/index.vue'),
            meta: {
              title: '回收站'
            }
          }
        ]
      },
      {
        path: 'edit-question',
        component: () => import('@/views/question/editQuestion/index.vue'),
        meta: {
          title: '编辑问卷'
        }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/testGroup/test.vue'),
    meta: {
      title: '测试页面'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
