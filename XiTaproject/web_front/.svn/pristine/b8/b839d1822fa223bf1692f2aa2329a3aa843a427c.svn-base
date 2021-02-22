<template>
  <div class="group_choice">
    <h3 style="float: left" class="title_color">组管理</h3>
    <!-- <a style="float: right">删除</a> -->
    <el-checkbox
      style="float: right;margin-right: 16px"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <div style="margin-bottom: 28px"></div>
    <div class="checkbox_Y">
      <el-checkbox-group v-model="group" @change="handlegroupChange">
        <el-popover
          v-for="item in allGroup"
          :key="item.id"
          placement="right"
          trigger="hover"
        >
          <li
            @click="update(item)"
            tabindex="-1"
            class="el-dropdown-menu__item"
          >
            <i class="fa fa-edit"></i>修改
          </li>
          <li @click="del(item)" tabindex="-1" class="el-dropdown-menu__item">
            <i class="fa fa-trash"></i>删除
          </li>
          <el-checkbox slot="reference" :label="item.id">
            {{ item.teamname }}
          </el-checkbox>
        </el-popover>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll: false,
      group: [],
      isIndeterminate: false
    };
  },
  computed: {
    // 全部组别
    allGroup() {
      return this.$store.state.NursingManagement.allGroup;
    }
  },
  created() {
    // 页面初始化获取全部组别
    this.$store.dispatch("basNursingTeam_getNursingTeamList");
  },
  methods: {
    update(item) {
      this.$prompt("请输入组别名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{2,16}$/,
        inputErrorMessage: "请输入2~16个字符！",
        closeOnClickModal: false,
        inputValue: item.teamname
      }).then(({ value }) => {
        this.$store.dispatch("basNursingTeam_updateNursingTeam", {
          json: { teamname: value, id: item.id },
          userid: this.$store.state.token
        });
      });
    },
    del(item) {
      this.$confirm(
        `此操作将永久删除“${item.teamname}”组别, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$store.dispatch("basNursingTeam_deleteNursingTeam", {
          id: item.id,
          userid: this.$store.state.token
        });
      });
    },
    handleCheckAllChange(val) {
      let arr = this.allGroup.map(function(item) {
        return item.id;
      });
      this.group = val ? arr : [];
      // 更新store中的选中状态
      this.$store.commit("changeNowGroup", this.group);
      this.$store.dispatch("sysNursingUser_getNursingUserList");
      this.$store.dispatch("prnPerson_getPersonTeamList");

      this.isIndeterminate = false;
    },
    handlegroupChange(value) {
      // 更新store中的选中状态
      this.$store.commit("changeNowGroup", value);
      this.$store.dispatch("sysNursingUser_getNursingUserList");
      this.$store.dispatch("prnPerson_getPersonTeamList");

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allGroup.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allGroup.length;
    }
  }
};
</script>

<style scoped>
.checkbox_Y {
  height: calc(100% - 28px);
  padding: 0 14px;
  overflow-y: auto;
  border: 1px solid #d7dae2;
  border-radius: 0;
}
.el-checkbox-group > span {
  width: 106px;
  display: inline-block;
  margin-bottom: 8px;
}
</style>
