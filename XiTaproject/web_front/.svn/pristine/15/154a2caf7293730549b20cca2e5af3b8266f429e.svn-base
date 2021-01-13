

function drawLine(x, y, myChart) {

    // 绘制图表
    myChart.setOption({
        grid: {
            top: 10,
            bottom: 25,
            left: 50,
            right: 20
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: x,
            scale: true,
            max: 100,//最大的刻度尺
        },
        yAxis: {
            type:'value',
            max:-50,
            min:-100
        },
        series: [{
            data: y,
            type: 'line',
            smooth: true
        }]
    });
}

export {
    drawLine
}



