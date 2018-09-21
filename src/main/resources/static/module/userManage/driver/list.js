/* 司机模块审核的 js  */
(function () {
    var HTML_PAGE = "module/userManage/driver/list.html";
    var LIST_DATA = "driver/get_list_data";
    define([
        'jquery',
        'text!' + HTML_PAGE
    ], function ($, pageHtml) {
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }

        //初始化bootstrap table
        var initTable = function () {
            $('#driver_owner_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                sidePagination: 'server',
                pageSize: 10,
                pageNumber: 1,
                sortStable: true,
                sortName: "createTime",
                sortOrder: "desc",
                queryParams: function queryParams(params) {   //设置查询参数
                    var param = {
                        pageSize: this.pageSize,   //每页多少条数据
                        pageNumber: this.pageNumber, // 页码
                        code: null
                    };
                    return param;
                },
                responseHandler: function (res) {
                    return {
                        "total": res.total,
                        "rows": res.list
                    };
                },
                columns: [{
                    field: 'rowNum',
                    title: '序号',
                    align: 'center',
                    field: 'num',
                    title: '序号',
                    align: 'center',
                    formatter:function(value,row,index){
                        var pageSize=$('#driver_owner_table').bootstrapTable('getOptions').pageSize
                        var pageNumber=$('#driver_owner_table').bootstrapTable('getOptions').pageNumber;
                        return pageSize * (pageNumber - 1) + index + 1;
                    }
                }, {
                    field: 'driverName',
                    title: '司机名',
                    align: 'center'
                }, {
                    field: 'driverCode',
                    title: '注册账号',
                    align: 'center'
                }, {
                    field: 'driverType',
                    title: '类型',
                    align: 'center',
                    formatter: function (value) {
                        return "司机";
                    }
                },{
                    field: 'checkStatus',
                    title: '是否认证',
                    align: 'center',
                    sortable: true,
                    formatter: function (value) {
                        return value == 2 ? '是' : '否';
                    }
                }, {
                    field: 'createTime',
                    title: '注册时间',
                    align: 'center',
                    sortable: true
                }, {
                    field: 'lockedFlag',
                    title: '状态',
                    align: 'center',
                    formatter: function (value) {
                        return value == 'Y' ? '冻结' : '正常';
                    }
                }, {
                    field: 'pkDriver',
                    title: '操作',
                    align: 'center',
                    formatter: function (value, row) {
                        var str = "<div id='" + value + "' checkStatus='"+row.checkStatus+"' lockedFlag='"+row.lockedFlag+"'><a href='#' class='detail'>查看</a>";
                        if (row.lockedFlag == 'Y') {
                            str += "<a href='#' class='thaw audit_a'>解冻</a>";
                        } else {
                            str += "<a href='#' class='freeze audit_a'>冻结</a>";
                        }
                        //return str + "<a href='#' class='del audit_a'>删除</a></div>";
                        return str + "</div>";
                    }
                }]
            });
        }
        var bindEvent = function () {
            $("#driver_search").click(function () {
                $("#driver_owner_table").bootstrapTable('refresh', {
                    query: {code: $("#driver_text").val()}
                });
                $("#driver_text").val("");
            })
            /* 表格事件绑定*/
            $("#driver_owner_table").on('click', 'a', function () {
                var id = $(this).parent("div").attr("id");
                var url = null;
                if ($(this).hasClass("freeze")) {
                    /*冻结*/
                    url ="driver/" + id + "/" + common.yesStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("thaw")) {
                    /*解冻*/
                    url ="driver/" + id + "/" + common.noStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("del")) {
                    // 删除
                    url = "driver/" + id;
                    common.ajaxfuncURL(url,"DELETE",{},eventCallBack);
                } else if($(this).hasClass("detail")) {
                    var checkStatus = $(this).parent("div").attr("checkStatus");
                  /*  var lockedFlag = $(this).parent("div").attr("lockedFlag");*/
                    //查看
                    $("#driver_table_div").hide();
                    requirejs(["module/userManage/driver/detail"], function (list) {
                        list.load(id,checkStatus);
                    });
                }
            })
        }
        var driverObject = {};
        driverObject.load = function () {
            initHtml();
            initTable();
            bindEvent();
        }
        return driverObject;

    })

}).call(this)