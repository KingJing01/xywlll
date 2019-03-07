/* 车辆行驶状态 js  */
(function () {
    var HTML_PAGE = "module/beidou/runningInfo/list.html";
    var LIST_DATA = "beidou/queryVehicleOperatingDataByHbase";
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
            $('#running_info_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                sidePagination: 'client',
                sortStable: true,
                columns: [{
                    field: 'gnssSatelliteNumber',
                    title: 'GNSS卫星的数量',
                    align: 'center'
                }, {
                    field: 'coolantLevel',
                    title: '水箱液位',
                    align: 'center'
                }, {
                    field: 'accumulativeMileage',
                    title: '累计行驶里程Km',
                    align: 'center'
                }, {
                    field: 'averagefuelConsumption',
                    title: '平均油耗率Km/L',
                    align: 'center',
                }, {
                    field: 'braking',
                    title: '制动时长(秒)',
                    align: 'center',
                },{
                    field: 'instantaneousFuelConsumption',
                    title: '瞬时油耗率km/L',
                    align: 'center',
                },{
                    field: 'longitude',
                    title: 'WGS84坐标系的经度',
                    align: 'center',
                },{
                    field: 'mileage',
                    title: '里程信息',
                    align: 'center',
                },{
                    field: 'marsLatitude',
                    title: 'GCJ坐标系的纬度',
                    align: 'center',
                },{
                    field: 'svt80',
                    title: '是否SVT80的设备',
                    align: 'center',
                },{
                    field: 'accOffTime',
                    title: 'ACC关闭的时间',
                    align: 'center',
                },{
                    field: 'brakingLength',
                    title: '制动时长 秒',
                    align: 'center',
                },{
                    field: 'recordSpeed',
                    title: '行驶记录仪速度km/h',
                    align: 'center',
                },{
                    field: 'supplementData',
                    title: '是否补传的数据',
                    align: 'center',
                },{
                    field: 'areaCode',
                    title: '区域编码',
                    align: 'center',
                },{
                    field: 'stayDuration',
                    title: '停留的秒数',
                    align: 'center',
                },{
                    field: 'clutch',
                    title: '离合器信息',
                    align: 'center',
                    formatter: function (value) {
                        return value == 1 ? '关闭' : '开启';
                    }
                },{
                    field: 'accumulativeFuel',
                    title: '累计油耗 L',
                    align: 'center'
                },{
                    field: 'fixed',
                    title: '是否定位',
                    align: 'center',
                    formatter: function (value) {
                        return value == true ? '定位' : '未定位';
                    }
                },{
                    field: 'torqueRatio',
                    title: '发动机实际扭矩百分比',
                    align: 'center',
                },{
                    field: 'engineOilPressure',
                    title: '机油压力Kpa',
                    align: 'center',
                },{
                    field: 'ureaTankTemperature',
                    title: '尿素箱温度 ℃',
                    align: 'center',
                },{
                    field: 'accOnTime',
                    title: 'Acc开启时间',
                    align: 'center',
                },{
                    field: 'fuelLevel',
                    title: '燃油液位 %',
                    align: 'center',
                },{
                    field: 'latitude',
                    title: 'WGS84坐标系的纬度',
                    align: 'center',
                },{
                    field: 'plate',
                    title: '车牌号',
                    align: 'center',
                },{
                    field: 'marsLongitude',
                    title: 'GCJ坐标系的经度',
                    align: 'center',
                },{
                    field: 'engineRev',
                    title: '发动机转速 rpm',
                    align: 'center',
                },{
                    field: 'inletTemperature',
                    title: '进气温度 ℃',
                    align: 'center',
                },{
                    field: 'speed',
                    title: '车速  km/h',
                    align: 'center',
                },{
                    field: 'vehicleId',
                    title: '车辆编号',
                    align: 'center',
                },{
                    field: 'coolantTemperature',
                    title: '发动机冷却水温度  ℃',
                    align: 'center',
                },{
                    field: 'brakeSubsensitive',
                    title: '制动次数 ',
                    align: 'center',
                },{
                    field: 'fuelTemperature',
                    title: '燃油温度 ℃',
                    align: 'center',
                },{
                    field: 'inletPressure',
                    title: '进气压力  kpa',
                    align: 'center',
                },{
                    field: 'voltage',
                    title: '蓄电池电压  V',
                    align: 'center',
                },{
                    field: 'receiveTime',
                    title: '接收时间',
                    align: 'center',
                    formatter: function (value) {
                        return common.formatUnixtimestamp(value)
                    }
                },{
                    field: 'throttleRatio',
                    title: '风门踏板位置',
                    align: 'center',
                }, {
                    field: 'ureaTankLevel',
                    title: '尿素箱液位',
                    align: 'center',
                }, {
                    field: 'fuelPressure',
                    title: '燃油压力',
                    align: 'center',
                }, {
                    field: 'currentGear',
                    title: '当前档位',
                    align: 'center',
                }, {
                    field: 'engineFuelRate',
                    title: '发动机油耗率 L/h',
                    align: 'center',
                }, {
                    field: 'engineTime',
                    title: '发动机累计运行时间',
                    align: 'center',
                } ],
                responseHandler: function (res) {
                    return res.list
                }

            });
        }
        /* 列表点击事件的回调函数  列表数据刷新*/
        var eventCallBack = function (resp) {
            if (resp.success == 1) $("#running_info_table").bootstrapTable('refresh');
        }
        //点击事件的绑定
        var bindEvent = function () {
            $("#cargo_search").click(function () {
                $("#running_info_table").bootstrapTable('refresh', {
                    query: {custCode: $("#cargo_text").val()}
                });
                $("#cargo_text").val("");
            })
            /* 表格事件绑定*/
            $("#running_info_table").on('click', 'a', function () {
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