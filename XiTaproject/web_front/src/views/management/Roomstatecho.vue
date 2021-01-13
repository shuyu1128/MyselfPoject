<template>
  <div class="echors"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    // 图表统计情况数据
    RoomTypeStatisticsTotal() {
      return this.$store.state.management.RoomTypeStatisticsTotal;
    },
    RoomTypeStatisticsType() {
      return this.$store.state.management.RoomTypeStatisticsType;
    },
  },
  watch: {
    RoomTypeStatisticsTotal(val) {
      if (val) {
        this.ini();
      }
    },
  },
  created() {},
  methods: {
    ini() {
      let echors = this.$echarts.init(document.querySelector(".echors"));

      echors.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['已入住房间','以住满房间','空余房间','全自理','半自理','全介护','全自理','半自理','全介护','全自理','半自理','全介护']
        // },
        color: [
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#bda29a",
          "#6e7074",
          "#546570",
        ],
        series: [
          {
            name: "房间数",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 8,
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.RoomTypeStatisticsTotal,
          },
          {
            name: "房间数",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}    ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 8,
                width: 83,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 20,
                    fontSize: 12,
                    align: "center",
                  },

                  hr: {
                    borderColor: "#aaa",
                    width: 83,
                    borderWidth: 0.5,
                    height: 0,
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 25,
                  },
                  c: {
                    fontSize: 12,
                    lineHeight: 25,
                  },
                },
              },
            },
            labelLine: {
              normal: {
                length: 3,
              },
            },
            data: this.RoomTypeStatisticsType,
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.echors {
  width: 100%;
  height: 100%;
}
</style>


