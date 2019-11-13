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
        path: '/user-center',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                // 通知栏
                path: 'Notification',
                name: 'Notification',
                component: () => import('@/views/menus/notification/index.vue')
            },
            {
                // 失物招领栏
                path: 'lost-and-found',
                name: 'LostAndFound',
                component: () => import('@/views/menus/lost-and-found/index.vue')
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
        path: '/lost-and-found',
        component: () => import('@/views/menus/lost-and-found/index.vue'),
        children: [
            {
                path: 'lost-details',
                name: 'LostDetails',
                component: () => import('@/views/menus/lost-and-found/lost-details.vue')
            },
            {
                path: 'found-details',
                name: 'FoundDetails',
                component: () => import('@/views/menus/lost-and-found/found-details.vue')
            }
        ]
    },
    {
        // 我共享的资料
        path: '/file-share',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'FileShare',
                component: () => import('@/views/menus/file-share/index.vue')
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
