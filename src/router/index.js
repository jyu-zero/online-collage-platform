import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index/Index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        // 个人中心
        path: '/userCenter',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                // 通知栏
                path: '/',
                name: 'notification',
                component: () => import('@/views/menus/notification/index.vue')
            }
        ]
    },
    {
        // 我的问答
        path: '/question',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'question',
                component: () => import('@/views/menus/question/index.vue')
            }
        ]
    },
    {
        // 我的失物招领
        path: '/lostAndFound',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'lostAndFound',
                component: () => import('@/views/menus/lost-and-found/index.vue')
            }
        ]
    },
    {
        // 我共享的资料
        path: '/sourceShare',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'sourceShare',
                component: () => import('@/views/menus/source-share/index.vue')
            }
        ]
    },
    {
        // 我的个人信息管理
        path: '/myInfoManage',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'myInfoManage',
                component: () => import('@/views/menus/my-info-manage/index.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
