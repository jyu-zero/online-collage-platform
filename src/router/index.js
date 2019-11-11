import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Test',
        component: () => import('@/views/Test.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/lost-found',
        name: 'Lost-Found',
        component: () => import('@/views/menus/lost-found/index.vue')
    },
    {
        path: '/lost-details',
        name: 'Lost-Details',
        component: () => import('@/views/menus/lost-found/LostDetails.vue')
    },
    {
        path: '/found-details',
        name: 'Found-Details',
        component: () => import('@/views/menus/lost-found/FoundDetails.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
