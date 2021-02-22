// 父向子传
// 子向父传



<template>
  <div>
    <a-child :za="a" @add-num="add"></a-child>
  </div>
</template>

<script>
import aChild from "./Child";

export default {
  components: {
    aChild,
  },
  data() {
    return {
      a: '123456',
    };
  },
  methods: {
    add(num){
      console.log(num);
    }
  },
};
</script>

<style>
</style>