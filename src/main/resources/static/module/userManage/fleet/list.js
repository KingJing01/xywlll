/* 司机模块审核的 js  */
(function () {
    var HTML_PAGE = "module/userManage/fleet/list.html";
    var LIST_DATA = "fleet/get_list_data";
    define([
        'jquery',
        'text!' + HTML_PAGE
    ], function ($, pageHtml) {
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }

        //初始化bootstrap table
        var initTable = function () {
            $('#fleet_owner_table').bootstrapTable({
                url: LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                locale: moment.locale('zh-cn'),
                sidePagination: 'server',
                pageSize: 10,
                pageNumber: 1,
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
                    title: '序号',
                    field: 'num',
                    align: 'center',
                    formatter:function(value,row,index){
                        var pageSize=$('#fleet_owner_table').bootstrapTable('getOptions').pageSize
                        var pageNumber=$('#fleet_owner_table').bootstrapTable('getOptions').pageNumber;
                        return pageSize * (pageNumber - 1) + index + 1;
                    }
                }, {
                    field: 'carrName',
                    title: '车队名称',
                    align: 'center'
                }, {
                    field: 'carrCode',
                    title: '注册账号',
                    align: 'center'
                }, {
                    field: 'carrType',
                    title: '车队类型',
                    align: 'center',
                    formatter: function (value) {
                        return value == 3 ? '个体' : '企业';
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
                    field: 'pkCarrier',
                    title: '操作',
                    align: 'center',
                    formatter: function (value, row) {
                        var str = "<div id='" + value + "' checkStatus='"+row.checkStatus+"' carrType='"+row.carrType+
                            "' lockedFlag='"+row.lockedFlag+"'><a href='#' class='detail'>查看</a>";
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
            if (resp.success == 1) $("#fleet_owner_table").bootstrapTable('refresh');
        }
        var bindEvent = function () {
            $("#fleet_search").click(function () {
                $("#fleet_owner_table").bootstrapTable('refresh', {
                    query: {code: $("#fleet_text").val()}
                });
                $("#fleet_text").val("");
            })

            /* 表格事件绑定*/
            $("#fleet_owner_table").on('click', 'a', function () {
                var id = $(this).parent("div").attr("id");
                var url = null;
                if ($(this).hasClass("freeze")) {
                    /*冻结*/
                    url ="fleet/" + id + "/" + common.yesStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("thaw")) {
                    /*解冻*/
                    url ="fleet/" + id + "/" + common.noStatus;
                    common.ajaxfuncURL(url,"PUT",{},eventCallBack);
                } else if ($(this).hasClass("del")) {
                    // 删除
                    url = "fleet/" + id;
                    common.ajaxfuncURL(url,"DELETE",{},eventCallBack);
                } else if($(this).hasClass("detail")) {
                    var checkStatus = $(this).parent("div").attr("checkStatus");
                    var lockedFlag = $(this).parent("div").attr("lockedFlag");
                    var carrType =  $(this).parent("div").attr("carrType");
                    //查看
                    $("#fleet_table_div").hide();
                    requirejs(["module/userManage/fleet/detail"], function (list) {
                        list.load(id,checkStatus,lockedFlag,carrType);
                    });
                }
            })
        }
        var fleetObject = {};
        fleetObject.load = function () {
            initHtml();
            initTable();
            bindEvent();
        }
        return fleetObject;

    })

}).call(this)