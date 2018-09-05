/* 调度装配 js */
(function () {
    var HTML_LIST = "module/dispatch/match/list.html";
    define([
            'jquery',
            'text!' + HTML_LIST
        ], function ($, htmllist) {
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#page-wrapper").html(htmllist);
            }
            /* 事件绑定操作 */
            var bindEvent = function () {

            }

            var object = {};
            object.load = function () {
                initDetailHtml();
                bindEvent();
            }
            return object;
        }
    )
}).call(this)