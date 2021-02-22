// import en from '../i18n/lang/en'

// Vue.prototype.$ajax = axios

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Milogin from '@/views/login/Milogin'
import Register from '@/views/login/Register'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'
import Newmonitor from '../views/newmonitor/Newmonitor.vue'
import PositioningScreen from '../views/PositioningScreen/index.vue'
import Dmap from '../views/newmonitor/Lt/Dmap.vue'
import Calculationrssi from '../components/Calculationrssi.vue'
import relationship from '../components/relationship.vue'
import whitelist from '../components/whitelist.vue'
import Signalmap from '../components/Signalmap.vue'
import signalmaptest from '../components/signalmaptest.vue'
import ClientAccessConfiguration from '../views/Setup/ClientAccessConfiguration/index.vue'



// 测试图
import testEcharts from '../components/test.vue'
// 不是必须加载的组件使用懒加载
// 长者测评相关
const seniorindex = () =>
  import('@/views/Evaluation/senior/seniorindex.vue')
// 其他
const Information = () =>
  import('@/views/management/Information.vue')
const Backtracking = () =>
  import('@/views/management/Backtracking.vue')
const Roomstate = () =>
  import('@/views/management/Roomstate.vue')
const history = () =>
  import('@/views/management/history.vue')
const Evaluating = () =>
  import('@/views/table/Evaluating.vue')
const Detailsx = () =>
  import('@/views/table/Detailsx.vue')
const Details = () =>
  import('@/views/table/Details.vue')
const FilterTable = () =>
  import('@/views/table/filterTable')
// 护理管理相关
const WorkStatistics = () =>
  import('@/views/NursingManagement/WorkStatistics/WorkStatistics.vue')
const complaint = () =>
  import('@/views/NursingManagement/complaint/complaint.vue')
const NurseAccountManagement = () =>
  import('@/views/NursingManagement/NurseAccountManagement/NurseAccountManagement.vue')
const FamilyAccountManagement = () =>
  import('@/views/NursingManagement/FamilyAccountManagement/FamilyAccountManagement.vue')
// 院内管理部分
const CategoryManagement = () =>
  import('@/views/InventoryManagement/CategoryManagement')
const InventoryStatistics = () =>
  import('@/views/InventoryManagement/InventoryStatistics')
const WarehouseManagement = () =>
  import('@/views/InventoryManagement/WarehouseManagement')
const WarehousingManagement = () =>
  import('@/views/InventoryManagement/WarehousingManagement')

// 旧版电子围栏
// const Fence = () =>
//     import ('@/views/Fence/Fence.vue')
// 新版电子围栏
const Fence = () =>
  import('@/views/Setup/fence/Fence.vue')
const Evaluatiomaintenance = () =>
  import('@/views/Setup/Evaluationmaintenance/Evaluatiomaintenance.vue')
const Fences = () =>
  import('@/views/Fence/Fences.vue')
const Userrole = () =>
  import('@/views/Setup/Userandrole/index.vue')
const Equipmentall = () =>
  import('@/views/Setup/equipmentall/Equipmentall.vue')
const Beadhouse = () =>
  import('@/views/Setup/Beadhouse/Beadhouses.vue')
const Organization = () =>
  import('@/views/Setup/organization/Organization.vue')
const Notice = () =>
  import('@/views/Setup/Notice/Notice.vue')
const Invitation = () =>
  import('@/views/Setup/Invitation.vue')
const HealthConfiguration = () =>
  import('@/views/Setup/HealthConfiguration/HealthConfiguration.vue')
const Selfchecking = () =>
  import('@/views/Setup/Selfchecking/Selfchecking.vue')
const Rollcall = () =>
  import('@/views/management/Rollcall.vue')
const NotFound = () =>
  import('@/page404')
Vue.use(Router)
// let routeNmae = en.routeNmae
let defaultRouter = [{
    path: '/',
    redirect: '/index/milogin',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: [{
        path: '/login/milogin',
        component: Milogin,
        name: '',
      },
      {
        path: '/login/register',
        component: Register,
        name: '',
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-newspaper-o', // 图标样式class
    name: '个人中心',
    hidden: true,
    component: Layout,
    children: [{
        path: '/Details',
        component: Details,
        name: '编辑',
        children: []
      },
      {
        path: '/Detailsx',
        component: Detailsx,
        name: '详情',
        children: []
      },
    ]
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: '主页',
    component: Layout,
    alone: true,
    children: [{
      path: '/index',
      iconCls: 'fa fa-dashboard', // 图标样式class
      name: '主页',
      component: HomeMain,
      children: []
    }]
  },
  {
    path: '/newmonitor',
    component: Newmonitor,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/PositioningScreen',
    component: PositioningScreen,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/Calculationrssi',
    component: Calculationrssi,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/relationship',
    component: relationship,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/whitelist',
    component: whitelist,
    name: '',
    hidden: true,
    children: []
  }, {
    path: '/testEcharts',
    component: testEcharts,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/Signalmap',
    component: Signalmap,
    name: '',
    hidden: true,
    children: []
  }, {
    path: '/signalmaptest',
    component: signalmaptest,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/dmap',
    component: Dmap,
    name: '',
    hidden: true,
    children: []
  },

  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]
let addRouter = [{
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: '院内管理',
    component: Layout,
    children: [{
        path: '/Roomstate',
        iconCls: 'fa fa-hospital-o fa-2x', // 图标样式class
        name: '房间状态',
        component: Roomstate,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Information',
        iconCls: 'fa fa-info-circle fa-2x', // 图标样式class
        name: '院内信息',
        component: Information,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Rollcall',
        iconCls: 'fa fa-check-square-o fa-2x', // 图标样式class
        name: '人员点名',
        component: Rollcall,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Backtracking',
        iconCls: 'fa fa-exchange fa-2x', // 图标样式class
        name: '轨迹回溯',
        component: Backtracking,
        meta: {
          role: []
        },
        children: []
      }, {
        path: '/history',
        iconCls: 'fa fa-history fa-2x', // 图标样式class
        name: '历史警报',
        component: history,
        meta: {
          role: []
        },
        children: []
      }

    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-commenting fa-2x', // 图标样式class
    name: '长者测评',
    component: Layout,
    children: [{
        path: '/Evaluating',
        iconCls: 'el-icon-chat-round', // 图标样式class
        name: '简单评估',
        component: Evaluating,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/seniorindex',
        iconCls: 'el-icon-chat-line-round', // 图标样式class
        name: '智能健康评估',
        component: seniorindex,
        meta: {
          role: []
        },
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-newspaper-o', // 图标样式class
    name: '长者中心',
    component: Layout,
    children: [{
        path: '/filterTable',
        iconCls: 'fa fa-user-o fa-2x', // 图标样式class
        name: '长者概览',
        component: FilterTable,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/fDetails',
        iconCls: 'fa fa-archive fa-2x', // 图标样式class
        name: '长者档案',
        component: Detailsx,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Fences',
        iconCls: 'fa fa-shield fa-2x', // 图标样式class
        name: '电子围栏',
        component: Fences,
        meta: {
          role: []
        },
        children: []
      },
      // {
      //     path: '/Details',
      //     component: Details,
      //     name: '编辑',
      //     children: []
      // },
      // {
      //     path: '/Detailsx',
      //     component: Detailsx,
      //     name: '详情',
      //     children: []
      // },
    ]
  }, {
    path: '/',
    iconCls: 'fa fa-medkit', // 图标样式class
    name: '护理管理',
    component: Layout,
    children: [{
        path: '/WorkStatistics',
        iconCls: 'fa fa-bar-chart-o fa-2x', // 图标样式class
        name: '工作统计',
        component: WorkStatistics,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/complaint',
        iconCls: 'fa fa-envelope-square fa-2x', // 图标样式class
        name: '投诉管理',
        component: complaint,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/NurseAccountManagement',
        iconCls: 'fa fa-users fa-2x', // 图标样式class
        name: '护工组管理',
        component: NurseAccountManagement,
        meta: {
          role: []
        },
        children: []
      }, {
        path: '/FamilyAccountManagement',
        iconCls: 'fa fa-id-badge fa-2x', // 图标样式class
        name: '家属账号管理',
        component: FamilyAccountManagement,
        meta: {
          role: []
        },
        children: []
      },
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-medkit', // 图标样式class
    name: '库存管理',
    component: Layout,
    children: [{
        path: '/CategoryManagement',
        iconCls: 'fa fa-bar-chart-o fa-2x', // 图标样式class
        name: '类目管理',
        component: CategoryManagement,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/InventoryStatistics',
        iconCls: 'fa fa-envelope-square fa-2x', // 图标样式class
        name: '库存统计',
        component: InventoryStatistics,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/WarehousingManagement',
        iconCls: 'fa fa-users fa-2x', // 图标样式class
        name: '入库管理',
        component: WarehousingManagement,
        meta: {
          role: []
        },
        children: []
      }, {
        path: '/WarehouseManagement',
        iconCls: 'fa fa-id-badge fa-2x', // 图标样式class
        name: '出库管理',
        component: WarehouseManagement,
        meta: {
          role: []
        },
        children: []
      },
    ]
  },
  {
    path: '/',
    iconCls: 'el-icon-setting', // 图标样式class
    name: '系统设置',
    component: Layout,
    // meta: { role: [] },
    children: [{
        path: '/Userrole',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '账户及权限管理',
        component: Userrole,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Equipmentall',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '设备信息录入',
        component: Equipmentall,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Selfchecking',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '设备自检',
        component: Selfchecking,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Beadhouse',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '院信息录入',
        component: Beadhouse,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Fence',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '电子围栏配置',
        component: Fence,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Evaluatiomaintenance',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '智能健康评估配置',
        component: Evaluatiomaintenance,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/ClientAccessConfiguration',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '客户端访问权限配置',
        component: ClientAccessConfiguration,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/HealthConfiguration',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '系统信息配置',
        component: HealthConfiguration,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Organization',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '组织架构录入',
        component: Organization,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Notice',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '院内公告发布',
        component: Notice,
        meta: {
          role: []
        },
        children: []
      },
      {
        path: '/Invitation',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '邀请码',
        component: Invitation,
        meta: {
          role: []
        },
        children: []
      },
    ]
  },
  // {
  //     path: '*',
  //     redirect: '/404',
  //     hidden: true,
  //     children: []
  // },

]




// console.log(funA)
export default new Router({
  routes: defaultRouter
})
export {
  defaultRouter,
  addRouter
}
