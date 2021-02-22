<template>
  <div>
    <el-button class="Invitation-step1" type="primary" style="margin-bottom:10px;" @click="get">生成邀请码</el-button>
    <div class="Invitation-step2">
    <li v-for="(item,index) in invitation" :key="index" class="invitation_table">
      <span style="margin-right:50px;">{{item.code}}</span>
      <span style>{{item.createdtime}}</span>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-delete"
        style="float: right;margin-top:6px;"
        @click="delet(item.id)"
        circle
      ></el-button>
    </li>
</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      invitation: []
    };
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/basic/getAllInvitationcode")
      .then(response => {
        this.invitation = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    get() {
      this.$ajax
        .post(process.env.API_HOST + "/basic/getInvitationcode")
        .then(response => {
          this.$ajax
            .post(process.env.API_HOST + "/basic/getAllInvitationcode")
            .then(response => {
              this.invitation = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delet(val) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/basic/delInvitationcodeById",
              `id=${val}`
            )
            .then(response => {
              this.$ajax
                .post(process.env.API_HOST + "/basic/getAllInvitationcode")
                .then(response => {
                  this.invitation = response.data;
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.invitation_table {
  height: 40px;
  width: 500px;
  line-height: 40px;
  padding: 0 5px;
  border: 1px solid #dcdfe6;
  border-bottom: none;
}
.invitation_table:last-of-type {
  border-bottom: 1px solid #dcdfe6;
}
</style>
