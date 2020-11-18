import echarts from "echarts";
function drawLine(data,dom) {
    let arr1 = []
    let arr2 = []
    data.forEach(element => {
        arr1.push({ name: element.typename, max: element.total })
        arr2.push(element.score)
    });
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.querySelector(dom))
    // 绘制图表
    myChart.setOption({
        title: {
            text: '智慧评估雷达图'
        },
        tooltip: {},

        radar: [
            {
                indicator: arr1,
                center: ['55%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter: '【{value}】',
                    textStyle: {
                        color: '#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(114, 172, 209, 0.2)',
                            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },

        ],
        series: [
            {
                name: '雷达图',
                type: 'radar',
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                },
                data: [
                    {
                        value: arr2,
                        name: '统计',
                        areaStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                ]
            }

        ]
    });
}









export {
    drawLine
}