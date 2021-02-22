/**
 * Created by peijialong.
 * Date: 2020/05/20
 * Description: 多路webscoket整合
 */
import Vue from 'vue'
import { functionarrs } from '../../../api/api'
export default {
    state: {
        // 所有服务器数组
        ipData: ["ws://192.168.99.155//websocket","ws://192.168.99.132//websocket"],
        // websocket对象数组
        allSocketArr: [],
        // websocket数据
        allSocketData: [],
        // 取出的websocket数据
        nowSocketData: [],
        // 定时器
        timer: null,
    },
    mutations: {
        //叠加allSocketData数据
        addAllSocketData(state, data) {
            console.log(this.state.nowFloorId);
            if (state.allSocketData.length !== 0) {
                data.forEach(dataelement => {
                    state.allSocketData.forEach(allSocketDataelement => {
                        if (dataelement.floorId === allSocketDataelement.floorId) {
                            allSocketDataelement.persons = allSocketDataelement.persons.concat(dataelement.persons)
                            allSocketDataelement.persons.reverse()
                            let obj={}
                            allSocketDataelement.persons=allSocketDataelement.persons.reduce(function (item, next) {
                                obj[next.id] ? '' : obj[next.id] = true && item.push(next);
                                return item;
                            }, []);
                        }
                    });
                });
            } else {
                Array.prototype.push.apply(state.allSocketData, data);
            }
            console.log(state.allSocketData);
        },
        // allSocketData数据根据人员id去重
        removalAllSocketData(state) {
            state.reverse()
        },
        // 清除叠加allSocketData数据
        clearAllSocketData(state, data) {

        },
        // 定时取数据并清空allSocketData
        getNowSocketData(state, data) {

        },
        // 清除定时器
        clearTimer(state) {
            clearInterval(state.timer)
        },
        // 关闭所有通道
        closeSocket(state) {
            state.allSocketArr.forEach(element => {
                element.close()
            });
        },
        // 循环服务器连接
        createdScoket(state) {
            var that = this
            //创建socket连接功能函数
            function connect(wsobj, ip) {
                //浏览器支持？
                if ("WebSocket" in window) {
                    state.allSocketArr[wsobj] = new WebSocket(ip);
                    try {
                        //连接事件
                        state.allSocketArr[wsobj].onopen = function (msg) {
                            console.log(ip + ":连接已建立！");
                            // alert(wsobj+":连接已建立！");
                        };
                        //错误事件
                        state.allSocketArr[wsobj].onerror = function (msg) {
                            alert("错误：" + msg.data);

                        }

                        //消息事件
                        state.allSocketArr[wsobj].onmessage = function (msg) {
                            setTimeout(() => {
                                const redata = JSON.parse(msg.data);
                                that.commit("addAllSocketData", redata.personObj.loushu);
                            }, 0);
                        };
                        //关闭事件
                        state.allSocketArr[wsobj].onclose = function (msg) {
                            console.log(ip + ":连接已关闭！");

                        };
                    }
                    catch (ex) {
                        log(ex);
                    }
                } else {
                    // 浏览器不支持 WebSocket
                    alert("您的浏览器不支持 WebSocket!");
                }



            }
            for (var i = 0; i < state.ipData.length; i++) {
                connect(i, state.ipData[i])
            }
        }

    },
    actions: {
        //  开始连接多路通道
        startSocoket({ commit }) {


            // 循环服务器连接
            commit('createdScoket')

        },
    }
}