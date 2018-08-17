/* 货主审核模块的 js  */
(function () {
    var HTML_PAGE = "module/userManage/cargoOwner/list.html";
    var DEMO_DATA = "data/data1.json";
    define([
        'jquery',
        'text!' + HTML_PAGE,
        'json!' + DEMO_DATA
    ], function ($, pageHtml,jsonData) {
        //初始化界面
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }

        //初始化bootstrap table
        var initTable = function () {
            $('#cargo_owner_table').bootstrapTable({
                //data:jsonData,
                url:"cargo_owner/get_list_data",
                method: 'post',
                pageList:[10,15,20],
                pagination:true,
                locales: "zh-CN",
                sidePagination:'server',
                pageSize: 10,
                pageNumber: 1,
                responseHandler: function(resp){
                  var data={};
                  data.total = resp.total;
                  data.row = resp.list;
                  data.pageNumber = resp.pageNum;
                  return data;
                },
                queryParams:function queryParams(params) {   //设置查询参数
                    var param = {
                        pageSize: this.pageSize,   //每页多少条数据
                        pageNumber: this.pageNumber // 页码
                    };
                    return param;},
                columns: [{
                    field: 'rowNum',
                    title: '序号'
                }, {
                    field: 'custName',
                    title: '昵称'
                }, {
                    field: 'checkCode',
                    title: '注册账号'
                }, {
                    field: 'checkStatus',
                    title: '是否认证'
                }, {
                    field: 'createTime',
                    title: '注册时间'
                }, {
                    field: 'checkStatus',
                    title: '状态'
                }]
            });
        }


        var hostObject = {};
        hostObject.load = function () {
            initHtml();
            initTable();
        }
        return hostObject;
    })

}).call(this)