<template>
  <!-- 审核护工列表 -->
  <div class="worker_list">
    <el-dialog
      :before-close="closeDialog"
      title="护工护理内容审批"
      :visible.sync="dialogShow"
    >
      <div v-if="dialogShow">
        <div class="collaps_headaer">
          <el-select
            v-model="collapValue"
            style="float: right"
            placeholder="请选择"
          >
            <el-option
              v-for="item in collaps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- {{ NursingContentsDatas[nowPage - 1][collapValue] }} -->
        </div>
        <div class="collapse_h">
          <el-collapse accordion v-model="nowItem">
            <el-collapse-item
              v-for="item in NursingContentsDatas[nowPage - 1][collapValue]"
              :key="item.id"
              :name="item.id"
            >
              <template slot="title">
                <div class="nursing_list">
                  <i
                    v-if="compareTime(item.overTime, item.endTime)"
                    class="el-icon-check"
                    style="color: #67c23a"
                  ></i>
                  <i
                    v-if="!compareTime(item.overTime, item.endTime)"
                    class="fa fa-history"
                    style="color: #e6a23c"
                  ></i>
                  <span style="margin-right: 10px">
                    护理内容：<span class="content_s">
                      {{ item.nursingContents }}
                    </span>
                  </span>
                  <span style="margin-right: 10px">
                    备注：<span class="content_s">{{ item.nursingDesc }}</span>
                  </span>
                  <el-tag
                    v-if="item.state == 1"
                    class="state_tag"
                    type="success"
                  >
                    已通过
                  </el-tag>
                  <el-tag
                    v-if="item.state == 2"
                    class="state_tag"
                    type="warning"
                  >
                    未通过
                  </el-tag>
                  <el-tag
                    v-if="item.state == 0"
                    class="state_tag"
                    type="danger"
                  >
                    未审批
                  </el-tag>
                </div>
              </template>
              <div>
                <div
                  v-if="item.isPicture == '是'"
                  style="height: 100px; float: left"
                >
                  <el-image
                    v-for="(items, index) in item.imgsrcarr"
                    :key="index"
                    style="width: 100px; height: 100px; margin-right: 10px"
                    :src="items"
                    :preview-src-list="[items]"
                  ></el-image>
                </div>

                <div
                  v-if="item.isText == '是' && item.isPicture == '是'"
                  style="float: left; width: calc(100% - 330px)"
                >
                  <div class="note_textboth">
                    {{ item.feedback }}
                  </div>
                </div>
                <div
                  v-if="item.isText == '是' && item.isPicture !== '是'"
                  style="float: left; width: 100%"
                >
                  <div class="note_text">
                    {{ item.feedback }}
                  </div>
                </div>
                <div v-if="item.state == 0" class="nursing_list_footer">
                  <el-button
                    type="success"
                    size="small"
                    icon="el-icon-check"
                    circle
                    style="float: right; margin-left: 14px"
                    @click="approvalNursingContents(item.id, '1', collapValue)"
                  ></el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-close"
                    circle
                    style="float: right"
                    @click="approvalNursingContents(item.id, '2', collapValue)"
                  ></el-button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="collapse_footer">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="nowPage"
            hide-on-single-page
            background
            layout="prev, pager, next"
            :page-size="1"
            :total="this.NursingContentsDatas.length"
          >
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog"> 关 闭 </el-button>
      </div>
    </el-dialog>
    <el-table border :data="nursingWorkList" style="width: 100%">
      <el-table-column align="center" label="护工审核表">
        <el-table-column align="center" label="账号" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总完成度">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ scope.row.workProgress }} %
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="应做工时">
          <template slot-scope="scope">
            <span style="margin-left: 10px"> {{ scope.row.doing }} 分钟 </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已做工时">
          <template slot-scope="scope">
            <span style="margin-left: 10px"> {{ scope.row.done }} 分钟 </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批工时">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ scope.row.approved }} 分钟
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="不合格工时">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ scope.row.approvalFailed }} 分钟
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row.userid)">
              审查
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowItem: "",
      nowId: "",
      collapValue: "person",
      collaps: [
        {
          label: "常规服务",
          value: "person",
        },
        {
          label: "周期服务",
          value: "cycle",
        },
        {
          label: "组内服务",
          value: "team",
        },
        {
          label: "公共服务",
          value: "public",
        },
      ],
      nowPage: 1,
      dialogShow: false,
      // 护理内容列表
      NursingContentsDatas: [],
      tableData: [],
    };
  },
  computed: {
    // 护工统计列表
    nursingWorkList() {
      return this.$store.state.workStatistics.nursingWorkList;
    },
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      // 审批完成后 刷新护工统计列表
      this.$store.dispatch("workStatistics_nursingWorkStatisticsByTeamid");
      this.dialogShow = false;
    },
    // 打开审查弹窗
    handleEdit(id) {
      this.nowId = id;
      let url =
        process.env.API_HOST + "/workStatistics/nursingContentsBynursingUserid";
      let formData = `nursingUserId=${id}&type=${this.$store.state.workStatistics.type}&beginDate=${this.$store.state.workStatistics.beginDate}`;
      this.$ajax.post(url, formData).then((res) => {
        this.NursingContentsDatas = res.data;
        this.nowItem = "";
        this.dialogShow = true;
        for (
          let a = 0;
          a <
          this.NursingContentsDatas[this.nowPage - 1][this.collapValue].length;
          a++
        ) {
          if (
            typeof this.NursingContentsDatas[this.nowPage - 1][
              this.collapValue
            ][a].imgsrc !== "undefined"
          ) {
            let obj = this.NursingContentsDatas[this.nowPage - 1][
              this.collapValue
            ][a].imgsrc.split(",");
            this.NursingContentsDatas[this.nowPage - 1][this.collapValue][
              a
            ].imgsrcarr = Object.values(obj);
            console.log(
              this.NursingContentsDatas[this.nowPage - 1][this.collapValue][a]
                .imgsrcarr
            );
          }
        }
      });
      // (async function getAddRouters() {
      //   let personData = await that.$ajax.post(url, formData("person"));
      //   let cycleData = await that.$ajax.post(url, formData("cycle"));
      //   let teamData = await that.$ajax.post(url, formData("teamData"));
      //   let publicData = await that.$ajax.post(url, formData("publicData"));
      // })();
    },
    // 审批护理内容
    approvalNursingContents(id, state, type) {
      let url =
        process.env.API_HOST + "/nursingContents/approvalNursingContents";
      let formData = `userid=${this.$store.state.token}&nursingid=${id}&state=${state}&type=${type}`;
      this.$confirm("即将审批, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax.post(url, formData).then((res) => {
            if (res.data.state == "success") {
              this.$message.success("审批成功");
              this.handleEdit(this.nowId);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(data) {
      this.nowPage = data;
      console.log(this.nowPage);
    },
    handleDelete() {},
    // 时间戳与时间点比较
    compareTime(timeStamp, timePoint) {
      let newDate = new Date(timeStamp);
      let timeArr = timePoint.split(":");
      let pointHour = Number(timeArr[0]);
      let pointMinut = Number(timeArr[1]);
      let hour = newDate.getHours();
      let Minut = newDate.getMinutes();
      if (pointHour == hour && pointMinut == Minut) {
        return true;
      } else if (pointHour == hour) {
        if (pointMinut > Minut) {
          return true;
        } else if (pointMinut < Minut) {
          return false;
        }
      } else if (pointHour > hour) {
        return true;
      } else if (pointHour < hour) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.collaps_headaer {
  overflow: hidden;
  margin-bottom: 16px;
}
.collapse_h {
  height: 580px;
  overflow-y: auto;
}
.nursing_list {
  position: relative;
  width: 100%;
}
.state_tag {
  position: absolute;
  right: 6px;
  top: 50%;
  margin-top: -16px;
}
.note_textboth {
  margin-left: 20px;
  color: #909399;
  display: inline-block;
  padding: 10px 10px 0 10px;
  height: 90px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  width: calc(100% - 150px);
}
.note_text {
  margin-left: 20px;
  color: #909399;
  display: inline-block;
  padding: 10px 10px 0 10px;
  height: 90px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  width: calc(100% - 100px);
}
.content_s {
  color: #606266;
}
.nursing_list_footer {
  padding: 16px 16px 0 0;
  overflow: hidden;
}
</style>
