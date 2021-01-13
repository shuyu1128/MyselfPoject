<template>
  <!-- 审核护工列表 -->
  <div class="people_list">
    <el-dialog
      :before-close="closeDialog"
      title="长者护理内容审批"
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
          <!-- 111{{ NursingContentsDatas[nowPage - 1] }} -->
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
                    v-if="
                      item.nursingid && compareTime(item.overTime, item.endTime)
                    "
                    class="el-icon-check"
                    style="color: #67c23a"
                  ></i>
                  <i
                    v-if="!item.nursingid"
                    class="el-icon-circle-close"
                    style="color: #f56c6c"
                  ></i>
                  <i
                    v-if="
                      item.nursingid &&
                      !compareTime(item.overTime, item.endTime)
                    "
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
                <el-image
                  v-if="item.isPicture == '是'"
                  style="width: 100px; height: 100px"
                  :src="item.imgsrc"
                  :preview-src-list="[item.imgsrc]"
                >
                </el-image>

                <div v-if="item.isText == '是'" class="note_text">
                  {{ item.feedback }}
                </div>
                <div
                  v-if="item.state == 0 && item.nursingid"
                  class="nursing_list_footer"
                >
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
    <el-table border :data="personList" style="width: 100%">
      <el-table-column align="center" label="长者审核表">
        <el-table-column align="center" label="姓名" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.fullname }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="workProgress" label="总完成度">
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
            <el-button size="small" @click="handleEdit(scope.row.personid)">
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
      ],
      nowPage: 1,
      dialogShow: false,
      // 护理内容列表
      NursingContentsDatas: [],
      tableData: [],
    };
  },
  computed: {
    // 长者统计列表
    personList() {
      return this.$store.state.workStatistics.personList;
    },
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      //审批完成后 获取长者统计列表
      this.$store.dispatch("workStatistics_personWorkStatisticsByTeamid");
      this.dialogShow = false;
    },
    // 打开审查弹窗
    handleEdit(id) {
      this.nowId = id;
      let url =
        process.env.API_HOST + "/workStatistics/nursingContentsBypersinid";
      let formData = `personId=${id}&type=${this.$store.state.workStatistics.type}&beginDate=${this.$store.state.workStatistics.beginDate}`;
      this.$ajax.post(url, formData).then((res) => {
        this.NursingContentsDatas = res.data;
        this.nowItem = "";
        this.dialogShow = true;
        console.log(this.NursingContentsDatas);
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
.note_text {
  margin-left: 20px;
  color: #909399;
  display: inline-block;
  padding: 10px 10px 0 10px;
  height: 90px;
  overflow-y: auto;
  width: calc(100% - 160px);
  border: 1px solid #ebeef5;
}
.content_s {
  color: #606266;
}
.nursing_list_footer {
  padding: 16px 16px 0 0;
  overflow: hidden;
}
</style>
