<template>
  <div>
    <div style="padding-left:20px;position: relative;">
      <el-button type="primary" style="margin-top:20px;" @click="generate">生成全部基站校验信息</el-button>
      <el-button type="primary" @click="comptonrssi">开始计算rssi值</el-button>
      <br />
      <span>基站：</span>
      <el-input
        style="margin-bottom:20px;margin-top:20px;width:300px;margin-left: 27px;"
        v-model="basestationcode"
        placeholder="请输入基站code"
      ></el-input>
      <br />
      <span>手环：</span>
      <el-input
        style="margin-bottom:20px;width:300px;margin-left: 27px;"
        v-model="devicecode"
        placeholder="请输入手环code"
      ></el-input>
      <br />
      <span>次数：</span>
      <el-input
        style="width:300px;margin-bottom:20px;margin-left: 27px;"
        v-model="num"
        placeholder="请输入循环次数"
      ></el-input>
      <br />
      <span>编码：</span>
      <el-input
        style="width:300px;margin-bottom:20px;margin-left: 27px;"
        v-model="datumBasestationcode"
        placeholder="请输入基准基站编码"
      ></el-input>
      <br />
      <span>d值：</span>
      <el-input
        style="width:300px;margin-bottom:20px;margin-left:32px;"
        v-model="dvalue"
        placeholder="请输入d值"
      ></el-input>
      <button style="padding:2px 10px" @click="updateDvalue">修改d值</button>
      <br />
      <span>基站高度：</span>
      <el-input style="width:300px;" v-model="basestationheight" placeholder="请输入基站高度"></el-input>
      <button style="padding:2px 10px;margin-bottom:40px" @click="updatebasestationheight">修改基站高度</button>
      <br />
      <span>定位计算定时周期：</span>
      <el-input style="width:300px;" v-model="timingcycle" placeholder="单位秒"></el-input>
      <button style="padding:2px 10px" @click="timingcyclek">确定</button>
    </div>
    <div class="sectionjiao">
      
     


      <el-select style="width:300px;margin-bottom:20px;" v-model="mainBasestationCodevalue" placeholder="请选择主机站">
      <el-option
        v-for="item in mainBasestationCode"
        :key="item.maincode"
        :label="item.mainname"
        :value="item.maincode"
      ></el-option>
    </el-select>
    <br>
    <el-select style="width:300px;margin-bottom:20px;" v-model="basestationCodesvalue" multiple collapse-tags placeholder="请选择子基站">
      <el-option v-for="item in basestationCodes" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>



      <br>
      <el-select style="width:300px;margin-bottom:20px;" v-model="checkType" placeholder="选择类型">
        <el-option
          v-for="item in checkTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <br>
      <el-input style="width:300px;margin-bottom:20px;" v-model="checkNum" placeholder="输入校验次数"></el-input> 次数
      <br>
      <el-input style="width:300px;margin-bottom:20px;" v-model="checkCycleTime" placeholder="输入校验间隔"></el-input> 间隔
      <br>
      <el-button style="margin-left:187px;" type="primary" @click="sectionjiaoyan">校验主机站</el-button>
    </div>
    <calculrssi />
    <xiaxing />
    <ul v-if="show" class="cla_ul" ref="claul">
      <li class="rssiitem">{{cont}}</li>
    </ul>
  </div>
</template>
<script>
import calculrssi from './calculrssi'
import xiaxing from './xiaxing'
var i = 0;
export default {
  components:{
    calculrssi,
    xiaxing
  },
  data() {
    return {
      timingcycle:'',
      checkCycleTime:0,
      checkNum:'',
      checkType:'',
      checkTypes:[
        {label:'周期',value:1},
        {label:'单次',value:0}
      ],
      // 选择的基站
       basestationCodes: [],
        basestationCodesvalue: '',
        mainBasestationCode: [],
      mainBasestationCodevalue: "",
      // 全部主机站
      allsection:[],
      basestationcode: "",
      devicecode: "",
      num: "",
      datumBasestationcode:"",
      dvalue: "",
      basestationheight: "",
      cont: "添加中...",
      show: false
      //   count: [],
      //   i: 0
    };
  },
  created() {
    // 查询全部主基站信息
    this.$ajax
      .post(
        process.env.API_HOST +
          "/basBasestationCheck/getBasMainbasestationPOList"
      )
      .then(respones => {
        this.mainBasestationCode = respones.data;
      });

this.$ajax
        .post(
          process.env.API_HOST + "/basBasestationCheck/getBasMainbasestationPOList"
        )
        .then(respones => {
          this.allsection=respones.data
        });
  },
  destroyed() {
    this.websocketclose();
  },
  watch: {
    count(val) {
      this.$refs.claul.scrollTop = this.$refs.claul.scrollHeight;
    },
     mainBasestationCodevalue(val){
          this.basestationCodesvalue=[]

// 通过主基站查询子基站
 this.$ajax
      .post(
        process.env.API_HOST +
          "mainBasestation/getChildBasestationByMain",`mainBasestationCode=${val}`
      )
      .then(respones => {
        this.basestationCodes = respones.data;
      });
      },
  },
  methods: {
    timingcyclek(){

if(this.timingcycle>0&&this.timingcycle<=60){
   this.$ajax
      .post(process.env.API_HOST+'/selfExamination/insertSelfExamination',`beginTime=2000-1-1 0:0:0&cycle=${this.timingcycle}&unit=second&type=data`)
      .then(response => {
      })
}else{
  alert('请保持0~60之间')
}
   


    },
    sectionjiaoyan(){
      // 校验主基站
      this.$ajax
        .post(
          process.env.API_HOST + "/basBasestationCheck/creatBasestationCheckSocketData",
          `mainbasestationId=${this.mainBasestationCodevalue}&basestationCodes=${this.basestationCodesvalue}&checkType=${this.checkType}&checkNum=${this.checkNum}&checkCycleTime=${this.checkCycleTime}`
        )
        .then(respones => {

if(respones.data=="success"){
  this.$message({
          message: '校验成功',
          type: 'success'
        });
}else{
  this.$message.error('校验失败');
}



        });
    },
    updatebasestationheight() {
      this.$ajax
        .post(
          process.env.API_HOST + "/basBasestationCheck/updatebasestationheight",
          `basestationheight=${this.basestationheight}`
        )
        .then(respones => {
          console.log("修改基站返回结果", respones.data);
        });
    },
    updateDvalue() {
      this.$ajax
        .post(
          process.env.API_HOST + "/basBasestationCheck/updateDvalue",
          `dvalue=${this.dvalue}`
        )
        .then(respones => {
          console.log("修改d值返回结果", respones.data);
        });
    },
    comptonrssi() {
      if ((this.basestationcode != "", this.devicecode != "", this.num != "")) {
        this.$ajax
          .post(
            process.env.API_HOST + "/basBasestationCheck/openRssiCalculation",
            `basestationcode=${this.basestationcode}&devicecode=${this.devicecode}&num=${this.num}&dvalue=${this.dvalue}&basestationheight=${this.basestationheight}&datumBasestationcode=${this.datumBasestationcode}`
          )
          .then(respones => {
            console.log("校验返回结果", respones.data);
            this.initWebSocket();
            this.show = true;
            this.cont = "添加中...";
          });
      } else {
        this.$message({
          message: "不能为空",
          type: "warning"
        });
      }
      // 开始计算rssi值
    },
    generate() {
      // 生成全部基站校验信息
      this.$ajax
        .post(
          process.env.API_HOST +
            "/basBasestationCheck/insertBasBasestationCheck"
        )
        .then(respones => {
          console.log("生成全部基站校验信息", respones.data);
          if (respones.data.state == "success") {
            this.$alert("校验成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else {
            this.$alert("校验失败", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        });
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://"+process.env.ws_host+"/rssiCalculationWebsocket";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {},
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      console.log(e.data);
      this.cont = e.data;
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      // console.log('断开连接',e);
    }
  }
};
</script>
<style scoped>
.sectionjiao {
  /* width: 200px; */
  height: 500px;
  margin-top: 100px;
  margin-left: 20px;
}
.cla_ul {
  width: 500px;
  height: 100px;
  border-radius: 4px;
  position: fixed;
  top: 82px;
  left: 472px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-y: auto;
  padding: 0 0 20px 20px;
  
}
.rssiitem {
  height: 30px;
  line-height: 30px;
}
.rssiitem:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
