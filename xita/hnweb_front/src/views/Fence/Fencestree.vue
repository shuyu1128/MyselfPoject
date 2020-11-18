<template>
  <div class="auto_y">
    <el-button icon="el-icon-check" class="sure Fences_3-step3" type="primary" @click="getCheckedNodes">保存</el-button>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultch"
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 默认选中数据
      defaultch: [2],
      // 结构树数据
      data: [{}]
    };
  },
  props: {
    id: null
  },
  created() {
    // 获取所有人树结构
    this.$ajax
      .post(process.env.API_HOST + "/rail/getPersonTree")
      .then(respones => {
        this.data = respones.data;
      });
    // 获取默认选中
    this.$ajax
      .post(
        process.env.API_HOST + "/rail/getPersonIdByRailid",
        `railid=${this.id}`
      )
      .then(res => {
        this.defaultch = res.data;
        
      });
  },
  methods: {
    getCheckedNodes() {
      // 保存设置事件
      var Persons=[]
      this.$refs.tree.getCheckedNodes().forEach(element => {
        if (element.isPerson) {
          Persons.push(element.id)
        }
      });
       this.$ajax
      .post(
        process.env.API_HOST + "/rail/insertPersonRailGroup",
        `userid=${this.$store.state.token}&persons=${JSON.stringify(Persons)}&railgroupid=${this.id}`
      )
      .then(res => {
         if(res.data=='success'){
           this.$message({
          message: '修改成功',
          type: 'success'
        });
     }else{
         this.$message.error('修改失败');
     }
     
      });
      

    }
  }
};
</script>
<style scoped>
.sure {
  position: fixed;
  bottom: 100px;
  right: 70px;
  z-index: 11;
}
.auto_y{
  height: 800px;
  overflow-y: auto
}
.auto_y::-webkit-scrollbar { width: 0 !important }
</style>
