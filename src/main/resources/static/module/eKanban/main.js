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
            var icon_up ="fa fa-caret-up ekan-up";
            var icon_down ="fa fa-caret-down ekan-down";
            var initHtml = function () {
                $("#page-wrapper").html(pageHtml);
            };
            /*异常分布类型  饼图*/
            var initPie = function () {
                var myChart = echarts.init(document.getElementById('right_chart'));
                myChart.showLoading();
                $.get('ekan/exception_distribute').done(function (data) {
                    console.log(data);
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
                            data: data.data.legend
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['50%', '70%'],
                                center: ['50%', '40%'],
                                data: data.data.series,
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
            /* 提货率  */
            var initPickUpRate = function (status) {
                var myChart = echarts.init(document.getElementById('pick_up_rate'));
                myChart.showLoading();
                $.get('ekan/pick_up_rate',{status:status}).done(function (data) {
                    myChart.hideLoading();
                    myChart.setOption({
                        title: {
                            text: '提货准点率',
                            x: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            data: data.data.xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data:  data.data.yAxis,
                            type: 'line',
                            smooth: true
                        }]
                    });
                });
            };
            /* 到货率 */
            var initArrivalRate = function (status) {
                var myChart = echarts.init(document.getElementById('arrival_rate'));
                myChart.showLoading();
                $.get('ekan/arrival_rate',{status:status}).done(function (data) {
                    myChart.hideLoading();
                    myChart.setOption({
                        title: {
                            text: '到货准点率',
                            x: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
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
                        initPickUpRate(index+1);
                    })
                })
                /* 到货率  */
                $("#arrival_rate_container li").each(function (index) {
                    $(this).click(function () {
                        initArrivalRate(index+1);
                    })
                })
            };
            var ajaxCallBack = function (data,param) {
                $(param + " .number_p").html(data.data.num?data.data.num:0);
                $(param + " .span_rate").html(data.data.rate?Number(data.data.rate).toFixed(2)+"%":0);
                if(data.success){
                    $(param + "_span").attr("class",icon_up);
                    $(param + " .span_rate").addClass("ekan-up");
                }else{
                    $(param + "_span").attr("class",icon_down);
                    $(param + " .span_rate").addClass("ekan-down");
                }
                console.log(JSON.stringify(data)+"~"+param);
                
            }
            /* 电子看板图标上方展示的信息 */
            var initEkanTop = function () {
                /*今日到货订单量*/
                common.ajaxfuncURL("ekan/day_arrival",{},ajaxCallBack,"#day_arrival");
                //今日提货订单量
                common.ajaxfuncURL("ekan/day_pick",{},ajaxCallBack,"#day_pick");
                //今日订单总量
                common.ajaxfuncURL("ekan/day_total",{},ajaxCallBack,"#day_total");
                //本月订单总量
                common.ajaxfuncURL("ekan/month_total",{},ajaxCallBack,"#month_total");

            }

            var ekanMain = {};
            ekanMain.load = function () {
                initHtml();
                initPie();
                initPickUpRate(1);
                initArrivalRate(1);
                bindEvents();
                initEkanTop();
            }
            return ekanMain;
        });
}).call(this);




