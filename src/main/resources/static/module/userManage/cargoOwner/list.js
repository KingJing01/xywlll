/* 货主审核模块的 js  */
(function () {
    var HTML_PAGE = "module/userManage/cargoOwner/list.html";
    var LIST_DATA = "cargo_owner/get_list_data";
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
            $('#cargo_owner_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                sidePagination: 'server',
                pageSize: 10,
                pageNumber: 1,
                queryParams: function queryParams(params) {   //设置查询参数
                    var param = {
                        pageSize: this.pageSize,   //每页多少条数据
                        pageNumber: this.pageNumber, // 页码
                        custCode: null
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
                    field: 'num',
                    title: '序号',
                    align: 'center',
                    formatter:function(value,row,index){
                        var pageSize=$('#cargo_owner_table').bootstrapTable('getOptions').pageSize
                        var pageNumber=$('#cargo_owner_table').bootstrapTable('getOptions').pageNumber;
                        return pageSize * (pageNumber - 1) + index + 1;
                    }
                }, {
                    field: 'custName',
                    title: '昵称',
                    align: 'center'
                }, {
                    field: 'custCode',
                    title: '注册账号',
                    align: 'center'
                }, {
                    field: 'custType',
                    title: '类型',
                    align: 'center',
                    formatter: function (value) {
                        return "货主";
                    }
                },{
                    field: 'checkStatus',
                    title: '是否认证',
                    align: 'center',
                    formatter: function (value) {
                        return value == 2 ? '是' : '否';
                    }
                }, {
                    field: 'createTime',
                    title: '注册时间',
                    align: 'center',
                }, {
                    field: 'lockedFlag',
                    title: '状态',
                    align: 'center',
                    formatter: function (value) {
                        return value == 'Y' ? '冻结' : '正常';
                    }
                }, {
                    field: 'pkCustomer',
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
        /* 列表点击事件的回调函数  列表数据刷新*/
        var eventCallBack = function (resp) {
            if (resp.success == 1) $("#cargo_owner_table").bootstrapTable('refresh');
        }
        //点击事件的绑定
        var bindEvent = function () {
            $("#cargo_search").click(function () {
                $("#cargo_owner_table").bootstrapTable('refresh', {
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
                    url ="cargo_owner/" + id + "/" + common.yesStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("thaw")) {
                    /*解冻*/
                    url ="cargo_owner/" + id + "/" + common.noStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("del")) {
                    // 删除
                    url = "cargo_owner/" + id;
                    common.ajaxfuncURL(url,"DELETE",{},eventCallBack);
                } else if($(this).hasClass("detail")) {
                    var checkStatus = $(this).parent("div").attr("checkStatus");
                    var lockedFlag = $(this).parent("div").attr("lockedFlag");
                    //查看
                    $("#cargo_table_div").hide();
                    requirejs(["module/userManage/cargoOwner/detail"], function (list) {
                        list.load(id,checkStatus,lockedFlag);
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