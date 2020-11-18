<template>
  <div>
    <template v-for="(child,index) in menuData">
      <!-- <el-submenu v-if="child.children.length > 0" :index="child.path">
        <template slot="title">
          <i :class="child.iconCls"></i>
          <span slot="title">{{ child.name }}</span>
        </template>
        <menu-tree :menuData="child.children"></menu-tree>
      </el-submenu> -->

      <el-menu-item :index="child.path">
        <i :class="child.iconCls"></i>
        <span slot="title">{{child.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuTree",
  props: ["menuData"],
  created() {
    // this.menuData.forEach((element, index) => {
    //   if (element.name == "编辑") {
    //     this.menuData.splice(index, 2);
    //   }
    // });
  }
};
</script>

<style scoped>
</style>
