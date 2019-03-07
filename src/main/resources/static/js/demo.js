/* requirejs 业务操作的模板js */
(function () {
    var HTML_DETAIL = "";
    define([
            'jquery',
            'text!' + HTML_DETAIL
        ], function ($, htmlDetail) {
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("XX").html(htmlDetail);
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