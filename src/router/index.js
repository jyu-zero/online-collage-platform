import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        // 个人中心
        path: '/usercenter',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                // 通知栏
                path: '/',
                name: 'Notification',
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
                name: 'Question',
                component: () => import('@/views/menus/question/index.vue')
            }
        ]
    },
    {
        // 我的失物招领
        path: '/lostandfound',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'LostAndFound',
                component: () => import('@/views/menus/lost-and-found/index.vue')
            }
        ]
    },
    {
        // 我共享的资料
        path: '/sourceshare',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'SourceShare',
                component: () => import('@/views/menus/source-share/index.vue')
            }
        ]
    },
    {
        // 我的个人信息管理
        path: '/profile',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'Profile',
                component: () => import('@/views/menus/profile-manage/index.vue')
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
