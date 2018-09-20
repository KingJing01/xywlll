/* 调度中心 处理订单模块 */
(function () {
    var HTML_DETAIL = "module/dispatch/match/handle/handle.html";
    var REASON_DATA = "tms_system/public/httpEdi/Sto/getReason.do";
    var HANDLE_SURE = "tms_system/public/httpEdi/Sto/handler.do";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var handleVue;
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#dispatch_match_modal_content").html(htmlDetail);
            }
            var initData = function (data) {
                handleVue = new Vue({
                    el: "#dispatch_match_handle_form",
                    data: {
                        order_resource: data,
                        reason: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL(REASON_DATA, "POST", {}, function (resp) {
                            _self.reason = resp.datas;
                        })
                    }
                })
            }
            var handelMethod = function () {
                document.getElementById("dispatch_match_handle_form").reset();
                $("#dispatch_match_modal").modal("hide");
            }
            /* 事件绑定操作 */
            var bindEvent = function (pk_segment) {
                $("#handle_cancel").click(function () {
                    handelMethod();
                })

                $("#handle_sure").click(function () {
                    var formData = $('#dispatch_match_handle_form').serialize();
                    var submitData = decodeURIComponent(formData, true);
                    var resp = common.formDataAnalyse(submitData);
                    resp.pk_segment = pk_segment;
                    common.ajaxfuncURL(HANDLE_SURE, "POST", resp, function (resp) {
                        if (resp.success == true) {
                            document.getElementById("dispatch_match_handle_form").reset();
                            $("#dispatch_match_modal").modal("hide");
                        }
                    })
                })
            }

            var object = {};
            object.load = function (pk_segment, data) {
                initDetailHtml();
                initData(data);
                bindEvent(pk_segment);
            }
            return object;
        }
    )
}).call(this)