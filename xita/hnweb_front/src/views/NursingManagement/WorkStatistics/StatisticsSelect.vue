<template>
  <div class="statistics_select">
    <el-form :inline="true" :model="formInline" class="select-form">
      <el-form-item label="组别名称">
        <el-input v-model="teamName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="查询周期">
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in cycleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="查询时间">
        <el-date-picker
          v-if="type == 'day'"
          v-model="beginDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <el-date-picker
          :picker-options="{ firstDayOfWeek: 1 }"
          v-if="type == 'week'"
          v-model="beginDate"
          type="week"
          value-format="yyyy-MM-dd"
          format="yyyy 第 WW 周"
          placeholder="选择周"
        >
        </el-date-picker>
        <el-date-picker
          v-if="type == 'month'"
          v-model="beginDate"
          value-format="yyyy-MM-dd"
          type="month"
          placeholder="选择月"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="PersonNursingContentsFileSrc"
          :on-success="handleSuccess"
          :show-file-list="false"
          :data="{ userid: $store.state.token }"
          multiple
        >
          <el-button type="primary">上传个人护理内容</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="CycleNursingContentsFileSrc"
          :on-success="handleSuccess"
          :show-file-list="false"
          :data="{ userid: $store.state.token }"
          multiple
        >
          <el-button type="primary">上传周期护理内容</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="TeamNursingContentsFileSrc"
          :on-success="handleSuccess"
          :show-file-list="false"
          :data="{ userid: $store.state.token }"
          multiple
        >
          <el-button type="primary">上传组别服务内容</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="PublicNursingContentsFileSrc"
          :on-success="handleSuccess"
          :show-file-list="false"
          :data="{ userid: $store.state.token }"
          multiple
        >
          <el-button type="primary">上传公共服务</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 个人护理内容上传接口
      PersonNursingContentsFileSrc:
        process.env.API_HOST +
        "/nursingContents/uploadPersonNursingContentsFile",
      // 周期护理内容上传接口
      CycleNursingContentsFileSrc:
        process.env.API_HOST +
        "/nursingContents/uploadCycleNursingContentsFile",
      // 组别护理内容上传接口
      TeamNursingContentsFileSrc:
        process.env.API_HOST + "/nursingContents/uploadTeamNursingContentsFile",
      // 公共护理内容上传接口
      PublicNursingContentsFileSrc:
        process.env.API_HOST +
        "/nursingContents/uploadPublicNursingContentsFile",
      formInline: {
        teamname: "",
        cycle: "day",
        begintime: "",
        endtime: ""
      },
      cycleOptions: [
        {
          value: "day",
          label: "日"
        },
        {
          value: "week",
          label: "周"
        },
        {
          value: "month",
          label: "月"
        }
      ]
    };
  },
  computed: {
    teamName: {
      get() {
        return this.$store.state.workStatistics.teamName;
      },
      set(value) {
        this.$store.commit("ChangeTeamName", value);
      }
    },
    type: {
      get() {
        return this.$store.state.workStatistics.type;
      },
      set(value) {
        this.$store.commit("ChangeType", value);
      }
    },
    beginDate: {
      get() {
        return this.$store.state.workStatistics.beginDate;
      },
      set(value) {
        this.$store.commit("ChangeBeginDate", value);
      }
    }
  },
  created() {
    // 页面初始化查询
    this.$store.dispatch("workStatistics_teamWorkStatistics");
  },
  methods: {
    handleSuccess(response, file) {
      if (response.state == "success") {
        this.$message.success("添加成功");
      } else {
        this.$notify.error({
          title: "导入失败",
          message: response.msg,
          duration: 0
        });
      }
    },
    onSubmit() {
      this.$store.dispatch("workStatistics_teamWorkStatistics");
    }
  }
};
</script>

<style scoped>
.statistics_select {
  position: relative;
}
.select-form {
  position: absolute;
  height: 40px;
  top: 50%;
  margin-top: -20px;
}
.b_style {
  font-size: 16px;
  margin-left: 6px;
}
</style>
