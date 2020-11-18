<template>
  <el-row class="bgcolor" :gutter="20">
    <el-col :span="16">
      <div class="title">
        <h3>希塔智慧养老平台</h3>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="time">
        <h3>{{ dateTime }}</h3>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      dateTime: "",
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      var d = new Date();
      var d2 =
        d.getFullYear() +
        "年" +
        (d.getMonth() + 1) +
        "月" +
        d.getDate() +
        "日" +
        " " +
        "" +
        d.getHours() +
        "时" +
        d.getMinutes() +
        "分" +
        d.getSeconds() +
        "秒";
      this.dateTime = d2;
    }, 1000);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
/* .bgcolor {
  background-color: #204d90;
} */
.title {
  text-align: left;
}
.time {
  text-align: right;
}
</style>