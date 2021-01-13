import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
// import register from '../views/login/register.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/orderList',
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/',
        name: 'layout',
        component: () =>
            import ( /* 主页布局 */ '../views/layout/layout.vue'),
        children: [{
            path: '/orderList',
            name: '工单列表',
            component: () =>
                import ('../views/orderList')
        }, {
            path: '/orderProcess',
            name: '工单进程',
            component: () =>
                import ('../views/orderProcess')
        }, {
            path: '/myInfo',
            name: '我的',
            component: () =>
                import ('../views/myInfo')
        }]
    },
    {
        path: '/viewOrder/:id',
        name: '查看工单',
        component: () =>
            import ('../views/viewOrder'),
    },
    {
        path: '/exchange',
        name: '兑换收益',
        component: () =>
            import ('../views/otherPage/exchange'),
    }, {
        path: '/exinfo',
        name: '兑换信息',
        component: () =>
            import ('../views/otherPage/exinfo'),
    },
    {
        path: '/detailed',
        name: '收益明细',
        component: () =>
            import ('../views/otherPage/detailed'),
    },
    {
        path: '/historyList',
        name: '工单记录',
        component: () =>
            import ('../views/otherPage/historyList'),
    },
    {
        path: '/idBinding',
        name: '身份绑定',
        component: () =>
            import ('../views/otherPage/idBinding'),
    }, {
        path: '/changePassword',
        name: '修改密码',
        component: () =>
            import ('../views/otherPage/changePassword'),
    },
]

const router = new VueRouter({
    routes
})

export default router