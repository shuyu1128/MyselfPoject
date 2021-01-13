<template>
    <div class="problemfu seniorindex_4-step1">
      <div class="problem">
        <div class="score">
          共收费：
          <i style="color:#F56C6C;font-size:38px">{{zhencharge}}</i>&nbsp&nbsp元
        </div>
        <div class="Nursingtree">
          <div class="Nursingtree_left">
            <el-tree
              default-expand-all
              :render-content="renderContent"
              :data="fudata"
              :props="defaultProps"
            ></el-tree>
          </div>
          <div class="Nursingtree_right">
            <el-tree
              default-expand-all
              :render-content="renderContent2"
              :data="fudata2"
              :props="defaultProps2"
            ></el-tree>
          </div>
        </div>
        <el-button class="next seniorindex_4-step2" type="primary" @click="nextthree">生成评估报告</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 基础设施收费
      charges2: 0,
      charges: 0,
      fordata: "",
      // 第二步骤所选中答案数组
      radiovalues: [],
      // 所有问题
      topicdata: [],
      // 第几步骤
      stepshow: "step1",
      // 测试数据
      data: [],
      defaultProps: {
        children: "child",
        label: "nursingname"
      },
      defaultProps2: {
        children: "child",
        label: "chargeName"
      },
      input: "1",
      value: ["zhinan", "shejiyuanze", "yizhi"]
    };
  },
  props: {
    fudata: null,
    fudata2: null,
    zsummaryid: null
  },
  created() {},
  computed: {
    zhencharge() {
      this.charges = 0;
      this.charges2 = 0;
      this.sumchargefor(this.fudata);
      this.sumfudata2(this.fudata2);
      this.$store.state.charge=this.charges + this.charges2
      return this.charges + this.charges2;
    }
  },
  methods: {
    // 计算总金额

    sumchargefor(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].child && arr[i].child.length > 0) {
          this.sumchargefor(arr[i].child);
        } else if (arr[i].change == "true") {
          this.charges = Number(this.charges) + Number(arr[i].charge);
        } else if (arr[i].choose == undefined) {
          this.charges = Number(this.charges) + Number(arr[i].charge);
        }
      }
    },
    // 计算基础总收费
    sumfudata2(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].charge != undefined) {
          this.charges2 = this.charges2 + Number(arr[i].charge);
        }
        if (arr[i].child) {
          this.sumfudata2(arr[i].child);
        }
      }
    },
    // 修改方案
    changeNursing(ev) {
      this.changefor(this.fudata, ev.target.value);
    },
    changefor(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id != id) {
          if (arr[i].child) {
            this.changefor(arr[i].child, id);
          }
        } else {
          arr.forEach(element => {
            element.change = "false";
          });
          arr[i].change = "true";

          break;
        }
      }
    },
    // 输入内容
    changedata(event, id) {
      this.changedatafor(this.fudata, id, event.target.value);
    },
    changedatafor(arr, id, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id != id) {
          if (arr[i].child) {
            this.changedatafor(arr[i].child, id, value);
          }
        } else {
          arr[i].charge = value;
          break;
        }
      }
    },
    // 基础设施输入内容
    changedata2(event, id) {
      this.changedatafor2(this.fudata2, id, event.target.value);
    },
    changedatafor2(arr, id, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id != id) {
          if (arr[i].child) {
            this.changedatafor2(arr[i].child, id, value);
          }
        } else {
          arr[i].charge = value;
          break;
        }
      }
    },
    renderContent(h, { node, data, store }) {
      if (node.childNodes.length != 0) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      } else if (data.id == "") {
        return (
          <span>
            <span>{node.label} </span>
            <span>{data.charge} 元（不可修改）</span>
          </span>
        );
      } else if (!data.choose) {
        return (
          <span>
            <span>{node.label} </span>
            <input
              style="margin-left: 20px;margin-right: 5px;width:36px;height: 14px;"
              class="treeinput"
              value={data.charge}
              on-change={() => this.changedata(event, data.id)}
              placeholder="请输入内容"
            ></input>
            <span>元</span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <label>
              <input
                on-change={() => this.changeNursing(event)}
                style="margin-right: 10px"
                checked={data.choose == "true" ? true : false}
                name={node.parent.data.id}
                type="radio"
                value={data.id}
              />
              {node.label}
            </label>
            <input
              style="margin-left: 20px;margin-right: 5px;width:36px;height: 14px;"
              class="treeinput"
              value={data.charge}
              on-change={() => this.changedata(event, data.id)}
              placeholder="请输入内容"
            ></input>
            <span>元</span>
          </span>
        );
      }
    },
    renderContent2(h, { node, data, store }) {
      if (data.child) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      } else {
        return (
          <span>
            <span>{node.label} </span>
            <input
              style="margin-left: 20px;margin-right: 5px;width:36px;height: 14px;"
              class="treeinput"
              value={data.charge}
              on-change={() => this.changedata2(event, data.id)}
              placeholder="请输入内容"
            ></input>
            <span>元</span>
          </span>
        );
      }
    },
    // 告诉父组件生成新的答题
    nextthree() {
      this.$prompt("是否生成新模板，如生成新模板请填写模板名称：", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "生成新模板",
        cancelButtonText: "仅应用于本次",
        closeOnClickModal:false
      })
        .then(value => {
          if (
            value.value == null ||
            value.value == "" ||
            value.value.match(/^[ ]*$/)
          ) {
            this.$message({
              message: "请输入新模板名称！",
              type: "warning"
            });
            this.nextthree();
          } else {
            this.$emit("childfour", value.value);
          }
        })
        .catch(action => {
          if (action === "cancel") {
            this.$emit("childfour", "");
          }
        });
    }
  }
};
</script>
<style>
.el-message {
  z-index: 4000 !important;
}
</style>
<style scoped>
.score {
  width: 600px;
  margin: 0 auto;
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}
.problemfu {
  height: 674px;
  padding-top: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.problem {
  height: 100%;
  position: relative;
}
.toticregion {
  border-top: 1px solid #f0f2f5;
  padding: 20px 0 10px 0;
}
.classification {
  margin-bottom: 40px;
}
.classification .toticregion:last-of-type {
  border-bottom: 1px solid #f0f2f5;
}
.next {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.Nursingtree {
  border-top: 1px solid #f0f2f5;
  border-bottom: 1px solid #f0f2f5;
  height: 520px;
  overflow-y: auto;
}
.Nursingtree_left {
  width: 50%;
  float: left;
  border-right: 1px solid #f0f2f5;
}
.Nursingtree_right {
  width: 49%;
  height: 900px;
  float: left;
}
</style>