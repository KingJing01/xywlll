/* 车辆列表 js  */
(function () {
    var HTML_PAGE = "module/beidou/realtimeInfo/list.html";
    var LIST_DATA = "beidou/queryVehicleBasicData";
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
            $('#realtime_info_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [5, 10, 15, 20],
                pagination: true,
                sidePagination: 'client',
                sortStable: true,
                columns: [{
                    field: 'mobileCode',
                    title: '设备卡号',
                    align: 'center'
                }, {
                    field: 'latitude',
                    title: '纬度',
                    align: 'center'
                }, {
                    field: 'gpsTime',
                    title: 'Gps时间',
                    align: 'center'
                },{
                    field: 'terminalCode',
                    title: '设备编号',
                    align: 'center'
                }, {
                    field: 'totalFuel',
                    title: '总油耗',
                    align: 'center'
                }, {
                    field: 'carVin',
                    title: '车架号',
                    align: 'center'
                }, {
                    field: 'plateCode',
                    title: '车牌号',
                    align: 'center'
                }, {
                    field: 'longitude',
                    title: '经度',
                    align: 'center'
                }, {
                    field: 'mileage',
                    title: '总里程',
                    align: 'center'
                }],
                responseHandler: function (res) {
                    return res.list
                }

            });
        }
        /* 列表点击事件的回调函数  列表数据刷新*/
        var eventCallBack = function (resp) {
            if (resp.success == 1) $("#cars_info_table").bootstrapTable('refresh');
        }
        //点击事件的绑定
        var bindEvent = function () {
            $("#cargo_search").click(function () {
                $("#cars_info_table").bootstrapTable('refresh', {
                    query: {custCode: $("#cargo_text").val()}
                });
                $("#cargo_text").val("");
            })
            /* 表格事件绑定*/
            $("#realtime_info_table").on('click', 'a', function () {
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
                    $("#cars_info_table").hide();
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