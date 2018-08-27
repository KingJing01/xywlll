(function () {
    var HTML_DETAIL = "module/userManage/driver/detail.html";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var infoVue;
            /*html加载*/
            var initDetailHtml = function () {
                $("#driver_detail_div").html(htmlDetail);
                $("#driver_detail_div").fadeIn("slow");
                $('#myModal').modal({show: false});
            }
            /*查看界面的操作的回调*/
            var actCallBack = function (resp, but) {
                resp.success = 0 ? $("#check_error").show() : $("#check_success").show();
                $("#driver_message").text(resp.message);
                $('#myModal').modal('show');
                $(but.siblings()).attr('disabled', "true");
                but.attr('disabled', "true");
                $("#textarea_audit_reject").val("");

            }
            /*事件绑定*/
            var bindEvent = function (pkDriver) {
                /* 详情 返回 */
                $("#driver_back").click(function () {
                    $("#driver_detail_div").hide();
                    $("#driver_owner_table").bootstrapTable('refresh');
                    $("#driver_table_div").show();
                })

                /*冻结*/
                $("#driver_frozen").click(function () {
                    var url = "driver/" + pkDriver + "/" + common.yesStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*解冻*/
                $("#driver_thaw").click(function () {
                    var url = "driver/" + pkDriver + "/" + common.noStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*删除*/
                $("#driver_delete").click(function () {
                    var url = "driver_owner/" + pkDriver;
                    common.ajaxfuncURL(url, "DELETE", {}, actCallBack, $(this));
                })
                /*审核通过*/
                $("#driver_audit_sure").click(function () {
                    var url = "driver/driver_audit/" + pkDriver;
                    common.ajaxfuncURL(url, "POST", {}, actCallBack, $(this));
                })
                /*审核驳回*/
                $("#driver_audit_reject").click(function () {
                    $('#model_audit_reject').modal('show');
                });
                $("#btn_audit_reject").click(function () {
                    var reason = $("#textarea_audit_reject").val();
                    if (!reason) {
                        $(".audit_reject_span").show();
                        return false;
                    }
                    $('#model_audit_reject').modal('hide');
                    var url = "driver/driver_reject/" + pkDriver;
                    common.ajaxfuncURL(url, "POST", {reason: reason}, actCallBack, $("#driver_audit_reject"));
                })
                $(".img_horizontal,.img_vertical").click(function () {
                    var className = $(this).prop("className");
                    var source = $(this).attr("src");
                    if (source != common.noImage && source != common.noHeadPortrait) {
                        $("#img_show").attr("src", source);
                        if (className == "img_horizontal") {
                            $("#img_show").attr("class", "modal_img_horizontal");
                        } else {
                            $("#img_show").attr("class", "modal_img_vertical");
                        }
                        $("#ShowImage_Form").modal();
                    }
                })
            }
            /* 数据初始化 */
            var initData = function (pkDriver, checkStatus, lockedFlag) {
                /* 信息的展示 */
                infoVue = new Vue({
                    el: "#driver_div",
                    data: {
                        resp: {},
                        corp: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("driver/driverInfo/" + pkDriver + "/" + carrType, "POST", {}, function (resp) {
                            var data = resp.data;
                            if (data) {
                                data.lockedFlag = (lockedFlag == 'Y' ? true : false);
                                data.checkStatus = (checkStatus == 2 ? false : true);
                                data.id_card_pos = (data.id_card_pos ? window.imgUrl + data.id_card_pos : common.noImage);
                                data.business_license = (data.business_license ? window.imgUrl + data.business_license : common.noImage);
                                data.road_trans_license = (data.road_trans_license ? window.imgUrl + data.road_trans_license : common.noImage);
                                _self.corp = data;
                            }
                        })
                    }
                })
            }

            var driverDetail = {};
            driverDetail.load = function (pkDriver, checkStatus, lockedFlag) {
                initDetailHtml();
                initData(pkDriver, checkStatus, lockedFlag);
                bindEvent(pkDriver);
            }
            return driverDetail;
        }
    )
}).call(this)