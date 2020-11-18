<template>
    <el-tabs tab-position="left" style="height: 100%;">
    <el-tab-pane label="角色管理"><Role /></el-tab-pane>
    <el-tab-pane label="责任区域管理"><areaOfResponsibility /></el-tab-pane>
    <el-tab-pane label="用户管理"><User /></el-tab-pane>
  
  </el-tabs>
</template>
<script>
import User from './User.vue'
import Role from './role.vue'
import areaOfResponsibility from './areaOfResponsibility.vue'
export default {
    components:{
        User,Role,areaOfResponsibility
    }
}
</script>
<style scoped>

</style>

