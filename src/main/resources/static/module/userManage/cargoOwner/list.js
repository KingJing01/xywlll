/* 货主审核模块的 js  */
(function () {
    var HTML_PAGE = "module/userManage/cargoOwner/list.html";
    var DEMO_DATA = "data/data1.json";
    var LIST_DATA = "cargo_owner/get_list_data";
    define([
        'jquery',
        'text!' + HTML_PAGE,
        'json!' + DEMO_DATA
    ], function ($, pageHtml, jsonData) {
        //初始化界面
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }

        //初始化bootstrap table
        var initTable = function () {
            $('#cargo_owner_table').bootstrapTable({
                url:LIST_DATA,
                contentType: 'application/x-www-form-urlencoded',
                method: 'post',
                pageList: [10, 15, 20],
                pagination: true,
                locales: "zh-CN",
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
                    field: 'rowNum',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'custName',
                    title: '昵称',
                    align: 'center'
                }, {
                    field: 'custCode',
                    title: '注册账号',
                    align: 'center'
                }, {
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
                    field: 'checkStatus',
                    title: '状态',
                    align: 'center',
                    formatter: function (value) {
                        return value == 4 ? '冻结' : '正常';
                    }
                }, {
                    field: 'pkCustomer',
                    title: '操作',
                    align: 'center',
                    formatter: function (value) {
                        return "<div id='" + value + "'><a href='#' class='detail'>查看</a><a href='#' class='freeze audit_a'>冻结</a><a href='#' class='del audit_a'>删除</a></div>";
                    }
                }]
            });
        }
        //点击事件的绑定
        var bindEvent = function () {
            $("#cargo_search").click(function () {
                $("#cargo_owner_table").bootstrapTable('refresh', {
                    query: {custCode: $("#cargo_text").val()}
                });
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