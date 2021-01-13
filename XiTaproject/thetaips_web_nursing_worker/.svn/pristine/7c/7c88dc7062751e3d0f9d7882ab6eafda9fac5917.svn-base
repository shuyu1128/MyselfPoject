<template>
  <!-- 公共服务查看 -->
  <div class="public-service">
    <!-- 服务内容展示 -->
    <van-action-sheet v-model="showContent" title="服务内容">
      <div class="content">
        <progress-completed
          v-if="showContent"
          :nursingcontents="nowForm.nursingcontents"
          :nursingdesc="nowForm.nursingdesc"
          :lastTime="nowForm.lastTime"
          :ispicture="nowForm.ispicture"
          :istext="nowForm.istext"
          :id="nowForm.id"
          :type="'public'"
          @submitSuccess="submitSuccess"
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
            data.nursingcontents
              .toLowerCase()
              .includes(selectName.toLowerCase())
        )"
        :key="item.id"
        icon="underway-o"
        :title="item.nursingcontents"
        arrow-direction="down"
        is-link
        @click="openContent(item)"
      >
        <template #icon>
          <div class="complete_state">
            <van-icon
              v-if="item.lastTime == ''"
              class="complete_state_i"
              size="26"
              name="circle"
            />
            <van-icon
              class="complete_state_i"
              size="26"
              v-else
              color="#07c160"
              name="underway-o"
            />
          </div>
        </template>
        <template #label>
          <span class="custom-title" style="margin-right:16px">
            上次更新时间：{{ item.lastTime == "" ? "无" : item.lastTime }}
          </span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import progressCompleted from "../../components/progress-completed";
import { Toast } from "vant";
export default {
  components: {
    progressCompleted,
  },
  data() {
    return {
      nowForm: {},
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
    // 提交完成关闭对话框重新获取服务内容
    submitSuccess() {
      this.onRefresh();
      this.showContent = false;
    },
    onRefresh() {
      this.$http
        .getNursingContentsListByPersonId({
          type: "public",
        })
        .then((res) => {
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
.complete_state {
  position: relative;
  width: 30px;
}
.complete_state_i {
  position: absolute;
  top: 50%;
  margin-top: -13px;
}
</style>
