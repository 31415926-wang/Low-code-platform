import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // redirect: '/home',
        redirect: '/home/my-works/0',
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
                        path: 'my-works/:isTemplate',
                        component: () => import('@/views/lego-works/worksOrTemplate/myWorks.vue'),
                        meta: {
                            title: '我的作品'
                        }
                    },
                    {
                        path: 'my-template/:isTemplate',
                        component: () => import('@/views/lego-works/worksOrTemplate/myWorks.vue'),
                        meta: {
                            title: '个人模版'
                        }
                    },
                    {
                        path: 'look-template/:id',
                        component: () => import('@/views/lego-works/worksOrTemplate/detailTemplate.vue'),
                        meta: {
                            title: '查看模版'
                        }
                    },
                    {
                        path: 'recycle-work/:status',
                        component: () => import('@/views/lego-works/worksOrTemplate/myWorks.vue'),
                        meta: {
                            title: '回收站'
                        }
                    }
                ]
            },
            {
                path: 'edit-work/:id',
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
