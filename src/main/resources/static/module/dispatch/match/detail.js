/* 订单详情 */
(function () {
    var HTML_DETAIL = "module/dispatch/match/detail.html";
    define([
            'jquery',
            'text!' + HTML_DETAIL
        ], function ($, htmlDetail) {
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#dispatch_match_div_detail").html(htmlDetail);
            }
            /* 事件绑定操作 */
            var bindEvent = function () {
                $(".dispatch_match_back").click(function () {
                    $("#dispatch_match_div_detail").hide();
                    $("#dispatch_match_div_list").show();
                })
            }

            var initCompoment = function () {
                $('#carrier_raty').raty({
                    readOnly: true,
                    score: 3,
                    starHalf   : 'images/star-half.png',
                    starOff    : 'images/star-off.png',
                    starOn     : 'images/star-on.png'});
            }
            var object = {};
            object.load = function () {
                initDetailHtml();
                bindEvent();
                initCompoment();
            }
            return object;
        }
    )
}).call(this)