(function () {
    // HTML 界面
    var PAGE_HTML = "module/eKanban/main.html";
    define(
        [
            'jquery',
            'echarts',
            'text!' + PAGE_HTML
        ],
        function
            ($, echarts, pageHtml) {
            var initHtml = function () {
                $("#page-wrapper").html(pageHtml);
            };
            /*异常分布类型  饼图*/
            var initPie = function () {
                var myChart = echarts.init(document.getElementById('right_chart'));
                myChart.showLoading();
                $.get('').done(function (data) {
                    myChart.hideLoading();
                    myChart.setOption({
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
                            bottom: '30',
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
                    });
                });
            };
            var initPickUpRate = function () {
                var myChart = echarts.init(document.getElementById('pick_up_rate'));
                myChart.showLoading();
                $.get('').done(function (data) {
                    myChart.hideLoading();
                    myChart.setOption({
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
                    });
                });
            };
            var initArrivalRate = function (status) {
                var myChart = echarts.init(document.getElementById('arrival_rate'));
                myChart.showLoading();
                $.get('ekan/arrival_rate',{status:status}).done(function (data) {
                    console.log(data)
                    myChart.hideLoading();
                    myChart.setOption({
                        title: {
                            text: '到货准点率',
                            x: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            data:data.data.xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: data.data.yAxis,
                            type: 'line',
                            areaStyle: {}
                        }]
                    });
                });
            }
            var bindEvents = function () {
                /* 提货率 */
                $("#pick_up_rate_container li").each(function (index) {
                    $(this).click(function () {
                        initPickUpRate(index);
                    })
                })
                /* 到货率  */
                $("#arrival_rate_container li").each(function (index) {
                    $(this).click(function () {
                        initArrivalRate(index);
                    })
                })
            }

            var ekanMain = {};
            ekanMain.load = function () {
                initHtml();
                initPie();
                initPickUpRate();
                initArrivalRate(1);
                bindEvents();
            }
            return ekanMain;
        });
}).call(this);




