<template>
  <!-- 长者服务查看 -->
  <div class="elderly-information">
    <van-calendar
      color="#007BFF"
      :min-date="minDate"
      :max-date="maxDate"
      v-model="dateShow"
      @confirm="onConfirm"
    />
    <van-cell
      v-for="item in peopleList"
      :key="item.id"
      :title="item.fullname"
      is-link
      :class="'cell_border' + ' ' + rclass(item.health)"
      @click="openDate(item.id)"
    >
      <template #label>
        <span>健康状况：{{ item.health }}</span>
      </template>
      <!-- <template #default>
        <van-tag v-if="item.completiondegree < 60" type="danger">
          {{ item.completiondegree }}%
        </van-tag>
        <van-tag
          v-if="item.completiondegree >= 60 && item.completiondegree < 80"
          type="warning"
        >
          {{ item.completiondegree }}%
        </van-tag>
        <van-tag
          v-if="item.completiondegree >= 80 && item.completiondegree <= 100"
          type="success"
        >
          {{ item.completiondegree }}%
        </van-tag>
      </template> -->
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前可选择最大日期
      maxDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      minDate: new Date(1577836800000),
      dateShow: false,
      peopleList: [],
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    openDate(id) {
      this.$store.commit("changeNowId", id);
      this.dateShow = true;
    },
    onConfirm(data) {
      this.$store.commit("changeNowdate", data);
      this.$router.push({
        path: "/nursing-completion",
      });
    },
    rclass(health) {
      if (health == "较差") {
        return "c_danger";
      } else if (health == "良好") {
        return "c_warning";
      } else if (health == "优秀") {
        return "c_success";
      }
    },
    onRefresh() {
      this.$http.getPersonListByFamily().then((res) => {
        this.peopleList = res.data;
      });
    },
  },
};
</script>

<style>
.elderly-information {
  height: 100%;
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
