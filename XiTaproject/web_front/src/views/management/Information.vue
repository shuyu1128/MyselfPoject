<template>
  <div class="information">
    <el-dialog title="内容" :visible.sync="dialogVisible" width="70%">
      <div v-html="nowContent"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-row style="height:100%" :gutter="20">
      <el-col style="height:100%" :span="12" class="v-step1">
        <el-table @row-dblclick="openRed" class="table" :data="gonggaozu" height="100%">
          <el-table-column align="center" label="院内公告">
            <el-table-column align="center" prop="title" label="标题"></el-table-column>
            <el-table-column align="center" prop="createdby" label="发布人"></el-table-column>
            <el-table-column align="center" width="400px">
              <template slot="header" slot-scope="scope">
                <el-date-picker
                  size="mini"
                  v-model="timer1"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  @change="changeTimer1"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </template>
              <template slot-scope="scope">
                <span>{{scope.row.createdtime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header" slot-scope="scope">
                <el-checkbox-group @change="changeCheck1" v-model="checkList1">
                  <el-checkbox label="t">已读</el-checkbox>
                  <el-checkbox label="f">未读</el-checkbox>
                </el-checkbox-group>
              </template>
              <template slot-scope="scope">
                <i v-if="scope.row.read==='t'" class="fa fa-envelope-open-o"></i>
                <i v-else style="font-size:17px;color:#F56C6C;" class="el-icon-message"></i>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col style="height:100%" :span="12" class="v-step2">
        <el-table @row-dblclick="openRed" class="table" :data="newszu" height="100%">
          <el-table-column align="center" label="院内新闻">
            <el-table-column align="center" prop="title" label="标题"></el-table-column>
            <el-table-column align="center" prop="createdby" label="发布人"></el-table-column>
            <el-table-column align="center" width="400px">
              <template slot="header" slot-scope="scope">
                <el-date-picker
                  size="mini"
                  v-model="timer2"
                  value-format="yyyy-MM-dd"
                  @change="changeTimer2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </template>
              <template slot-scope="scope">
                <span>{{scope.row.createdtime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header" slot-scope="scope">
               <el-checkbox-group @change="changeCheck2" v-model="checkList2">
                  <el-checkbox label="t">已读</el-checkbox>
                  <el-checkbox label="f">未读</el-checkbox>
                </el-checkbox-group>
              </template>
              <template slot-scope="scope">
                <i v-if="scope.row.read==='t'" class="fa fa-envelope-open-o"></i>
                <i v-else style="font-size:17px;color:#F56C6C;" class="el-icon-message"></i>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 读取状态
      checkList1: ['f','t'],
      checkList2: ['f','t'],
      options: [
        {
          value: "t",
          label: "已读",
        },
        {
          value: "f",
          label: "未读",
        },
        {
          value: "",
          label: "全部",
        },
      ],
      ifRead1: null,
      ifRead2: null,
      timer1: null,
      timer1value: ["", ""],
      timer2: null,
      timer2value: ["", ""],
      // 阅读弹窗
      dialogVisible: false,
      // 当前阅读内容
      nowContent: "",
      weidu: "f",
      // 院内新闻
      newszu: [],
      // 院内公告
      gonggaozu: [],
      ifread1: "",
      ifread2: "",
    };
  },
  created() {
    this.$functionarrs
      .news_getNewsByUser(this.$store.state.token, "", "", "", "notice")
      .then((data) => {
        this.gonggaozu = data;
      });
    this.$functionarrs
      .news_getNewsByUser(this.$store.state.token, "", "", "", "news")
      .then((data) => {
        this.newszu = data;
      });
  },
  methods: {
    // 院内公告读取状态查询
    changeCheck1(data) {
      if (data.length === 1) {
        this.ifread1 = data[0];
      } else if (data.length === 0) {
        this.ifread1 = "x";
      } else {
        this.ifread1 = "";
      }
      this.$functionarrs
        .news_getNewsByUser(
          this.$store.state.token,
          this.ifread1,
          this.timer1value[0],
          this.timer1value[1],
          "notice"
        )
        .then((data) => {
          this.gonggaozu = data;
        });
    },
    changeCheck2(data) {
      if (data.length === 1) {
        this.ifread2 = data[0];
      } else if (data.length === 0) {
        this.ifread2 = "x";
      } else {
        this.ifread2 = "";
      }
      this.$functionarrs
        .news_getNewsByUser(
          this.$store.state.token,
          this.ifread2,
          this.timer2value[0],
          this.timer2value[1],
          "news"
        )
        .then((data) => {
          this.newszu = data;
        });
    },
    // 院内公告时间查询
    changeTimer1(data) {
      this.timer1value = data;
      if (!data) {
        this.timer1value = ["", ""];
      }
      this.$functionarrs
        .news_getNewsByUser(
          this.$store.state.token,
          this.ifread1,
          this.timer1value[0],
          this.timer1value[1],
          "notice"
        )
        .then((data) => {
          this.gonggaozu = data;
        });
    },
    // 院内新闻时间查询
    changeTimer2(data) {
      this.timer2value = data;
      if (!data) {
        this.timer2value = ["", ""];
      }
      this.$functionarrs
        .news_getNewsByUser(
          this.$store.state.token,
          this.ifread2,
          this.timer2value[0],
          this.timer2value[1],
          "news"
        )
        .then((data) => {
          this.newszu = data;
        });
    },
    openRed(row) {
      // 打开时更改阅读状态
      if (row.read === "f") {
        this.$functionarrs.news_updateNewsByReadtype(row.id).then((data) => {
          row.read = "t";
        });
      }
      // 打开阅读弹窗
      this.nowContent = row.content;
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
.information {
  height: 100%;
}
.table {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>

