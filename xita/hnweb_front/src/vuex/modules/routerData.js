import { defaultRouter, addRouter } from '@/router/index'
import axios from 'axios'
import Cookies from 'js-cookie'
import $ from 'jquery'


// $.ajax({
//     url: '/api/service/getService',
//     type: 'POST', //GET
//     async: false, //或false,是否异步
//     data: {
//         // name:'yang',age:25
//     },
//     timeout: 5000, //超时时间
//     dataType: 'json', //返回的数据格式：
//     beforeSend: function(xhr) {},
//     success: function(data, textStatus, jqXHR) {
//       
//         console.log(data)
//     },
//     error: function(xhr, textStatus) {},
//     complete: function() {}
// })

const routerData = {
    state: {
        routers: [],
        addRouters: []
    },
    mutations: {
        setRouters: (state, routers) => {
            state.addRouters = routers // 保存动态路由用来addRouter
            state.routers = defaultRouter.concat(routers) // 所有有权限的路由表，用来生成菜单列表
            console.log(routers);
        }
    },
    actions: {

        newRoutes({ commit }, role) {
            $.ajax({
                    url: process.env.API_HOST + '/basic/getAllRightRole',
                    type: 'POST', //GET
                    async: false, //或false,是否异步
                    data: {
                        // name:'yang',age:25
                    },
                    timeout: 5000, //超时时间
                    dataType: 'json', //返回的数据格式：
                    beforeSend: function(xhr) {},
                    success: function(data, textStatus, jqXHR) {
                        console.log(data);
                        for (var k = 0; k < addRouter.length; k++) {
                            for (var t = 0; t < addRouter[k].children.length; t++) {
                                for (var i = 0; i < data.length; i++) {
                                    if (addRouter[k].children[t].path == data[i].path) {
                                        // addRouter[k].children[t]['meta'] = { role: data[i].role }
                                        data[i].role.forEach(element => {
                                            addRouter[k].children[t].meta.role.push(element)
                                        });
                                    }
                                }
                            }
                        }
                    },
                    error: function(xhr, textStatus) {},
                    complete: function() {}
                })
                //  通过递归路由表，删除掉没有权限的路由
            function fueachSelect(furouters, fuuserRole) {
                let arr = furouters

                function eachSelect(routers, userRole) {
                    for (let j = 0; j < routers.length; j++) {
                        if (routers[j].meta && routers[j].meta.role.length && routers[j].meta.role.indexOf(userRole) === -1) {
                            routers.splice(j, 1)
                            j = j - 1
                        }
                        if (routers[j] != undefined && routers[j].children) {
                            eachSelect(routers[j].children, userRole)
                        }
                    }
                }
                eachSelect(arr, fuuserRole)
                return arr
            }
            // eachSelect(addRouter, role)
            console.log(addRouter);
            let arrs = fueachSelect(addRouter, role)
                // arrs.forEach(element => {
                //     element.children.forEach((childrenElement,index) => {
                //         if (childrenElement.name == "编辑") {
                //             console.log(element);
                //             element.children.splice(index, 2);
                //             console.log(element);
                //         }
                //     });
                // });
                // for (let i = 0; i < arrs.length; i++) {
                //     if (arrs[i].children.length == 0) {
                //         arrs.splice(i, 1)
                //         i = i - 1
                //     }
                // }
            commit('setRouters', arrs)
        }
    }
}


export default routerData