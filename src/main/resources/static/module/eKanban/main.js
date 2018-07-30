(function () {

    /*异常分布类型  饼图*/
    initPie = function () {
        var myChart = echarts.init(document.getElementById('right_chart'));
        var option = {
            title: {
                text: '异常类型分布',
                x: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: '20%',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '40%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    },
    initPickUpRate = function () {
        var myChart = echarts.init(document.getElementById('pick_up_rate'));
        var option = {
            title: {
                text: '提货准点率',
                x: 'left'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        };
       myChart.setOption(option);
    },
    initArrivalRate = function () {
        var myChart = echarts.init(document.getElementById('arrival_rate'));
        var option = {
            title: {
                text: '到货准点率',
                x: 'left'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        myChart.setOption(option);
    }


    $(document).ready(function () {
        initPie();
        initPickUpRate();
        initArrivalRate();
    })

}());



