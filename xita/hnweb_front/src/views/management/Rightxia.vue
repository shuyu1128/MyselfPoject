<template>
  <div>
    <el-dialog :show-close="false" :visible.sync="dialogVisible" width="10%">
      <div style="margin-left: 0px;">
        <div class="room">
          <div>{{nowdbRoom.name}}</div>
          <div>
            <el-button
              plain
              style="padding-left:15px;padding-right:15px;"
              v-for="(bed,bindex) in nowdbRoom.bed"
              :key="bindex"
              :type="bed.type"
              size="mini"
              class="bad"
              @click.stop="tiaozhuan(bed.id)"
            >{{bed.name}}</el-button>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </el-dialog>
    <!-- <el-radio-group v-model="select.radio1" style="margin-left: 75px;">
      <el-radio-button label="全自理"></el-radio-button>
      <el-radio-button label="半自理"></el-radio-button>
      <el-radio-button label="全介护"></el-radio-button>
    </el-radio-group>-->
    <div class="select_top" style="margin-left:10%;">
      <el-checkbox-group v-model="select.radio1">
        <el-checkbox-button v-for="city in grade" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="select_top">
      <el-select v-model="select.value" clearable placeholder="请选择">
        <el-option
          v-for="item in inpatientareas"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="select_top">
      <el-checkbox-group v-model="select.radio2">
        <el-checkbox-button v-for="city in roomstd" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <!-- <el-button icon="el-icon-search" circle style="margin-left: 30px;" @click="selecte"></el-button> -->
    <div class="bingqubiao">
      <div v-for="(item,index) in ceng" :key="index" class="ceng">
        <div class="cengming">
          {{item.name1}}
          <br />
          {{item.name2}}
        </div>
        <div class="cengnei">
          <div
            @dblclick="openRoom(room)"
            v-for="(room,rindex) in item.roomnei"
            :key="rindex"
            class="room"
          >
            <div>{{room.name}}</div>
            <div>
              <el-button
                plain
                style="padding-left:15px;padding-right:15px;"
                v-for="(bed,bindex) in room.bed"
                :key="bindex"
                :type="bed.type"
                size="mini"
                class="bad"
                @click.stop="tiaozhuan(bed.id)"
              >{{bed.name}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 放大房间内容
      nowdbRoom: {},
      // 放大弹窗状态
      dialogVisible: false,
      grade: ["全自理", "半自理", "全介护"],
      roomstd: ["已住满", "已入住", "空余"],
      ceng: [],
      select: {
        radio1: ["全自理", "半自理", "全介护"],
        radio2: ["已住满", "已入住", "空余"],
        value: "",
      },
      options: [
        // {
        //   value: "",
        //   label: "全部病区"
        // }
      ],
    };
  },
  computed: {
    // 责任区域可选项
    inpatientareas() {
      return this.$store.state.management.inpatientareas;
    },
  },
  created() {
    // 获取全部责任区域
    this.$ajax
      .post(
        process.env.API_HOST + "/roomStatus/getInpatientareaListByUserid",
        "userid=" + this.$store.state.token
      )
      .then((response) => {
        this.options = response.data;
        this.options.push({
          value: "",
          label: "全部责任区域",
        });
      });

    this.$ajax
      .post(
        process.env.API_HOST + "/roomStatus/getRoomDetailed",
        `select=${JSON.stringify(this.select)}&userid=${
          this.$store.state.token
        }`
      )
      .then((response) => {
        this.ceng = response.data;
      });
  },
  watch: {
    select: {
      handler(newName, oldName) {
        console.log(newName);
        this.selecte();
      },
      deep: true,
    },
  },
  methods: {
    // 双击打开放大房间
    openRoom(data) {
      this.nowdbRoom = data;
      this.dialogVisible = true;
      console.log(data);
    },
    selecte() {
      this.$ajax
        .post(
          process.env.API_HOST + "/roomStatus/getRoomDetailed",
          `select=${JSON.stringify(this.select)}&userid=${
            this.$store.state.token
          }`
        )
        .then((response) => {
          this.ceng = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    tiaozhuan(val) {
      console.log(val);
      if (val != undefined) {
        this.$router.push({
          path: "/Detailsx:id",
          name: "详情",
          query: { id: val },
        });
      }
    },
  },
};
</script>
<style scoped>
.select_top {
  float: left;
  width: 28%;
  text-align: center;
}
.el-button + .el-button {
  margin-left: 0px;
}
.bingqubiao {
  width: 97%;
  height: 674px;
  /* background-color: red; */
  margin-left: 15px;
  margin-top: 15px;
  overflow: auto;
}
.ceng:first-of-type {
  margin-top: 20px;
}
.ceng {
  width: 100%;
  height: 144px;
  border: 2px solid #dfe6ec;
  box-sizing: border-box;
  border-bottom: none;
}
.bingqubiao .ceng:last-of-type {
  border-bottom: 2px solid #dfe6ec;
}
.cengming {
  width: 10%;
  height: 90px;
  padding-top: 50px;
  text-align: center;
  border-right: 2px solid #dfe6ec;
  float: left;
}
.cengnei {
  width: 89%;
  height: 140px;
  /* background-color: antiquewhite; */
  float: left;
  overflow-x: auto;
}

::-webkit-scrollbar {
  display: none;
}
.room {
  width: 80px;
  /* height: 110px; */
  min-height: 110px;
  border: 3px solid black;
  border-radius: 15px;
  float: left;
  margin: 10px;
  margin-left: 30px;
  padding-bottom: 7px;
}
.room div:first-of-type {
  text-align: center;
  border-bottom: 1px solid #000;
}
.room div:last-of-type {
  text-align: center;
}
.bad {
  margin-top: 10px;
}
</style>

