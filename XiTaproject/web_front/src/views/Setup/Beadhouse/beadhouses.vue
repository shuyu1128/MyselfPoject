<template>
  <div class="hospital-information-entry">
    <nursingHomeUpdata />
    <buildUpdata />
    <floorUpadta />
    <roomUpdata />
    <bedUpdata />
    <div class="hospital-information-left Beadhouse-step1">
      <buildTree />
    </div>
    <div class="hospital-information-right Beadhouse-step2">
      <buildList />
    </div>
  </div>
</template>

<script>
import buildTree from "./buildTree.vue";
import buildList from "./buildList.vue";
import nursingHomeUpdata from "./nursingHomeUpdata.vue";
import buildUpdata from "./buildUpdata.vue";
import floorUpadta from "./floorUpadta.vue";
import roomUpdata from "./roomUpdata.vue";
import bedUpdata from "./bedUpdata.vue";
export default {
  components: {
    buildTree,
    buildList,
    nursingHomeUpdata,
    buildUpdata,
    floorUpadta,
    roomUpdata,
    bedUpdata
  }
};
</script>

<style scoped>
.hospital-information-entry {
  height: 100%;
}
.hospital-information-left {
  padding: 10px;
  float: left;
  width: 22%;
  height: 97%;
  border-radius: 10px 0 0 10px;
  background-color: #fff;
  overflow: hidden;
  border-right: 2px solid #e4e7ed;
}
.hospital-information-right {
  padding: 10px;
  float: left;
  width: 75%;
  height: 97%;
  overflow: hidden;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>