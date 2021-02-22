<template>
  <div class="public-service">
    <!-- 服务内容展示 -->
    <van-action-sheet v-model="showContent" title="服务内容">
      <div class="content">
        <progress-completed
          :isPicture="nowForm.isPicture"
          :isText="nowForm.isText"
          :feedback="nowForm.isText == '是' ? nowForm.feedback : ''"
          :nursingcontents="nowForm.nursingContents"
          :nursingname="nowForm.account"
          :overtime="
            $globalMethod.formatTimeStamp(nowForm.overTime, 'Y-M-D h:m:s')
          "
          :imgsrc="nowForm.isPicture == '是' ? nowForm.imgsrc : ''"
          :nursingid="nowForm.nursingid"
          :id="nowForm.id"
          :type="'public'"
        ></progress-completed>
      </div>
    </van-action-sheet>
    <!-- 搜索 -->
    <van-search
      shape="round"
      v-model="selectName"
      placeholder="请输入搜索关键词"
    />
    <!-- 列表展示区域 -->
    <div class="public-service-list">
      <van-cell
        v-for="item in nursingList.filter(
          (data) =>
            !selectName ||
            data.nursingContents
              .toLowerCase()
              .includes(selectName.toLowerCase())
        )"
        :key="item.id"
        icon="eye"
        :title="item.nursingContents"
        :value="$globalMethod.formatTimeStamp(item.overTime, 'Y-M-D h:m:s')"
        is-link
        @click="openContent(item)"
      />
    </div>
  </div>
</template>

<script>
import progressCompleted from "../../components/progress-completed";
export default {
  components: {
    progressCompleted,
  },
  data() {
    return {
      nowForm: {
        nursingcontents: "",
        nursingname: "",
        overtime: "",
        imgsrc: "",
      },
      showContent: false,
      selectName: "",
      nursingList: [],
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    openContent(data) {
      this.showContent = true;
      this.nowForm = data;
    },
    onRefresh() {
      let formData = {
        personid: "",
        type: "public",
        nowDay: "",
      };
      this.$http.getNursingContentsListByPersonId(formData).then((res) => {
        this.nursingList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.public-service {
  height: calc(100% - 46px);
  background-color: #fff;
}
.public-service-list {
  border-top: 1px solid #f5f6f7;
  height: calc(100% - 55px);
  overflow-y: auto;
}
.content {
  padding: 0 16px 0 40px;
}
</style>
