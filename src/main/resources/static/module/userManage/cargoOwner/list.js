/* 货主审核模块的 js  */
(function () {
    var HTML_PAGE = "module/userManage/cargoOwner/list.html";
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
                data: ,
                columns: [{
                    field: 'id',
                    title: 'Item ID'
                }, {
                    field: 'name',
                    title: 'Item Name'
                }, {
                    field: 'price',
                    title: 'Item Price'
                }, ]
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