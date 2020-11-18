<template>
  <div>
    <div style="position: relative;">
      <h3 style="margin-bottom:15px;">角色分配</h3>
      <el-button
        style="position: absolute;top: -5px;right: 10px;"
        type="success"
        icon="el-icon-check"
        @click="rolechange"
        circle
      ></el-button>
      <el-radio-group
        v-model="role"
        style="margin-left: 0px;margin-right: 30px;margin-bottom: 30px"
      >
        <el-radio v-for="(item,index) in roleList" :key="index" :label="item.id">{{item.rolename}}</el-radio>
      </el-radio-group>
    </div>
    <div style="position: relative;">
      <h3 style="margin-bottom:15px;">责任区域分配</h3>
      <el-button
        style="position: absolute;top: -5px;right: 10px;"
        type="success"
        icon="el-icon-check"
        @click="inpatient()"
        circle
      ></el-button>
      <el-checkbox-group v-model="Inpatient">
        <el-checkbox
          style="margin-left: 0px;margin-right: 30px;margin-bottom: 30px"
          v-for="(item,index) in allRegionData"
          :key="index"
          :label="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="position: relative;">
      <h3 style="margin-bottom:15px;">公告发布部门分配</h3>
      <el-button
        style="position: absolute;top: -5px;right: 10px;"
        type="success"
        @click="getCheckedNodes()"
        icon="el-icon-check"
        circle
      ></el-button>

      <el-tree
        :data="DeptTree"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-expanded-keys="defaultNoticeSelect"
        :default-checked-keys="defaultNoticeSelect"
      ></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Inpatient: [],
      role: "",
      roleList: [],
      DeptTree: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  props: {
    userid: null,
  },
  computed: {
    // 默认选中公告区域
    defaultNoticeSelect() {
      return this.$store.state.userAndRole.defaultNoticeSelect;
    },
    // 全部责任区域
    allRegionData() {
      return this.$store.state.userAndRole.allRegionData;
    },
  },
  watch: {},
  created() {
    // 通过用户查看默认选中的发布公告部门权限列表
    this.$store.dispatch("dept_getDeptIdListByUser", this.userid);
    // 获取全部角色信息
    this.$ajax
      .post(
        process.env.API_HOST + "/basic/getAllRole",
        `userName=${sessionStorage.getItem("user")}`
      )
      .then((response) => {
        this.roleList = response.data;
      });

    //  通过用户id查询角色id
    this.$ajax
      .post(
        process.env.API_HOST + "/basic/getRoleIdByUser",
        `userid=${this.userid}`
      )
      .then((response) => {
        this.role = response.data.roleid;
      });
    // 获取全部部门信息
    this.$ajax
      .post(process.env.API_HOST + "/dept/getDeptTree")
      .then((response) => {
        this.DeptTree = response.data;
      });
    // 通过用户id 查询责任区域id数组
    this.$ajax
      .post(
        process.env.API_HOST + "/inpatient/getInpatientIdByUser",
        `userid=${this.userid}`
      )
      .then((response) => {
        console.log(response.data);
        this.Inpatient = response.data;
      });
    // 查询全部责任区域信息
    this.$store.commit("changeSelectformNname", "");
    this.$store.dispatch("inpatient_getAllInpatientList");
  },
  methods: {
    rolechange() {
      this.$ajax
        .post(
          process.env.API_HOST + "/basic/updateRoleByUser",
          `roleid=${this.role}&userid=${this.userid}&updateUserid=${this.$store.state.token}`
        )
        .then((response) => {
          if ((response.data = "success")) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message.error("保存失败");
          }
        });
    },
    inpatient() {
      this.$ajax
        .post(
          process.env.API_HOST + "/basic/insertUserInpatient",
          `userid=${this.userid}&inpatientArr=${JSON.stringify(this.Inpatient)}`
        )
        .then((response) => {
          if ((response.data = "success")) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message.error("保存失败");
          }
        });
    },
    getCheckedNodes() {
      var ids = [];
      for (var i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
        if (this.$refs.tree.getCheckedNodes()[i].children.length == 0) {
          ids.push(this.$refs.tree.getCheckedNodes()[i].id);
        }
      }
      this.$ajax
        .post(
          process.env.API_HOST + "/dept/insertDeptRight",
          `json=${JSON.stringify(ids)}&userid=${this.userid}`
        )
        .then((response) => {
          if ((response.data = "success")) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message.error("保存失败");
          }
        });
    },
  },
};
</script>
<style scoped>
</style>
