<template>
  <div id="specia">
    <div class="page">
      <li v-for="i in jia" @click="cpage">{{i}}</li>
    </div>
    <li class="first-li">
      <em
        style="display:block;position: relative;left:0rem;top:1.4375rem; width: 0.125rem; height: 1.25rem; background-color: #a2a800;"
      ></em>
      <em>危机人员</em>
     
      <div class="x" @click="pu"> <i class="el-icon-close"></i></div>
    </li>
    <div style="width:24.375rem;height:31.9375rem;overflow: hidden; position: relative;">
      <div class="roll" :style="{position:'absolute',top:top+'px',transition:'0.5s'}">
        <li v-for="item in people" class="telist">
          <!-- <div class="x"><i class="el-icon-close"></i></div> -->
          <!-- <div class="j"></div> -->
          <el-button type="danger" class="j" size="small">解除</el-button>
          <div class="cetiao" style="background-color:blue;"></div>
          <div class="xinxi" style="font-size:1.125rem;color:#303133">
            注意：{{item.state}}
            <em
              style=" border-radius: 0.1875rem;border: 0.0625rem solid #737d8a;padding:0.25rem 1.0625rem; margin-left:0.375rem;"
            >{{item.healthstatename}}</em>
          </div>
          <div class="xinxi">
            姓名：{{item.name}}
            <em style="margin-left:2.125rem;">{{item.num}}</em>
          </div>
          <div class="xinxi">位置：{{item.roomname}}</div>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { constants } from "crypto";
export default {
  data() {
    return {
      pei: {
        people: [
       
        ]
      },
      top: 0,
      i: 1
    };
  },
  props:{
    people:null
  },
  methods: {
    pu() {
      // this.$router.push("/index");
      var meng=document.querySelector(".meng")
        meng.style.display="none"
        this.$emit('close')
    },
    cpage(ev) {
      for (var i = 0; i < this.jia.length; i++) {
        document.querySelectorAll(".page li")[i].style.backgroundColor =
          "rgb(0, 0, 0)";
        if (ev.target.innerHTML == i) {
          this.top = -i * 524;
        }
      }
      ev.target.style.backgroundColor = "#fff";
    }
  },
  computed: {
   
    jia() {
      var cpage = [];
      for (var i = 0; i < Math.ceil(this.people.length / 4); i++) {
        cpage.push(i);
      }
      return cpage;
    }
  },
  mounted() {
     setInterval(() => {
      this.top -= 131;
      if (this.top < this.people.length * -131) {
        this.top = 0;
      }
    }, 5000);
  }
};
</script>

<style scoped>
#specia {
  width: 24.375rem;
  height: 40.875rem;
  padding-left: 1.1875rem;
  padding-right: 1.1875rem;
  /* background-color: #fff; */
  /* position: absolute; */
}
#specia .page {
  width: 24.375rem;
  height: 0.75rem;
  background-color: #f5f7fa;
  position: absolute;
  bottom: 2.0625rem;
  border-radius: 0.3125rem;
}
#specia .page li {
 width: 20px;
  height: 10px;
  float: left;
  background-color: #c2c3c5;
  color: transparent;
  border-radius: 6px;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px solid #86908f;
}
#specia .first-li {
  height: 4.6875rem;
  width: 24.375rem;
  font-size: 1.0625rem;
  text-align: left;
}
.telist .x {
  width: 2.25rem;
  height: 1.25rem;
  /* background-image: url(../../assets/7.png); */
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0.5375rem;
}
.first-li .x {
  width: 36px;
  height: 20px;
  /* background-image: url(../../assets/7.png); */
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0px;
  top:24px;
}
.telist .j {
  /* width: 6rem;
  height: 2.625rem;
  background-image: url(../../assets/8.png);
  background-repeat: no-repeat;
  background-size: cover; */
  position: absolute;
  right: 15px;
  top: 74px;
}
#specia li:first-of-type em:last-of-type {
  margin-left: 0.625rem;
}
#specia .telist {
  width: 24.375rem;
  height: 6.1875rem;
  background-color: #f5f7fa;
  padding-top: 1rem;
  position: relative;
  margin-bottom: 1.0625rem;
}
.telist .cetiao {
  width: 0.5rem;
  height: 7.1875rem;
  float: left;
  position: absolute;
  top: 0;
}

.telist .xinxi {
  text-align: left;
  margin-bottom: 0.75rem;
  margin-left: 1.3125rem;
  font-size: 0.875rem;
  color: #999999;
}
</style>

