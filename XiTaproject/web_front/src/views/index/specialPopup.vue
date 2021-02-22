<template>
  <div class="block">
    <el-carousel :autoplay="false" height="588px">
      <el-carousel-item v-for="(ditem,dindex) in splaceEvent" :key="dindex">
        <li v-for="(item,index) in ditem" :key="index" class="telist">
          <el-button
            type="danger"
            class="j"
            size="small"
            @click="relieve(item.id,item.healthstatuscode,item.railid,item.ipAndPort)"
          >解除</el-button>
          <div class="cetiao" :style="{backgroundColor:item.color}"></div>
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
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roup: [],
    };
  },
  props: { peoplej: null, peopleg: null, ifs: null },
  created() {},
  computed: {
    splaceEvent() {
      let roup = [];
      if (this.ifs == "jj") {
        if (this.$store.state.websocket.emergencyData.length == 0) {
          roup = null;
        } else {
          roup = this.group(this.$store.state.websocket.emergencyData, 4);
        }
      } else {
        if (this.$store.state.websocket.specialAttentionData.length == 0) {
          roup = null;
        } else {
          roup = this.group(
            this.$store.state.websocket.specialAttentionData,
            4
          );
        }
      }
      return roup;
    }
  },
 
  methods: {
    // 解除关注
    relieve(personid, type, railid,ipAndPort) {
      var r = confirm("即将解除，是否继续？");
      if (r == true) {
        this.$ajax
          .post(
            "http://"+ipAndPort + "/mainPage/intsertRemoveAttention",
            `userid=${this.$store.state.token}&personid=${personid}&time=23:59&type=${type}&railid=${railid}&source=personal`
          )
          .then(res => {});
      } else {
        this.$message("取消解除");
      }
    },
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    }
  }
};
</script>


<style>
.block .el-carousel__indicators {
  border-radius: 4px;
  background-color: #dedede;
  width: 438px;
}
.block .el-carousel__item {
  background-color: #fff;
}
.block .telist .j {
  position: absolute;
  right: 15px;
  top: 74px;
}
.block li:first-of-type em:last-of-type {
  margin-left: 0.625rem;
}
.block .telist {
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
