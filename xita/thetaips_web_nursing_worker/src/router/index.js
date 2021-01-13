import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
// import register from '../views/login/register.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/elderly-information',
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: register
    // },
    {
        path: '/',
        name: 'layout',
        component: () =>
            import ( /* 主页布局 */ '../views/layout/layout.vue'),
        children: [{
            path: '/elderly-information',
            name: '长者信息管理',
            component: () =>
                import ('../views/elderly-information/elderly-information.vue')
        }, {
            path: '/group-service',
            name: '组别服务查看',
            component: () =>
                import ('../views/group-service/group-service.vue')
        }, {
            path: '/public-service',
            name: '公共服务查看',
            component: () =>
                import ('../views/public-service/public-service.vue')
        }, {
            path: '/content-statistics',
            name: '护理内容统计',
            component: () =>
                import ('../views/content-statistics/content-statistics.vue')
        }]
    },
    {
        path: '/nursing-completion',
        name: '长者服务查看',
        component: () =>
            import ('../views/elderly-information/nursing-completion.vue'),
    },
    {
        path:'/change-password',
        name:'修改密码',
        component:()=>
            import('../views/login/change-password.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router