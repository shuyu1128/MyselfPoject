<template>
  <div>
    <div>
      {{ za }}
    </div>
    <div>
      <button @click="pull">点击按钮</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a:'123456789'
    }
  },
  props: {
    za: null,
  },
  methods: {
    pull(){
      this.$emit("add-num", this.a);
    }
  },
};
</script>

<style>
</style>