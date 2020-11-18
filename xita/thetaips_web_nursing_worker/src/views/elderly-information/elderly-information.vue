<template>
  <!-- 长者服务查看  is--link有链接的cell-->
  <div class="elderly-information">
    <van-cell
      v-for="item in peopleList"
      :key="item.personid"
      :title="item.fullname"
      is-link  
      :class="'cell_border' + ' ' + rclass(item.workProgress)"
      @click="toChoice(item)"
    >
      <template #label>
        <span>健康状况：{{ item.health }}</span>
      </template>
      <template #default>
        <van-tag v-if="item.workProgress < 60" type="danger">
          {{ item.workProgress }}%
        </van-tag>
        <van-tag
          v-if="item.workProgress >= 60 && item.workProgress < 80"
          type="warning"
        >
          {{ item.workProgress }}%
        </van-tag>
        <van-tag
          v-if="item.workProgress >= 80 && item.workProgress <= 100"
          type="success"
        >
          {{ item.workProgress }}%
        </van-tag>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      peopleList: [],
    };
  },
  computed: {
    nowPeopleId() {
      return this.$store.state.nowPeopleId;
    },
  },
  created() {
    this.onRefresh();
  },
  methods: {
    toChoice(data) {
      this.$store.commit("changePeople", data);
      this.$router.push({
        path: "/nursing-completion",
      });
    },
    rclass(completiondegree) {
      if (completiondegree < 60) {
        return "c_danger";
      } else if (completiondegree >= 60 && completiondegree < 80) {
        return "c_warning";
      } else if (completiondegree >= 80 && completiondegree <= 100) {
        return "c_success";
      }
    },
    // 此处不懂
    onRefresh() {
      this.$http.getPersonListByTeamid().then((res) => {
        this.peopleList = res.data;
      });
    },
  },
};
</script>

<style>
.elderly-information {
  height: 100%;
  overflow-y: auto;
}
.elderly-information .cell_border {
  scroll-margin-bottom: 5px;
}
.c_danger {
  border-left: 8px solid #f56c6c;
}
.c_warning {
  border-left: 8px solid #e6a23c;
}
.c_success {
  border-left: 8px solid #67c23a;
}
</style>
