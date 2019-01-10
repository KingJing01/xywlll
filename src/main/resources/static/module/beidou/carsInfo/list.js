/* 车辆列表 js  */
(function () {
    var HTML_PAGE = "module/beidou/carsInfo/list.html";
    var LIST_DATA = "beidou/queryVehicleList";
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
            $('#cars_info_table').bootstrapTable({
                url: LIST_DATA,
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                sidePagination: 'client',
                pageSize: 10,
                pageNumber: 1,
                columns: [ {
                    field: 'fleetName',
                    title: '车组名称',
                    align: 'center'
                }, {
                    field: 'isLogout',
                    title: '注册账号',
                    align: 'center'
                }, {
                    field: 'mobileCode',
                    title: '类型',
                    align: 'center'
                }, {
                    field: 'onlineStatus',
                    title: '是否认证',
                    align: 'center',
                    sortable: true,
                    formatter: function (value) {
                        return value == 2 ? '是' : '否';
                    }
                }, {
                    field: 'enterpriseName',
                    title: '注册时间',
                    align: 'center',
                    sortable: true
                }, {
                    field: 'plateCode',
                    title: '状态',
                    align: 'center'
                }],
                responseHandler: function (res) {
                    debugger
                    return {
                        "total": res.total,
                        "rows": res.rows
                    };
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
            $("#cargo_owner_table").on('click', 'a', function () {
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