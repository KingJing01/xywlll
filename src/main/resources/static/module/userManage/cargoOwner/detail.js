(function () {
    var HTML_DETAIL = "module/userManage/cargoOwner/detail.html";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var baseInfoVue;//
            var corpInfoVue;
            /*html加载*/
            var initDetailHtml = function () {
                $("#cargo_detail_div").html(htmlDetail);
                $("#cargo_detail_div").fadeIn("slow");
                $('#myModal').modal({show: false});
            }
            /*查看界面的操作的回调*/
            var actCallBack = function (resp, but) {
                resp.success == 0 ? $("#check_error").show() : $("#check_success").show();
                $("#cargo_message").text(resp.message);
                $('#myModal').modal('show');
                $(but.siblings()).attr('disabled', "true");
                but.attr('disabled', "true");
                $("#textarea_audit_reject").val("");

            }
            /*事件绑定*/
            var bindEvent = function (pkCustomer) {
                /* 详情 返回 */
                $("#cargo_back").click(function () {
                    $("#cargo_detail_div").hide();
                    $("#cargo_owner_table").bootstrapTable('refresh');
                    $("#cargo_table_div").show();
                })

                /*冻结*/
                $("#cargo_frozen").click(function () {
                    var url = "cargo_owner/" + pkCustomer + "/" + common.yesStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*解冻*/
                $("#cargo_thaw").click(function () {
                    var url = "cargo_owner/" + pkCustomer + "/" + common.noStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*删除*/
                $("#cargo_delete").click(function () {
                    var url = "cargo_owner/" + pkCustomer;
                    common.ajaxfuncURL(url, "DELETE", {}, actCallBack, $(this));
                })
                /*审核通过*/
                $("#cargo_audit_sure").click(function () {
                    var url = "cargo_owner/cargo_audit/" + pkCustomer;
                    common.ajaxfuncURL(url, "POST", {}, actCallBack, $(this));
                })
                /*审核驳回*/
                $("#cargo_audit_reject").click(function () {
                    $('#model_audit_reject').modal('show');
                });
                $("#btn_audit_reject").click(function () {
                    var reason = $("#textarea_audit_reject").val();
                    if (!reason) {
                        $(".audit_reject_span").show();
                        return false;
                    }
                    $('#model_audit_reject').modal('hide');
                    var url = "cargo_owner/cargo_audit_reject/" + pkCustomer;
                    common.ajaxfuncURL(url, "POST", {reason: reason}, actCallBack, $("#cargo_audit_reject"));
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
            var initData = function (pkCustomer, checkStatus, lockedFlag) {
                /*基础信息的vue对象*/
                baseInfoVue = new Vue({
                    el: '#cargo_base_info',
                    data: {
                        resp: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("cargo_owner/cargeinfo/" + pkCustomer, "POST", {}, function (resp) {
                            var data = resp.data;
                            data.photo = (data.photo ? window.imgUrl + data.photo : common.noHeadPortrait);
                            data.lockedFlag = (lockedFlag == 'Y' ? true : false);
                            _self.resp = data;
                        })
                    }
                });
                /* 公司信息的vue对象*/
                corpInfoVue = new Vue({
                    el: '#cargo_corp_info',
                    data: {
                        corp: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("cargo_owner/cargecorpinfo/" + pkCustomer, "POST", {}, function (resp) {
                            var data = resp.data;
                            if (data) {
                                data.photo = (data.photo ? window.imgUrl + data.photo : common.noHeadPortrait);
                                data.relation_license = (data.relation_license ? window.imgUrl + data.relation_license : common.noImage);
                                data.id_card_neg = (data.id_card_neg ? window.imgUrl + data.id_card_neg : common.noImage);
                                data.id_card_pos = (data.id_card_pos ? window.imgUrl + data.id_card_pos : common.noImage);
                                data.business_license = (data.business_license ? window.imgUrl + data.business_license : common.noImage);
                                data.checkStatus = (checkStatus == 2 ? false : true);
                                _self.corp = data;
                            }
                        })
                    }
                });
            }

            var cargoDetail = {};
            cargoDetail.load = function (pkCustomer, checkStatus, lockedFlag) {
                initDetailHtml();
                initData(pkCustomer, checkStatus, lockedFlag);
                bindEvent(pkCustomer);
            }
            return cargoDetail;
        }
    )
}).call(this)