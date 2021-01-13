/**
 * User: peijialong
 * Date: 2020/05/15
 * Description: 主页数据
 */
import { functionarrs } from '../../../api/api'
export default {
    state: {
        // 紧急事件
        emergencyData: [],
        emergencyLength: 0,
        // 特殊关注
        specialAttentionData: [],
        specialAttentionLength: 0
    },
    mutations: {
        rrrrrrtest(state,json){
            console.log('调用成功');
        },
        // 更新紧急事件
        changeEmergencyData(state, json) {
            state.emergencyData = json.data
           
            for (let i = 0; i < state.emergencyData.length; i++) {
                let rt = "personal_" + state.emergencyData[i].id + "_rail_" + this.state.token;
                let bt = "personal_" + state.emergencyData[i].id + "_body_" + this.state.token;
                let ra = eval("json.removeAttentionMap." + rt);
                let ba = eval("json.removeAttentionMap." + bt);
                if (ra == undefined && ba != undefined) {
                    for (let k = 0; k < ba.length; k++) {
                        if (state.emergencyData[i].healthstatuscode == ba[k].rail || state.emergencyData[i].railid == ba[k].rail) {
                            state.emergencyData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                } else if (ra != undefined && ba == undefined) {
                    for (let k = 0; k < ra.length; k++) {
                        if (state.emergencyData[i].healthstatuscode == ra[k].rail || state.emergencyData[i].railid == ra[k].rail) {
                            state.emergencyData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                }
            }
            state.emergencyLength = state.emergencyData.length
        },
        //   更新特殊关注
        changeSpecialAttentionData(state, json) {
            state.specialAttentionData = json.data

            for (let i = 0; i < state.specialAttentionData.length; i++) {
                let rt = "personal_" + state.specialAttentionData[i].id + "_rail_" + this.state.token;
                let bt = "personal_" + state.specialAttentionData[i].id + "_body_" + this.state.token;
                let ra = eval("json.removeAttentionMap." + rt);
                let ba = eval("json.removeAttentionMap." + bt);
                if (ra == undefined && ba != undefined) {
                    for (let k = 0; k < ba.length; k++) {
                        if (state.specialAttentionData[i].healthstatuscode == ba[k].rail || state.specialAttentionData[i].railid == ba[k].rail) {
                            state.specialAttentionData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                } else if (ra != undefined && ba == undefined) {
                    for (let k = 0; k < ra.length; k++) {
                        if (state.specialAttentionData[i].healthstatuscode == ra[k].rail || state.specialAttentionData[i].railid == ra[k].rail) {
                            state.specialAttentionData.splice(i, 1)
                            i--
                            break;
                        }
                    }
                }
            }
            state.specialAttentionLength = state.specialAttentionData.length

        }
    },
    actions: {

    }
}