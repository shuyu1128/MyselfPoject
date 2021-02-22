<template>
  <div class="progress_style">
    <van-dialog
      @confirm="submitComplaint"
      v-model="complaintShow"
      title="输入投诉内容"
      show-cancel-button
    >
      <div>
        <van-field
          v-model="complaintValue"
          rows="2"
          autosize
          label="反馈"
          type="textarea"
          maxlength="50"
          placeholder="请输入内容"
          show-word-limit
        />
      </div>
    </van-dialog>
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
        <p data-v-793acac2="" style="color:#1989Fa">{{ nursingcontents }}</p>
        <div class="text_style">
          <span style="float:left">{{ overtime }}</span>
          <span style="float:right">
            <van-icon name="manager" style="color:red" class="manager_style" />
            {{ nursingname }}
          </span>
        </div>
        <van-row>
          <van-col v-if="isText == '是'" span="24">
            <span class="feedback_style">
              {{ feedback }}
            </span>
          </van-col>
        </van-row>
        <van-row>
          <van-col v-if="isPicture == '是'" span="20">
            <van-image
              style="margin: 12px 0 26px 0px;"
              width="180"
              height="240"
              :src="getsrc(imgsrc)"
            />
          </van-col>
          <van-col style="height:60px" span="4">
            <van-button
              round
              size="small"
              class="warning_btn"
              type="info"
              @click="show = true"
            >
              <van-icon size="16" name="weapp-nav" />
            </van-button>
          </van-col>
        </van-row>
      </div>
      <div class="van-step__circle-container">
        <i
          style="color:#1989Fa"
          class="van-icon van-icon-checked van-step__icon van-step__icon--active"
        >
        </i>
      </div>
      <div class="van-step__line"></div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      // 投诉内容
      complaintValue: "",
      complaintShow: false,
      show: false,
      actions: [{ name: "投诉" }],
    };
  },
  props: {
    isPicture: "",
    isText: "",
    feedback: "",
    nursingcontents: "",
    nursingname: "",
    overtime: "",
    imgsrc: "",
    type: "",
    nursingid: "",
    id: "",
  },
  methods: {
    getsrc(src) {
      return process.env.VUE_APP_URL + src;
    },
    submitComplaint() {
      if (this.complaintValue != "") {
        let FormData = {
          complaintcontent: this.complaintValue,
          nursingcontentsid: this.id,
          nursingid: this.nursingid,
          personid: this.type == "public" ? "" : this.$store.state.nowId,
          nursingtype: this.type,
        };
        this.$http.insertComplaint(FormData).then((res) => {
          this.$globalMethod.ifTips(res.data);
        });
      } else {
        Toast("请输入投诉建议！");
      }
    },
    onSelect(item) {
      this.complaintValue = "";
      this.show = false;
      this.complaintShow = true;
    },
  },
};
</script>
<style>
.progress_style .van-button--small {
  height: 19px;
}
.progress_style .van-step--vertical .van-step__circle-container {
  z-index: 0;
}
.progress_style .van-step--vertical:first-child::before {
  z-index: 0;
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
.warning_btn {
  position: absolute;
  bottom: 12px;
  right: 0px;
}
.text_style {
  color: #969799;
  overflow: hidden;
  line-height: 16px;
  margin-bottom: 6px;
}
.feedback_style {
  color: #323233;
}
</style>
