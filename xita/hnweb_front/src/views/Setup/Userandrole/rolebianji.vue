<template>
  <div>
    <div class="role-list">
      <el-tree
        show-checkbox
        node-key="path"
        :default-checked-keys="nowUpdataRole"
        ref="tree"
        :data="roleTreeData"
        :props="defaultProps"
      ></el-tree>
    </div>
    <el-button @click="suren" style="margin-left: 750px">取 消</el-button>
    <el-button type="primary" @click="surey">确 定</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 权限结构数据
      roleTreeData: [
        {
          path: "yuaneiganli",
          name: "院内管理",
          children: [
            {
              path: "/Roomstate",
              name: "房间状态",
            },
            {
              path: "/Information",
              name: "院内信息",
            },
            {
              path: "/Rollcall",
              name: "人员点名",
            },
            {
              path: "/Backtracking",
              name: "轨迹回溯",
            },
            {
              path: "/history",
              name: "历史警报",
            },
          ],
        },
        {
          path: "ciping",
          name: "长者测评",
          children: [
            {
              path: "/Evaluating",
              name: "简单评估",
            },
            {
              path: "/seniorindex",
              name: "智能健康评估",
            },
          ],
        },
        {
          path: "zhongxin",
          name: "长者中心",
          children: [
            {
              path: "/filterTable",
              name: "长者概览",
            },
            {
              path: "/fDetails",
              name: "长者档案",
            },
            {
              path: "/Fences",
              name: "电子围栏",
            },
          ],
        },
        {
          path: "NursingManagement",
          name: "护理管理",
          children: [
            {
              path: "/WorkStatistics",
              name: "工作统计",
            },
            {
              path: "/complaint",
              name: "投诉管理",
            },
            {
              path: "/NurseAccountManagement",
              name: "护工组管理",
            },
            {
              path: "/FamilyAccountManagement",
              name: "家属账号管理",
            },
          ],
        },
        {
          path: "sehzhi",
          name: "系统设置",
          children: [
            {
              path: "/Userrole",
              name: "账户及权限管理",
            },
            {
              path: "/Equipmentall",
              name: "设备信息录入",
            },
            {
              path: "/Selfchecking",
              name: "设备自检",
            },
            {
              path: "/Beadhouse",
              name: "院信息录入",
            },
            {
              path: "/Fence",
              name: "电子围栏配置",
            },
            {
              path: "/Evaluatiomaintenance",
              name: "智能健康评估配置",
            },
            {
              path: "/ClientAccessConfiguration",
              name: "客户端访问权限配置",
            },
            {
              path: "/HealthConfiguration",
              name: "系统信息配置",
            },
            {
              path: "/Organization",
              name: "组织架构录入",
            },
            {
              path: "/Notice",
              name: "院内公告发布",
            },
            {
              path: "/Invitation",
              name: "邀请码",
            },
          ],
        },
      ],
    };
  },
  props: {
    roleid: null,
  },
  computed: {
    nowUpdataRole() {
      return this.$store.state.userAndRole.nowUpdataRole;
    },
  },
  created() {},

  methods: {
    select() {},
    // 获取结构树剔除父级的数据
    getRemoveChildren(arr) {
      let rnarr = [];
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].children) {
          rnarr.push(arr[i].path);
        }
      }
      return { name: this.roleid, Conte: rnarr };
    },
    surey() {
      let json = this.getRemoveChildren(this.$refs.tree.getCheckedNodes());
      this.$store.dispatch("basic_insertRightRole", json).then((res) => {
        console.log(json);
        if (res === "success") {
          this.$emit("childByValue");
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message({
            type: "warning",
            message: "修改失败",
          });
        }
      });
    },
    suren() {
      this.$emit("childByValue");
    },
  },
};
</script>
<style scoped></style>
