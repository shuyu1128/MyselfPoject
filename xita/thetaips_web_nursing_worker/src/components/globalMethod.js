import { Notify } from 'vant';
var  storage  = {
    // 接口返回时的提示判断
    ifTips(data) {
        if (data.state === 'success') {
            Notify({ type: 'success', message: data.msg });
            return true
        } else {
            Notify({ type: 'danger', message: data.msg });
            return false
        }
    },
    // 取出树形结构所有第一行形成数组
    getFirstTree(Tree, name, id) {
        var newarr = []
        let forTree = function(Tree, name, id) {
            newarr.push(Tree[0][id])
            if (Tree[0][name]) forTree(Tree[0][name], name, id)
        }
        forTree(Tree, name, id)
        return newarr
    },
    //1.功能：将浮点数四舍五入，取小数点后2位  
    toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    },
    //加法  
    FloatAdd(arg1, arg2) {
        var r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    //减法  
    FloatSub(arg1, arg2) {
        var r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度  
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    //乘法  
    FloatMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try { m += s1.split(".")[1].length } catch (e) {}
        try { m += s2.split(".")[1].length } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // 获取过往系统时间
    getDay(num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24 * 3600 * 1000 * num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    },
    // 分钟数转换小时数
    ChangeHourMinutestr(str) {
        if (str !== "0" && str !== "" && str !== null) {
            return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
                (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
        } else {
            return "";
        }
    }

}

export  default  storage;