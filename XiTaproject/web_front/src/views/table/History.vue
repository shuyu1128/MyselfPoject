<template>
  <div class="history">
    <div class="tiaojian">
      <table
        border="none"
        bordercolor="#fff"
        class="bubian"
        style="text-align: left;height:300px;margin-left:400px"
      >
        <tr>
          <td>报告类型：</td>
          <td style="text-align:right">
            <el-select v-model="value" placeholder="请选择报告类型" style="width:220px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>查询时间：</td>
          <td style="text-align:right">
            <el-date-picker
              v-if="xuanze=='day' "
              v-model="valuer"
              type="date"
              placeholder="选择日期"
              style="width:220px"
            ></el-date-picker>
            <el-date-picker
              v-if="xuanze=='week' "
              v-model="valuer"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
            ></el-date-picker>
            <el-date-picker v-if="xuanze=='month' " v-model="valuer" type="month" placeholder="选择月"></el-date-picker>
            <el-date-picker v-if="xuanze=='year' " v-model="valuer" type="year" placeholder="选择年"></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>个人信息：</td>
          <td>
            <el-select
              v-model="value2"
              multiple
              collapse-tags
              style="margin-left: 20px;width:220px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in defvaluedata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;width:100px;">
            <el-checkbox v-model="checked1">详细数据</el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="checked2" disabled>健康分析(开发中)</el-checkbox>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <!-- <el-button type="primary" @click="giveword">生成报表</el-button> -->
            <button class="givepdf" @click="giveword">生成报表</button>
          </td>
        </tr>
      </table>
    </div>
    <!--startprint-->
    <el-dialog title="预览" :visible.sync="dialogTableVisible">
      <div class="yanshi" v-if="dialogTableVisible">
        <div id="pdfDom">
          <div class="page1">
            <li>{{conte.fullname}}</li>
            <li>{{conte.code}}</li>
            <li>{{value=='day'?'日报':(value=='week'?'周报':(value=='month'?'月报':'年报'))}}</li>
            <li>{{valuer.toISOString().slice(0,10)}}</li>
          </div>
          <div class="page2">
            <h1 style="text-align:center;font-size:34px;margin-bottom:20px">目录</h1>
            <li style="margin-bottom:50px">
              1. 个人信息
              <i v-for="item in 20" :key="item" class="el-icon-more"></i>
            </li>
            <li style="margin-bottom:30px;">
              2. 健康数据
              <i v-for="item in 20" :key="item" class="el-icon-more"></i>
            </li>
            <li style="margin-bottom:30px;margin-left:30px;font-size:20px;">
              2.1 数据
              <i v-for="item in 25" :key="item" class="el-icon-more-outline"></i>
            </li>
            <li style="margin-bottom:50px;margin-left:30px;font-size:20px;">
              2.2 详情
              <i v-for="item in 25" :key="item" class="el-icon-more-outline"></i>
            </li>
            <li style="margin-bottom:50px">
              3. 生命体征历史信息
              <i v-for="item in 16" :key="item" class="el-icon-more"></i>
            </li>
            <li style="margin-bottom:50px">
              4. 特殊状况
              <i v-for="item in 20" :key="item" class="el-icon-more"></i>
            </li>
            <li style="margin-bottom:50px">
              5. 分析结果
              <i v-for="item in 20" :key="item" class="el-icon-more"></i>
            </li>
          </div>
          <div class="page3">
            <span style="font-size: 24px;color: #303133;">一、个人信息</span>
            <div class="geren" style="margin-bottom:20px;">
              <div>
                <li v-for="(item,index) in zhendefvalue" :key="index" class="kapianconte">
                  <span>{{item.label}}：</span>
                  <span>{{item.value}}</span>
                </li>
              </div>
              <div class="imgurl">
                <img :src="imageUrls" alt />
              </div>
            </div>
            <span style="font-size: 24px;color: #303133;">二、健康数据</span>
            <div style="margin-top: 20px;">
              <Testingtable :did="did" :returnPictureMaps="returnPictureMap" />
            </div>
          </div>
          <div v-if="checked1" class="page4">
            <table v-if="value=='year'" class="details">
              <tr>
                <td colspan="7">{{title}}</td>
              </tr>
              <tr>
                <td style="width:280px">周</td>
                <td style="width:280px">开始日期</td>
                <td style="width:280px">结束日期</td>
                <td>心率</td>
                <td>高压</td>
                <td>低压</td>
                <td>体温</td>
              </tr>
              <tr v-for="(item,index) in onetabledata" :key="index">
                <td v-for="(i,o) in item" :key="o">{{i}}</td>
              </tr>
            </table>

            <table v-else class="details">
              <tr>
                <td colspan="5">{{title}}</td>
              </tr>
              <tr>
                <td style="width:280px">时间</td>
                <td>心率</td>
                <td>高压</td>
                <td>低压</td>
                <td>体温</td>
              </tr>
              <tr v-for="(item,index) in onetabledata" :key="index">
                <td v-for="(i,o) in item" :key="o">{{i}}</td>
              </tr>
            </table>
          </div>
          <div v-for="(item,index) in pdfHistoricalVitalSignsData" :key="index" class="page6">
            <p
              v-show="index==0"
              style="font-size: 24px;color: #303133;margin-bottom:20px"
            >三、生命体征历史信息</p>
            <li class="historical-vital-signs-list">
              <span>序号</span>
              <span>时间</span>
              <span>心率</span>
              <span>高压</span>
              <span>低压</span>
              <span>体温</span>
            </li>
            <li class="historical-vital-signs-list" v-for="(xitem,xindex) in item" :key="xindex">
              <span>{{xitem.num}}</span>
              <span>{{xitem.createtime}}</span>
              <span>{{xitem.heartrate}}bpm</span>
              <span>{{xitem.highpressure}}mmHg</span>
              <span>{{xitem.lowpressure}}mmHg</span>
              <span>{{xitem.wristTemperature}}℃</span>
            </li>
          </div>
          <div class="page5">
            <span style="font-size: 24px;color: #303133;">四、特殊状况</span>
            <div class="jinji">
              <el-table :data="tableData" style="width:688px;">
                <el-table-column prop="name" label="类型"></el-table-column>
                <el-table-column prop="createdtime" label="开始时间"></el-table-column>
                <el-table-column prop="duration" label="结束时间"></el-table-column>
                <el-table-column prop="nickname" label="解除人"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="page6">
            <span style="font-size: 24px;color: #303133;">五、分析结果</span>
            <br />
            <span style="font-size: 16px;color: #c0c4cc; margin-top:12px;">需开通健康状况分析功能</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" v-on:click="getPdf('#pdfDom',htmlTitle)">下载报表</el-button>
      </span>
    </el-dialog>

    <!--endprint-->
  </div>
</template>
<script>
// import '../../jquery-3.2.1.min.js'
import Testingtable from "./Testingtable.vue";
export default {
  components: {
    Testingtable,
  },
  data() {
    return {
      returnPictureMap: {},
      imgs: "",
      dialogTableVisible: false,
      htmlTitle: "健康档案",
      tableData: [
        {
          date: "",
          name: "",
          address: "",
        },
      ],
      // 图表数据
      onetabledata: [],
      title: "",
      conte: "",
      xuanze: "day",
      value2: [],
      // 自定义卡内容
      defvalue: [],
      // 自定卡内容汉字
      defvaluedata: [],
      // 获取出渲染的内容1
      zhendefvaluedata: [],
      // 获取出渲染的内容2
      zhendefvalue: [],
      option: [],
      valuer: "",
      valuez: "",
      valuey: "",
      valuen: "",
      checked1: true,
      checked2: true,
      options: [
        {
          label: "日报",
          value: "day",
        },
        {
          label: "周报",
          value: "week",
        },
        {
          label: "月报",
          value: "month",
        },
        {
          label: "年报",
          value: "year",
        },
      ],
      value: "day",
    };
  },
  props: {
    kapians: null,
    did: null,
    imageUrls: null,
  },
  computed: {
    pdfHistoricalVitalSignsData() {
      console.log(this.$store.state.details.pdfHistoricalVitalSignsData);
      this.$store.state.details.pdfHistoricalVitalSignsData.forEach(
        (element, index) => {
          element.createtime = vm.formatTime(element.createtime, "Y-M-D h:m:s");
          element.num = index + 1;
        }
      );
      var result = [];
      for (
        var i = 0;
        i < this.$store.state.details.pdfHistoricalVitalSignsData.length;
        i += 30
      ) {
        result.push(
          this.$store.state.details.pdfHistoricalVitalSignsData.slice(i, i + 30)
        );
      }
      return result;
    },
  },
  created() {
    this.kapians.forEach((element) => {
      this.value2.push(element.code);
    });
    // 获取全部汉字
    this.$ajax
      .post(
        process.env.API_HOST + "/person/getAllProfileSettings",
        `userid=${this.$store.state.token}`
      )
      .then((res) => {
        res.data.forEach((element) => {
          this.defvaluedata.push({ label: element.name, value: element.code });
        });
      });
    // 获取键值对
  },
  watch: {
    value(val) {
      this.xuanze = val;
      //   console.log(val)
    },
  },
  methods: {
    giveword() {
      if (this.valuer != null && this.valuer != "" && this.value2.length != 0) {
        const loading = this.$loading({
          lock: true,
          text: "加载中，请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$store.dispatch("person_getAllVitalSignsListByPersonId", {
          personid: this.did,
          type: this.value,
          beginDate: this.valuer.toISOString().slice(0, 10),
        });

        // 获取图+表
        this.$ajax
          .post(
            process.env.API_HOST + "/person/historyTimeHealth",
            `personid=${this.did}&type=${
              this.value
            }&beginDate=${this.valuer.toISOString().slice(0, 10)}`
          )
          .then((res) => {
            console.log(res.data);
            this.returnPictureMap = res.data.returnPictureMap;
            this.onetabledata = res.data.returnTableMap.tableList;
            this.title = res.data.returnTableMap.title;
            this.dialogTableVisible = true;
            loading.close();
          });
        // 获取图表
        this.$ajax
          .post(
            process.env.API_HOST + "/person/getExceptionalCase",
            `personid=${this.did}&type=${
              this.value
            }&beginDate=${this.valuer.toISOString().slice(0, 10)}`
          )
          .then((res) => {
            this.tableData = res.data;
          });
        // 获取个人信息
        this.zhendefvaluedata = [];
        (this.zhendefvalue = []), (this.defvalue = []);
        this.$ajax
          .post(
            process.env.API_HOST + "/person/getPersonById",
            `id=${this.did}`
          )
          .then((respones) => {
            this.conte = respones.data.prnPerson;
            this.htmlTitle = `${this.conte.fullname}--健康档案`;
            for (var prop in this.conte) {
              this.defvalue.push({ label: prop, value: this.conte[prop] });
            }
            this.defvaluedata.forEach((element) => {
              this.value2.forEach((ele) => {
                if (element.value == ele) {
                  this.zhendefvaluedata.push(element);
                }
              });
            });

            this.defvalue.forEach((zhenelement) => {
              this.zhendefvaluedata.forEach((zhenele) => {
                if (zhenelement.label == zhenele.value) {
                  this.zhendefvalue.push({
                    label: zhenele.label,
                    value: zhenelement.value,
                  });
                }
              });
            });

            console.log(this.zhendefvalue);
          });
      } else {
        this.$message.error("请选择以上选项");
      }
    },
  },
};
</script>

<style scoped>
.givepdf {
  width: 342px;
  height: 50px;
  background-color: #409eff;
  border-radius: 4px;
  border: none;
  color: #fff;
}
.details td {
  border: 1px solid #dcdfe6;
  width: 150px;
  height: 30px;
  text-align: center;
}
.page1 {
  width: 788px;
  height: 1099px;
  background: #fff url(../../assets/feng.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.page1 li {
  width: 250px;
  height: 30px;
  /* background-color: blue; */
  position: absolute;
  font-size: 24px;
  color: #53545f;
}
.page1 li:nth-of-type(1) {
  top: 712px;
  left: 398px;
}
.page1 li:nth-of-type(2) {
  top: 758px;
  left: 369px;
}
.page1 li:nth-of-type(3) {
  top: 806px;
  left: 443px;
}
.page1 li:nth-of-type(4) {
  top: 854px;
  left: 443px;
}
.page2 {
  /* width: 688px;
  height: 999px;
  padding: 50px; */
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  font-size: 24px;
  color: #303133;
  position: relative;
}
.page3 {
  /* width: 688px;
  height: 999px;
  padding: 50px; */
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.page3 .geren {
  width: 608px;
  height: 200px;
  margin-top: 20px;
  /* background-color: yellow; */
}
.page4 {
  /* width: 688px;
  height: 999px;
  padding: 50px; */
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.page5 {
  /* width: 688px;
  height: 999px;
  padding: 50px; */
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.page6 {
  /* width: 688px;
  height: 999px;
  padding: 50px; */
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.historical-vital-signs-list {
  height: 30px;
  line-height: 30px;
  border: 1px solid #ebeef5;
  border-top: none;
}
.historical-vital-signs-list span {
  width: 14%;
  text-align: center;
  display: inline-block;
}
.historical-vital-signs-list span:nth-of-type(2) {
  width: 26%;
  text-align: center;
  display: inline-block;
}
.historical-vital-signs-list:first-of-type {
  border-top: 1px solid #ebeef5;
}
.geren li {
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}
.geren div:first-of-type {
  width: 510px;
  height: 200px;
  float: left;
  font-size: 12px;
}
.geren div:last-of-type {
  float: left;
  width: 95px;
  height: 104px;
  background-color: #303133;
}
.geren div:last-of-type img {
  width: 100%;
  height: 100%;
}
.tiaojian {
  width: 30%;
  height: 100%;
  /* background-color: aqua; */
  float: left;
}
.yanshi {
  width: 788px;
  height: 600px;
  overflow-y: auto;
  margin-left: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #f5f7fa;
}
.yanshi > div > div {
  margin-bottom: 20px;
}
.yanshi::-webkit-scrollbar {
  display: none;
}
.bubian {
  margin-left: 20px;
  margin-top: 20px;
}
.history {
  height: 100%;
}
</style>

