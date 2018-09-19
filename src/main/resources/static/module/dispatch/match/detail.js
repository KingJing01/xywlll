/* 订单详情 */
(function () {
    var HTML_DETAIL = "module/dispatch/match/detail.html";
    var JSON_DETAIL = "tms_system/public/httpEdi/Sto/stoDetail.do";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var detailInfoVue;//
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

            var initCompoment = function (pk_segment, user_code) {

                detailInfoVue = new Vue({
                    el: '#dispatch_match_order_detail',
                    data: {
                        detail: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL(JSON_DETAIL, "POST", {
                            pk_segment: pk_segment,
                            user_code: user_code
                        }, function (resp) {
                            var data = resp.data;
                            $('#carrier_raty').raty({
                                readOnly: true,
                                score: data.score,
                                starHalf: 'images/star-half.png',
                                starOff: 'images/star-off.png',
                                starOn: 'images/star-on.png'
                            });
                            _self.detail = data;
                        })
                    }
                })

            }
            var object = {};
            object.load = function (pk_segment, user_code) {
                initDetailHtml();
                bindEvent();
                initCompoment(pk_segment, user_code);
            }
            return object;
        }
    )
}).call(this)