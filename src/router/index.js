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
    // 个人中心
    {
        path: '/user-center',
        component: () => import('@/views/user-center/Wrapper.vue'),
        children: [
            {
                // 通知栏
                path: '/',
                name: 'UserCenterNotification',
                component: () => import('@/views/user-center/notification')
            },
            {
                path: 'questions',
                name: 'UserCenterQuestion',
                component: () => import('@/views/user-center/question')
            },
            // 失物招领组界限 ----------
            {
                // 失物招领
                path: 'lost-and-found',
                name: 'UserCenterLostAndFound',
                component: () => import('@/views/user-center/lost-and-found')
                // children: [
                //     {
                //         // 跳转至失物详情页
                //         path: 'lost-details',
                //         name: 'LostDetails',
                //         component: () => import('@/views/lost-and-found/LostDetails.vue')
                //     },
                //     {
                //         // 跳转至招领详情页
                //         path: 'found-details',
                //         name: 'FoundDetails',
                //         component: () => import('@/views/lost-and-found/FoundDetails.vue')
                //     }
                // ]
            },
            // 失物招领组界限 ---------- [完]
            {
                // 资料共享
                path: 'file-share',
                name: 'UserCenterFileShare',
                component: () => import('@/views/user-center/file-share')
            },
            {
                // 个人资料
                path: 'profile',
                name: 'UserCenterProfile',
                component: () => import('@/views/user-center/profile-manage')
            }
        ]
    },
    // 如果你的页面需要一个头部信息，请将路由添加到下方对象的 children 数组当中：
    {
        path: '/',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                // 例子
                path: '/test',
                name: 'Test',
                component: () => import('@/views/Test.vue')
            },
            // 在线问答组界限 ----------
            {
                path: '/question',
                name: 'Question',
                component: () => import('@/views/question')
            },
            {
                path: '/question/new',
                name: 'NewQuestion',
                component: () => import('@/views/question/NewQuestion.vue')
            },
            // 在线问答组界限 ---------- [完]
            // 失物招领组界限 ----------
            {
                // 失物招领详情
                path: '/lost-and-found',
                name: 'LostAndFound',
                component: () => import('@/views/lost-and-found')
            },
            {
                // 失物详情页
                path: '/lost-details',
                name: 'LostDetails',
                component: () => import('@/views/lost-and-found/LostDetails')
            },
            {
                // 招领详情页
                path: '/found-details',
                name: 'FoundDetails',
                component: () => import('@/views/lost-and-found/FoundDetails'),
                children: [
                    {
                        path: '/question-pop-up',
                        name: 'questionPopUp',
                        component: () => import('@/views/lost-and-found/pop-up/QuestionPopUp')
                    }
                ]
            },
            // 失物招领组界限 ---------- [完]
            // 新闻管理组界限 ----------
            {
                // 新闻中心
                path: '/news-center',
                name: 'NewsCenter',
                component: () => import('@/views/news/NewsCenter.vue')
            },
            {
                path: '/news-detail/:newsId',
                name: 'NewsDetail',
                component: () => import('@/views/news/NewsDetail.vue')
            }
            // 新闻管理组界限 ---------- [完]
        ]
    },
    {
        // 新闻页面
        path: '/news-detail',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
