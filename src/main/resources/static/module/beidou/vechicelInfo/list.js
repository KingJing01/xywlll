/* 车辆列表 js  */
(function () {
    var HTML_PAGE = "module/beidou/vechicelInfo/list.html";
    var LIST_DATA = "beidou/queryVehicleJourneyByMyCat";
    define([
        'jquery',
        'text!' + HTML_PAGE
    ], function ($, pageHtml) {
        //初始化界面
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }

        //初始化bootstrap table
        var initTable = function () {
            $('#vechicel_info_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                sidePagination: 'client',
                sortStable: true,
                columns: [ {
                    field: 'vehicleId',
                    title: 'Id',
                    align: 'center'
                }, {
                    field: 'beginTime',
                    title: '开始时间',
                    align: 'center'
                },{
                    field: 'endTime',
                    title: '结束时间',
                    align: 'center'
                }, {
                    field: 'idlingDuration',
                    title: '怠速时长',
                    align: 'center'
                }, {
                    field: 'beginLat',
                    title: '开始纬度',
                    align: 'center',
                }, {
                    field: 'begingLng',
                    title: '开始经度',
                    align: 'center',
                }, {
                    field: 'endLat',
                    title: '结束纬度',
                    align: 'center',
                },{
                    field: 'endLng',
                    title: '结束经度',
                    align: 'center',
                }, {
                    field: 'stopDuration',
                    title: '停车时长',
                    align: 'center'
                }, {
                    field: 'passedAreaCode',
                    title: '途径地市',
                    align: 'center'
                }, {
                    field: 'economicalDuration',
                    title: '经济转速时间',
                    align: 'center'
                }, {
                    field: 'uneconomicalDuration',
                    title: '非经济转速时间',
                    align: 'center'
                }, {
                    field: 'duration',
                    title: '持续时长',
                    align: 'center'
                }, {
                    field: 'gpsMileage',
                    title: 'GPS里程',
                    align: 'center'
                }, {
                    field: 'oil',
                    title: '油耗',
                    align: 'center'
                },{
                    field: 'overSpeedAlarmCount',
                    title: '超速次数',
                    align: 'center'
                }],
                responseHandler: function (res) {
                    return res.list
                }
            });
        }
        /* 列表点击事件的回调函数  列表数据刷新*/
        var eventCallBack = function (resp) {
            if (resp.success == 1) $("#vechicel_info_table").bootstrapTable('refresh');
        }
        //点击事件的绑定
        var bindEvent = function () {
            $("#cargo_search").click(function () {
                $("#vechicel_info_table").bootstrapTable('refresh', {
                    query: {custCode: $("#cargo_text").val()}
                });
                $("#cargo_text").val("");
            })
            /* 表格事件绑定*/
            $("#vechicel_info_table").on('click', 'a', function () {
                var id = $(this).parent("div").attr("id");
                var url = null;
                if ($(this).hasClass("freeze")) {
                    /*冻结*/
                    url = "cargo_owner/" + id + "/" + common.yesStatus;
                    common.ajaxfuncURL(url, "PUT", {}, eventCallBack);
                } else if ($(this).hasClass("thaw")) {
                    /*解冻*/
                    url = "cargo_owner/" + id + "/" + common.noStatus;
                    common.ajaxfuncURL(url, "PUT", {}, eventCallBack);
                } else if ($(this).hasClass("del")) {
                    // 删除
                    url = "cargo_owner/" + id;
                    common.ajaxfuncURL(url, "DELETE", {}, eventCallBack);
                } else if ($(this).hasClass("detail")) {
                    var checkStatus = $(this).parent("div").attr("checkStatus");
                    var lockedFlag = $(this).parent("div").attr("lockedFlag");
                    //查看
                    $("#cargo_table_div").hide();
                    requirejs(["module/userManage/cargoOwner/detail"], function (list) {
                        list.load(id, checkStatus, lockedFlag);
                    });
                }
            })


        }
        var hostObject = {};
        hostObject.load = function () {
            initHtml();
            initTable();
            bindEvent();
        }
        return hostObject;
    })

}).call(this)