import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // redirect: '/home',
        redirect: '/home/hot-template',
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
                        path: 'hot-template',
                        component: () => import('@/views/lego-works/worksOrTemplate/hotTemplate.vue'),
                        meta: {
                            title: '热门模版'
                        }
                    },
                    {
                        path: 'my-works',
                        component: () => import('@/views/lego-works/worksOrTemplate/myWorks.vue'),
                        meta: {
                            title: '我的作品'
                        }
                    },
                    {
                        path: 'my-template',
                        component: () => import('@/views/lego-works/worksOrTemplate/myTemplate.vue'),
                        meta: {
                            title: '个人模版'
                        }
                    },
                    {
                        path: 'recycle-work',
                        component: () => import('@/views/lego-works/recycleWork/index.vue'),
                        meta: {
                            title: '回收站'
                        }
                    }
                ]
            },
            {
                path: 'edit-work',
                component: () => import('@/views/lego-works/editWork/index.vue'),
                meta: {
                    title: '编辑问卷'
                }
            },
            {
                path: '/user',
                component: () => import('@/views/user/userCenter/index.vue'),
                meta: {
                    title: '个人中心'
                }
            },
            {
                path: '/accountLogin',
                component: () => import('@/views/user/loginOrRegister/accountLogin.vue'),
                meta: {
                    title: '用户账号登录'
                }
            },
            {
                path: '/phoneLogin',
                component: () => import('@/views/user/loginOrRegister/phoneLogin.vue'),
                meta: {
                    title: '用户手机号登录'
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

export default routes
