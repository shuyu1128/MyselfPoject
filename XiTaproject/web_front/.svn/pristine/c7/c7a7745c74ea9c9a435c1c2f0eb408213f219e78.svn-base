<template>
  <div>

    <Grenmap :zdid="did"/>
    <div class="Choice">
      <h2 style="margin-top:10px;margin-left:10px;">修改绑定的围栏组</h2>
      <el-tree id="zujiegou" ref="tree" node-key="id" :default-checked-keys="def" :props="defaultProps" :data="data" show-checkbox></el-tree>
    </div>
  </div>
</template>
<script>
import Grenmap from "./Grenmap.vue";
export default {
  components: {
    Grenmap
  },
  data() {
    return {
        def:["e1855542498c40d188e91227bf1bd260"],
      data: [],
      defaultProps: {
          children: 'children',
          label: 'groupname'
        }
    };
  },
  props:{
      did:null
  },
  created() {
// 获取默认
      this.$ajax
      .post(process.env.API_HOST + "/person/getRailGroupsByPerson",`personid=${this.did}`)
      .then(respones => {
        this.def=respones.data
      });

    this.$ajax
      .post(process.env.API_HOST + "/rail/getAllRailGroupList")
      .then(respones => {
        this.data=respones.data
        console.log('有没有',respones.data);
        // this.data['disabled']=true
        this.data.forEach(element => {
            element['disabled']=true
        });
        console.log(this.data);
      });
  },
  methods:{
   
  }
};
</script>
<style scoped>

#zujiegou{
  
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0)
}
.map {
  height: 500px;
  width: 946px;
  margin-left: 20px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  float: left;
}
.Choice {
  width: 326px;
  height: 509px;
  margin-left: 15px;
  overflow-y: auto;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  /* background-color: #409EFF; */
  float: left;
}
</style>
