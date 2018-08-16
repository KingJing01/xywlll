/* 司机模块审核的 js  */
(function () {
    var HTML_PAGE = "module/userManage/driver/driver.html";
    define([
        'jquery',
        'text!' + HTML_PAGE
    ], function ($, pageHtml) {
        var initHtml = function () {
            $("#page-wrapper").html(pageHtml);
        }


        var driverObject = {};
        driverObject.load = function () {
            initHtml();
        }
        return driverObject;

    })

}).call(this)