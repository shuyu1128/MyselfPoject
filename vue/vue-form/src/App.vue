<template>
    <el-form label-width="100px">
      <el-form-item label="活动名称">
        <el-input></el-input>
      </el-form-item >
      <el-form-item label="活动区域">
        <el-select placeholder="活动区域选择">
          <el-option label="区域一"></el-option>
          <el-option label="区域二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col>
          <el-form-item>
            <el-date-picker placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col>
          el-form-item
        </el-col>
      </el-form-item>
    </el-form>
</template>

<script>
export default {};
</script>

<style>
</style>