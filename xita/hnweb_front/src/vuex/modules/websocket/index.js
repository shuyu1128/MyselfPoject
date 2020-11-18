/**
 * Created by peijialong.
 * Date: 2020/04/28
 * Description: 所有webscoket数据
 */
import Vue from 'vue'
import { functionarrs } from '../../../api/api'
export default {
    state: {
        // 所有服务器数组
        ipData: ["ws://" + window.location.host + "/websocket"],
        // ipData: ["ws://192.168.1.99:8080/websocket"],
        // websocket对象数组
        allSocketArr: [],
        // websocket数据
        allSocketData: [],
        // 取出的websocket数据
        nowSocketData: [],
        // 定时器
        timer: null,
        // 当前开启通道页面
        nowpath: "mainIndex",
        // 控制计算人员数据的开关
        switch: true,
        // 全部信息
        allData: {},
        // 当前楼层人员信息
        allPeoplesData: [],
        // 当前楼层内房间信息
        nowRoomsData: [],
        // 全部建筑、楼层、房间信息
        allBuildsData: [],
        // 全部楼层信息
        allFloorsData: [],
        // 当前选中楼层id
        // 楼层组信息
        floorGroup: [],
        nowFloorId: "",
        // 警报人员信息
        allSpecialsData: [],
        // 删除个人人员警报map
        allRemoveAttentionMap: {},
        // 全部危机信息
        emergencyData: [],
        emergencyDataLength: 0,
        // 全部关注信息
        specialAttentionData: [],
        specialAttentionDataLength: 0,
        // 院内血压大数据信息
        bloodData: [],
        // 院内心率数据
        heartRateData: [],
        // 院内体温数据
        temperatureData: [],
        // 全部人员数量
        allPersonNum: 0,
        // 人员情况数据
        Personnel: {},
        // 院内环境数据
        environmentalScienceData: [],
        // 外出人员数据
        OutgoingPersonnelData: [],
        // 活动人员数据
        ActivityPersonnelData: [],
        // 全体人员健康数据
        physicalConditionList: [],
        // 侧边抽屉全体人员健康（剔除楼层全体人员）
        allPeoplesdataNoloushu: [],
    },
    mutations: {
        // 更改当前所在开启路径
        changeNowpath(state, data) {
            state.nowpath = data
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
                        state.allSocketArr[wsobj].onopen = function(msg) {
                            console.log(ip + ":连接已建立！");
                        };
                        //错误事件
                        state.allSocketArr[wsobj].onerror = function(msg) {
                                console.log(ip + ":链接失败！");
                            }
                            //消息事件
                        state.allSocketArr[wsobj].onmessage = function(msg) {
                            setTimeout(() => {
                                const redata = JSON.parse(msg.data);
                                // 更新人员数据
                                if (state.nowpath == "fence" || state.nowpath == "monitor" || state.nowpath == "dmap") that.commit('addAllSocketData', redata.personObj.loushu);
                                // 更新总人数
                                if (state.nowpath == "monitor") that.commit('changeAllPersonNum', redata.allPersonNum);

                                // 更新特殊关注数据
                                redata.attentionPersonObj.forEach(element => {
                                    element.wyid = element.id + element.healthstatuscode
                                });
                                if (state.allSpecialsData.length !== 0) {
                                    // 根据wyid删除数据
                                    if (state.nowpath == "mainIndex" || state.nowpath == "monitor" || state.nowpath == "dmap") that.commit('deleteSpecialsDataById', redata.removeAttentionList)
                                        // 根据健康人员删除数据
                                    if (state.nowpath == "mainIndex" || state.nowpath == "monitor" || state.nowpath == "dmap") that.commit('deleteSpecialsDataByhealthy', redata.normalPersonIdList)
                                        // 需要移除的关注信息（人员id）删除数据
                                    if (state.nowpath == "mainIndex" || state.nowpath == "monitor" || state.nowpath == "dmap") that.commit('deleteSpecialsDataByhealthy', redata.oldAttentionRemoveKeySet)
                                }
                                if (state.nowpath == "mainIndex" || state.nowpath == "monitor" || state.nowpath == "dmap") that.commit('updataAllSpecialsData', redata.attentionPersonObj)
                                    // 当前路由为主页时根据removeAttentionMap删除特殊关注事件
                                if (state.nowpath == "mainIndex") that.commit('addAllRemoveAttentionMap', redata.removeAttentionMap)
                                if (state.nowpath == "mainIndex") that.commit('deleteSpecialsDataByRemoveAttentionMap', state.allRemoveAttentionMap)
                            }, 0);
                        };
                        //关闭事件
                        state.allSocketArr[wsobj].onclose = function(msg) {
                            console.log(ip + ":连接已关闭！");
                        };
                    } catch (ex) {
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
        },
        // 关闭所有通道
        closeSocket(state) {
            state.allSocketArr.forEach(element => {
                element.close()
            });
        },
        // 更新警报人员
        updataAllSpecialsData(state, data) {
            // if (state.allSpecialsData.length !== 0) {
            //     state.allSpecialsData = state.allSpecialsData.concat(data)
            //     state.allSpecialsData.reverse()
            //     let obj = {}
            //     state.allSpecialsData = state.allSpecialsData.reduce(function(item, next) {
            //         obj[next.wyid] ? '' : obj[next.wyid] = true && item.push(next);
            //         return item;
            //     }, []);
            // } else {
            //     Array.prototype.push.apply(state.allSpecialsData, data);
            // }
            state.allSpecialsData = data
            let compare = function(obj1, obj2) {
                let val1 = obj1.wyid;
                let val2 = obj2.wyid;
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
            state.allSpecialsData.sort(compare)
                // 根据警报信息删除脱离区域人员
            this.commit('deleteAllpeople')
        },
        // 根据警报信息删除脱离区域人员
        deleteAllpeople(state) {
            let newAllSocketData = state.allSocketData
            let newAllSpecialsData = state.allSpecialsData.filter(item => item.healthstatuscode == 995)
            newAllSpecialsData.forEach(newAllSpecialsDataElement => {
                newAllSocketData.forEach(newAllSocketDataElement => {
                    let index = newAllSocketDataElement.persons.findIndex(i => i.id == newAllSpecialsDataElement.id)
                    if (index != -1) {
                        newAllSocketDataElement.persons.splice(index, 1)
                    }
                });
            });
        },
        // 获取全部危机
        updataEmergencyData(state) {
            state.emergencyData = state.allSpecialsData.filter(item => item.state == "危机")
            state.emergencyDataLength = state.emergencyData.length
        },
        // 获取全部关注
        updataSpecialAttentionData(state) {
            state.specialAttentionData = state.allSpecialsData.filter(item => item.state == "关注")
            state.specialAttentionDataLength = state.specialAttentionData.length
        },
        // 测试删除
        test(state, data) {
            let arr = [{ name: '元素1', id: '1' }, { name: '元素2', id: '2' }, { name: '元素3', id: '3' }, { name: '元素4', id: '4' }, ]
            let t = arr.findIndex(i => i.id == 2)
        },
        // 根据警报wyid删除警报信息
        deleteSpecialsDataById(state, data) {
            data.forEach(removeElement => {
                for (let i = 0; i < state.allSpecialsData.length; i++) {
                    if (removeElement == state.allSpecialsData[i].wyid) {
                        state.allSpecialsData.splice(i, 1)
                        break;
                    }
                }
            });
        },
        // 叠加全部删除map
        addAllRemoveAttentionMap(state, data) {
            for (let key in data) {
                state.allRemoveAttentionMap[key] = data[key]
            }
        },
        // 当前路由为主页时根据removeAttentionMap删除特殊关注事件
        deleteSpecialsDataByRemoveAttentionMap(state, data) {
            for (let i = 0; i < state.allSpecialsData.length; i++) {
                let rt = "personal_" + state.allSpecialsData[i].id + "_rail_" + this.state.token;
                let bt = "personal_" + state.allSpecialsData[i].id + "_body_" + this.state.token;
                let ra = eval("data." + rt);
                let ba = eval("data." + bt);
                if (ra == undefined && ba != undefined) {
                    for (let k = 0; k < ba.length; k++) {
                        if (state.allSpecialsData[i].healthstatuscode == ba[k].rail || state.allSpecialsData[i].railid == ba[k].rail) {
                            state.allSpecialsData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                } else if (ra != undefined && ba == undefined) {
                    for (let k = 0; k < ra.length; k++) {
                        if (state.allSpecialsData[i].healthstatuscode == ra[k].rail || state.allSpecialsData[i].railid == ra[k].rail) {
                            state.allSpecialsData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                }
            }
            // 获取全部危机
            this.commit('updataEmergencyData')
                // 获取全部关注
            this.commit('updataSpecialAttentionData')
        },
        // 根据健康人员删除警报信息
        deleteSpecialsDataByhealthy(state, data) {
            data.forEach(removeElement => {
                for (let i = 0; i < state.allSpecialsData.length; i++) {
                    if (removeElement == state.allSpecialsData[i].id) {
                        state.allSpecialsData.splice(i, 1)
                        i--
                    }
                }
            });
        },
        //更新allSocketData数据
        addAllSocketData(state, data) {
            // if (state.allSocketData.length !== 0) {
            //     data.forEach(dataelement => {
            //         state.allSocketData.forEach(allSocketDataelement => {
            //             if (dataelement.floorId === allSocketDataelement.floorId) {
            //                 allSocketDataelement.persons = allSocketDataelement.persons.concat(dataelement.persons)
            //                 allSocketDataelement.persons.reverse()
            //                 let obj = {}
            //                 allSocketDataelement.persons = allSocketDataelement.persons.reduce(function(item, next) {
            //                     obj[next.id] ? '' : obj[next.id] = true && item.push(next);
            //                     return item;
            //                 }, []);
            //             }
            //         });
            //     });
            // } else {
            //     Array.prototype.push.apply(state.allSocketData, data);
            // }
            state.allSocketData = data
            if (state.nowpath == "monitor" || state.nowpath == "dmap") this.commit('updataAllPeoplesdataNoloushu', state.allSocketData)
            if (state.nowpath == "monitor" || state.nowpath == "dmap") this.commit('updateRoomPeoplesData', state.allSocketData)
            if (state.nowpath == "monitor" || state.nowpath == "dmap") this.commit('updataAllBuildsPeopleLength', state.allSocketData)
            if (state.nowpath == "monitor") this.commit('updataEchartsData')
        },
        // 更新剔除楼层全体人员
        updataAllPeoplesdataNoloushu(state, data) {
            let newArr = [];
            data.forEach(loushuElement => {
                loushuElement.persons.forEach(personsElement => {
                    newArr.push(personsElement)
                });
            });
            let compare = function(obj1, obj2) {
                if (obj1.state == "危机" && (obj2.state == "关注" || obj2.state == "正常")) {
                    return 1;
                } else if (obj1.state == "关注" && (obj2.state != "关注" || obj2.state != "正常")) {
                    return -1;
                } else if (obj1.state == "正常" && (obj2.state != "正常")) {
                    return -1;
                } else {
                    return 0;
                }
            }
            newArr.sort(compare)
            state.allPeoplesdataNoloushu = newArr
        },

        // 更新人员
        updateRoomPeoplesData(state, data) {
            data.forEach(element => {
                if (element.floorId === state.nowFloorId) {
                    state.allPeoplesData = element.persons
                }
            });
            this.commit("addPelpleRoomsData", state.allPeoplesData)
        },
        // 更新建筑
        updataAllBuildsData(state, data) {
            state.allBuildsData = data
        },
        // 更新建筑内人员人数
        updataAllBuildsPeopleLength(state, data) {
            // persons
            state.allBuildsData.forEach(element => {
                element.loushu.forEach(ele => {
                    data.forEach(dataele => {
                        if (dataele.floorId == ele.floorId) {
                            Vue.set(ele, 'peopleLength', dataele.persons.length)
                        }
                    });
                });
            });
        },
        // 更新房间
        updataNowRoomsData(state, data) {
            state.nowRoomsData = data
        },
        // 房间内加入人员和危机颜色
        addPelpleRoomsData(state, data) {
            state.nowRoomsData.forEach(roomElement => {
                let peopleArr = []
                let peopleColorw = false
                let peopleColorg = false
                let peopleColorz = "transparent"
                data.forEach(pelpleElement => {
                    // 加入人员相对房间位置
                    // Vue.set(pelpleElement, 'roomNx', pelpleElement.x - pelpleElement.roomLeftXPixel * pelpleElement.proportion)
                    // Vue.set(pelpleElement, 'roomNy', pelpleElement.y - pelpleElement.roomLeftYPixel * pelpleElement.proportion)
                    // 加入人员相对房间位置
                    if (pelpleElement.roomid == roomElement.roomId) {
                        peopleArr.push(pelpleElement)
                            // peopleArr++
                        if (pelpleElement.state === "危机") {
                            peopleColorw = "#F56C6C"
                        } else if (pelpleElement.state === "关注") {
                            peopleColorg = "#E6A23C"
                        }
                    }
                });
                Vue.set(roomElement, 'peopleArr', peopleArr)
                Vue.set(roomElement, 'peopleColor', peopleColorw ? peopleColorw : (peopleColorg ? peopleColorg : peopleColorz))
            });
        },
        // 更新楼层
        updataFloorId(state, data) {
            state.nowFloorId = data
        },
        // 更新楼层组
        updataFloorGroup(state, data) {
            state.floorGroup = []
            for (var i = 0; i < data.length; i++) {
                state.floorGroup = state.floorGroup.concat(data[i].loushu);
            }
        },
        // 更新人员总数
        changeAllPersonNum(state, data) {
            state.allPersonNum = data
        },
        // 计算全部图表数据
        updataEchartsData(state) {
            let inHospitalNum = 0
            let outOfHospitalNum = 0
            let allNum = state.allPersonNum
                // 活动人数
            let activityPersonnel = 0
                // 静止人数
            let stationaryPersonnel = 0
                // 活动中人员监护等级
            let activitySelfCare = 0
            let activityHalfSelfCare = 0
                // 静止中人员监护等级
            let quiescenceSelfCare = 0
            let quiescenceHalfSelfCare = 0
            let quiescenceNoSelfCare = 0
            let Hearty = ['0', '50', '60', '70', '80', '90', '100', '110']
            let Heartx = [{ peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }]
            let wristTemperaturey = ['0', '35.6', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40']
            let wristTemperaturex = [{ peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }, { peoples: [], value: 0 }]
            let datad = []
            let dataz = []
            let datag = []

            state.allSocketData.forEach(element => {
                element.persons.forEach(personselement => {

                    // 计算心率人数
                    if (personselement.heartRate > 0 && personselement.heartRate < 50) {
                        Heartx[0].peoples.push(personselement)
                        Heartx[0].value++
                    } else if (personselement.heartRate >= 50 && personselement.heartRate < 60) {
                        Heartx[1].peoples.push(personselement)
                        Heartx[1].value++
                    } else if (personselement.heartRate >= 60 && personselement.heartRate < 70) {
                        Heartx[2].peoples.push(personselement)
                        Heartx[2].value++
                    } else if (personselement.heartRate >= 70 && personselement.heartRate < 80) {
                        Heartx[3].peoples.push(personselement)
                        Heartx[3].value++
                    } else if (personselement.heartRate >= 80 && personselement.heartRate < 90) {
                        Heartx[4].peoples.push(personselement)
                        Heartx[4].value++
                    } else if (personselement.heartRate >= 90 && personselement.heartRate < 100) {
                        Heartx[5].peoples.push(personselement)
                        Heartx[5].value++
                    } else if (personselement.heartRate >= 100 && personselement.heartRate < 110) {
                        Heartx[6].peoples.push(personselement)
                        Heartx[6].value++
                    } else if (personselement.heartRate >= 110 && personselement.heartRate < 255) {
                        Heartx[7].peoples.push(personselement)
                        Heartx[7].value++
                    }
                    // 计算体温人数
                    if (personselement.wristTemperature >= 0 && personselement.wristTemperature < 35.5) {
                        wristTemperaturex[0].peoples.push(personselement)
                        wristTemperaturex[0].value++
                    } else if (personselement.wristTemperature >= 35.5 && personselement.wristTemperature < 36) {
                        wristTemperaturex[1].peoples.push(personselement)
                        wristTemperaturex[1].value++
                    } else if (personselement.wristTemperature >= 36 && personselement.wristTemperature < 36.5) {
                        wristTemperaturex[2].peoples.push(personselement)
                        wristTemperaturex[2].value++
                    } else if (personselement.wristTemperature >= 36.5 && personselement.wristTemperature < 37) {
                        wristTemperaturex[3].peoples.push(personselement)
                        wristTemperaturex[3].value++
                    } else if (personselement.wristTemperature >= 37 && personselement.wristTemperature < 37.5) {
                        wristTemperaturex[4].peoples.push(personselement)
                        wristTemperaturex[4].value++
                    } else if (personselement.wristTemperature >= 37.5 && personselement.wristTemperature < 38) {
                        wristTemperaturex[5].peoples.push(personselement)
                        wristTemperaturex[5].value++
                    } else if (personselement.wristTemperature >= 38 && personselement.wristTemperature < 38.5) {
                        wristTemperaturex[6].peoples.push(personselement)
                        wristTemperaturex[6].value++
                    } else if (personselement.wristTemperature >= 38.5 && personselement.wristTemperature < 39) {
                        wristTemperaturex[7].peoples.push(personselement)
                        wristTemperaturex[7].value++
                    } else if (personselement.wristTemperature >= 39 && personselement.wristTemperature < 39.5) {
                        wristTemperaturex[8].peoples.push(personselement)
                        wristTemperaturex[8].value++
                    } else if (personselement.wristTemperature >= 39.5 && personselement.wristTemperature < 40) {
                        wristTemperaturex[9].peoples.push(personselement)
                        wristTemperaturex[9].value++
                    } else {
                        wristTemperaturex[10].peoples.push(personselement)
                        wristTemperaturex[10].value++
                    }
                    // 计算血压数据
                    if (personselement.highPressure <= 140 && personselement.highPressure >= 90) {
                        dataz.push(personselement.lowPressure, personselement.highPressure)
                    } else if (personselement.highPressure > 140) {
                        datag.push(personselement.lowPressure, personselement.highPressure)
                    } else if (personselement.highPressure < 90) {
                        datad.push(personselement.lowPressure, personselement.highPressure)
                    }
                    // 计算在院人员总数
                    inHospitalNum++
                    // 计算活动人员
                    if (personselement.stepNumber != 0) {
                        activityPersonnel++
                        if (personselement.nursingLevel == "全自理") {
                            activitySelfCare++
                        } else if (personselement.nursingLevel == "半自理") {
                            activityHalfSelfCare++
                        }
                    } else {
                        stationaryPersonnel++
                        if (personselement.nursingLevel == "全自理") {
                            quiescenceSelfCare++
                        } else if (personselement.nursingLevel == "半自理") {
                            quiescenceHalfSelfCare++
                        } else if (personselement.nursingLevel == "全介护") {
                            quiescenceNoSelfCare++
                        }
                    }
                });
            });
            // 计算人员外出情况统计
            outOfHospitalNum = allNum - inHospitalNum
            let HeartArr = [Hearty, Heartx]
            let wristTempeArr = [wristTemperaturey, wristTemperaturex]
            let bloodObj = {
                datag,
                dataz,
                datad
            }
            state.Personnel = {
                allNum,
                outOfHospitalNum,
                inHospitalNum,
                activityPersonnel,
                stationaryPersonnel,
                activitySelfCare,
                activityHalfSelfCare,
                quiescenceSelfCare,
                quiescenceHalfSelfCare,
                quiescenceNoSelfCare
            }
            state.heartRateData = HeartArr
            state.temperatureData = wristTempeArr
            state.bloodData = bloodObj
        },
        // 电子围栏使用房间内变色
        changeRoomColor(state, data) {
            state.nowRoomsData.forEach((element, index) => {
                element.active = false;
            });
            data.forEach(valElement => {
                state.nowRoomsData.forEach((nowRoomsDataElement, index) => {
                    if (valElement === nowRoomsDataElement.roomId) {
                        nowRoomsDataElement.active = true;
                    }
                });
            });
        }
    },
    actions: {
        //  开始连接多路通道
        startSocoket({ commit }) {
            // 循环服务器连接
            commit('createdScoket')
        },
        // 获取楼层和房间
        mainPage_getFloorAndRoomJson({ commit }) {
            return functionarrs
                .mainPage_getFloorAndRoomJson()
                .then(data => {
                    commit("updataAllBuildsData", data)
                    commit("updataFloorGroup", data)
                    commit("updataNowRoomsData", data[0].loushu[0].roomqing)
                    return data
                });
        }
    }
}