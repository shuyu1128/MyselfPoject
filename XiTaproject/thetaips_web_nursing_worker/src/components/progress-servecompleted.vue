<template>
  <div>
    <div class="progress_style">
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        close-on-click-action
      />
      <div
        data-v-793acac2=""
        class="van-hairline van-step van-step--vertical van-step--process"
      >
        <div class="van-step__title van-step__title--active">
          <p data-v-793acac2="" style="color: #1989fa">{{ nursingcontents }}</p>
          <div class="text_style">
            <van-row
              style="margin-bottom: 6px"
              type="flex"
              justify="space-between"
            >
              <van-col span="16">
                <div v-if="lastTime != null">
                  <span
                    >上次更新时间：{{ lastTime == "" ? "无" : lastTime }}</span
                  >
                </div>
                <div v-else>
                  <span style="margin-right: 16px"
                    >开始时间：{{ begintime }}</span
                  >
                  <span>结束时间：{{ endtime }}</span>
                </div>
              </van-col>
              <van-col span="6" style="text-align: right">
                <span>
                  <van-icon name="manager" class="manager_style" />
                  {{ nowPeople.fullname }}
                </span>
              </van-col>
            </van-row>
            <van-row>
              <van-col class="addConsumables">
                <van-button
                  type="primary"
                  size="small"
                  class="addConsumablesbtn"
                  @click="showhiddenArea('hiddenAreafather')"
                  >添加耗材</van-button
                >
              </van-col>
            </van-row>
          </div>
        </div>
        <div id="hiddenAreafather" style="display: none">
          <div class="hiddenArea">
            <div>
              <van-search
                show-action
                placeholder="请输入搜索关键词"
                class="searchInput"
                background="#1989fa"
                v-model="materialname"
              >
                <template #action>
                  <div style="color: white" @click="searchMaterials">搜索</div>
                </template>
              </van-search>
            </div>
            <div
              style="
                width: 76%;
                margin-left: 13%;
                height: 85px;
                margin-top: 10px;
                overflow-x: auto;
                overflow-y: hidden;
              "
            >
              <div
                :style="'width:' + this.itemdetailsBoxS.length * '90' + 'px'"
                class="itemBoxs"
              >
                <div
                  v-for="item in itemdetailsBoxS"
                  :key="item.id"
                  :class="
                    detailsBoxId == item.id
                      ? 'active_itemdetailsBox'
                      : 'itemdetailsBox'
                  "
                  @click="changeColor(item.id)"
                >
                  <div style="height: 20px; text-align: center">
                    <div style="font-size: 12px">{{ item.materialname }}</div>
                  </div>
                  <div style="height: 20px; text-align: center">
                    <div style="font-size: 12px">库存:{{ item.amount }}</div>
                  </div>
                  <div style="height: 20px; text-align: center">
                    <div style="font-size: 12px">单价:{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="adddiv">
              <van-stepper
                v-model="value"
                class="addstepper"
                @change="onchange"
              />
              <van-button
                type="primary"
                size="small"
                class="addBtn"
                @click="insertNursingMaterialUsageDetails"
                >添加</van-button
              >
            </div>
            <div class="details">
              <!-- 物品详情上半部分 -->
              <div style="margin-left: 13%">
                <div>
                  <div style="float: left; font-size: 12px; height: 50px">
                    <span>使用耗材:</span>
                  </div>
                  <!-- 物品使用详情-->
                  <div
                    style="
                      height: 50px;
                      margin-left: 20px;
                      margin-top: 5px;
                      overflow-y: auto;
                      font-size: 12px;
                    "
                  >
                    <div>
                      <div
                        v-for="item in useMaterials"
                        :key="item.id"
                        style="margin-left: 20px"
                      >
                        <div
                          style="float: left; width: 15%; margin-right: 30px"
                        >
                          <span>
                            {{ item.materialname }}
                          </span>
                        </div>
                        <div style="float: left; width: 40%">
                          <span>
                            {{
                              "￥" +
                              item.price +
                              ".00" +
                              "元/件" +
                              "x" +
                              item.value
                            }}
                          </span>
                        </div>
                        <div style="float: left; width: 5%; height: 12px"></div>
                        <img
                          src="../assets/delect.png"
                          @click="delectMaterials(item.id)"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 物品详情下半部分 -->
                <div style="height: 30px; font-size: 12px; margin-top: 5px">
                  <div style="float: left">
                    <span> 合计: </span>
                  </div>
                  <div
                    style="float: left; margin-left: 42px; margin-bottom: 30px"
                  >
                    {{ "￥" + this.sum }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="underHide">
          <div style="color: #646566; font-size: 12px">
            <van-row type="flex" justify="space-between">
              <van-col span="24">
                <span>备注：{{ nursingdesc }}</span>
              </van-col>
            </van-row>
          </div>
          <div style="min-height: 48px; margin-bottom: 16px">
            <van-field
              v-if="istext == '是'"
              v-model="message"
              rows="2"
              autosize
              label="反馈:"
              type="textarea"
              maxlength="100"
              placeholder="请输入反馈"
              show-word-limit
              style="font-size: 12px; padding: 0px 10px; padding-left: 0px"
            />
          </div>
          <div>
            <van-row>
              <van-col span="20">
                <div v-if="ispicture == '是'">
                  <div><span class="img_style"> 完成服务上传服务: </span></div>
                  <!-- <van-image
                    v-if="imgsrc"
                    width="80"
                    height="80"
                    :src="imgsrc"
                    class="uploader_style"
                    :deletable="true"
                  /> -->
                  <!-- <van-uploader
                    class="uploader_style"
                    :after-read="afterRead"
                    :deletable="true"
                  /> -->
                  <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    :max-count="3"
                    class="img_uploader"
                  >
                  </van-uploader>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="van-step__circle-container">
          <i
            style="color: #1989fa"
            class="van-icon van-icon-checked van-step__icon van-step__icon--active"
          >
          </i>
        </div>
        <div class="van-step__line"></div>
        <div style="width: 100%; height: 40px"></div>
      </div>
    </div>
    <!-- 不动  icon="success"-->
    <div class="warning_btn">
      <van-row style="min-height: 48px">
        <van-col style="float: right">
          <span style="display: none">{{ "合计:" + this.sum }}</span>
          <van-button
            type="info"
            @click="show = true"
            style="margin-right: 65px; border-radius: 12px; height: 30px"
          >
            提交
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { CellGroup, Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      materialidList: "",
      sum: 0,
      useMaterials: [],
      materialname: "",
      value: 1,
      detailsBoxId: "",
      itemdetailsBoxS: [],
      message: "",
      show: false,
      actions: [{ name: "确定" }],
      // 上传成功返回文件id
      fileId: [],
      imgsrc: false,
      // itemdetailunderBox: [],
      searchMaterial() {},
    };
  },
  props: {
    nursingcontents: "",
    nursingdesc: "",
    lastTime: "",
    begintime: "",
    endtime: "",
    ispicture: "",
    istext: "",
    id: "",
    type: "",
  },
  computed: {
    // 当前查看长者
    nowPeople() {
      return this.$store.state.nowPeople;
    },
  },
  created() {
    this.getMaterialInformationListByMaterialname();
  },
  methods: {
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      axios
        .post(
          process.env.VUE_APP_URL +
            "/nursing/nursingContents/uploadNursingContentsFile",
          formData,
          { "Content-Type": "multipart/form-data" }
        )
        .then((res) => {
          if (this.$globalMethod.ifTips(res.data)) {
            this.fileId.push(res.data.fileid);
            this.imgsrc = process.env.VUE_APP_URL + res.data.imgsrc;
          }
        });
    },
    onSelect(item) {
      // 判断是否打卡
      if (this.message == "" && this.istext == "是") {
        Toast.fail({
          message: `请输入反馈`,
          position: `bottom`,
        });
      } else if (this.fileId == [] && this.ispicture == "是") {
        Toast.fail({
          message: `请上传 jpg 格式图片`,
          position: `bottom`,
        });
      } else {
        this.useMaterials.forEach((element) => {
          element.amount = element.amount - element.value;
          element.insertamount = element.value;
          element.nursingcontentsid = this.id;
          element.nursingcontentstype = this.type;
        });
        let data = {
          mmMaterialusagedetailsPOList: JSON.stringify(this.useMaterials),
          feedback: this.istext == "是" ? this.message : "",
          fileids:
            this.ispicture == "是"
              ? JSON.stringify(this.fileId)
              : JSON.stringify([]),
          nursingContentsid: this.id,
          type: this.type,
          personid: this.type == "team" ? "" : this.nowPeople.personid,
        };
        this.$http.completeNursingContents(data).then((res) => {
          if (this.$globalMethod.ifTips(res.data)) this.$emit("submitSuccess");
        });
      }
    },
    //添加耗材 点击出现
    showhiddenArea(id) {
      var obj = document.getElementById(id);
      if (obj.style.display == "none") {
        obj.style.display = "block";
      }
    },
    //隐藏框内物品区域 点击改变样式
    changeColor(id) {
      this.detailsBoxId = id;
      this.value = 1;
    },
    //进步器
    onchange(value) {
      this.value = value;
    },
    //点击查询
    searchMaterials() {
      this.getMaterialInformationListByMaterialname();
    },
    //添加护工物料使用信息
    insertNursingMaterialUsageDetails() {
      if (this.detailsBoxId !== "") {
        this.materialidList = this.itemdetailsBoxS.find((item) => {
          return item.id == this.detailsBoxId;
        });
        let flag = this.useMaterials.find((item) => {
          return item.id == this.detailsBoxId;
        });
        if (!flag) {
          this.materialidList.value = this.value;

          if (this.materialidList.value <= this.materialidList.amount) {
            this.useMaterials.push(this.materialidList);
            this.materialidList.amount =
              this.materialidList.amount - this.value;

            this.value = 1;
          } else {
            Toast.fail("所选数量大于库存数");
            this.value = 1;
          }
        } else {
          let valsum = flag.value + this.value;
          if (this.value <= this.materialidList.amount) {
            flag.value = valsum;
            this.$forceUpdate();
            this.materialidList.amount =
              this.materialidList.amount - this.value;
            this.value = 1;
          } else {
            Toast.fail("所选数量大于库存数");
            this.value = 1;
          }
        }
        this.materialidList.total =
          this.materialidList.price * this.materialidList.value;
        this.sum = this.useMaterials.reduce((sum, e) => sum + e.total, 0);
      } else {
        Toast.fail("请选择物品");
      }
    },
    //查询
    getMaterialInformationListByMaterialname() {
      this.$http
        .getMaterialInformationListByMaterialname({
          materialname: this.materialname,
        })
        .then((res) => {
          this.itemdetailsBoxS = res.data;
          this.materialname = "";
        });
    },
    //删除
    delectMaterials(id) {
      let delectUsedmate = this.useMaterials.find((item) => {
        return item.id === id;
      });
      console.log(delectUsedmate);
      this.useMaterials.splice(
        this.useMaterials.findIndex((item) => item.id === id),
        1
      );
      delectUsedmate.amount = delectUsedmate.amount + delectUsedmate.value;

      this.sum = this.useMaterials.reduce((sum, e) => sum + e.total, 0);
    },
  },
};
</script>
<style>
.progress_style .van-step--vertical .van-step__circle-container {
  z-index: 0;
}
.progress_style .van-step--vertical:first-child::before {
  z-index: 0;
}
.van-field__label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  box-sizing: border-box;
  width: 36px;
  color: #646566;
  text-align: left;
  word-wrap: break-word;
  margin-right: 0px;
}
.van-step {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #646566;
  font-size: 14px;
}
</style>
<style scoped>
.progress_style {
  border-bottom: 1px solid #f5f6f7;
}
.manager_style {
  position: relative;
  top: 1px;
}
.uploader_style {
  margin-top: 15px;
}
.warning_btn {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
}
.text_style {
  color: #969799;
  overflow: hidden;
  line-height: 16px;
  margin-bottom: 6px;
  font-size: 12px;
  margin-top: 10px;
}
.hiddenArea {
  width: 120%;
  height: 265px;
  background: #e7e7e7;
  position: absolute;
  transform: translate(-13%, -10%);
  overflow-x: hidden;
  overflow-y: hidden;
}
.details {
  width: 100%;
  height: 80px;
  background: #ffffff;
  position: absolute;
  transform: translate(0%, 60%);
}
#hiddenAreafather {
  overflow: hidden;
  width: 100%;
  height: 220px;
  display: none;
}
.addConsumables {
  float: right;
  margin-bottom: 20px;
}
.addConsumablesbtn {
  background: #1989fa;
  border: 0;
  font-size: 12px;
  width: 70px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 12px;
}
.searchInput {
  width: 81%;
  height: 34px;
  padding: 0px;
  border-radius: 8px;
  margin-left: 13%;
  margin-top: 10px;
}
.addBtn {
  background: #1989fa;
  width: 50px;
  height: 30px;
  border: 0;
  margin-right: 25px;
  margin-top: 9px;
  float: right;
  border-radius: 10px;
}
.itemdetailsBox {
  color: #969799;
  width: 70px;
  height: 60px;
  float: left;
  border-radius: 8px;
  background: #ffffff;
  margin-left: 11.8px;
  margin-top: 10px;
}
.active_itemdetailsBox {
  color: #ffffff;
  width: 70px;
  height: 60px;
  float: left;
  border-radius: 8px;
  background: #1989fa;
  margin-left: 11.8px;
  margin-top: 10px;
}
.van-search__action {
  padding: 0 15px;
  font-size: 12px;
  line-height: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.underHide {
  margin-top: 40px;
}
.adddiv {
  float: right;
  margin-top: 0px;
}
.addstepper {
  margin-top: 10px;
  float: left;
  margin-right: 10px;
}
.itemBoxs {
  height: 70px;
  margin-left: -11.8px;
}
.img_style {
  font-size: 13px;
  margin-top: 26px;
}
.action-button {
  width: 20%;
  height: 35px;
}
.goods-action {
  width: 100%;
  height: 50px;
}
.img_uploader {
  margin-top: 20px;
}
</style>
