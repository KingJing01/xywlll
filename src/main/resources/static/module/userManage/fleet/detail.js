(function () {
    var HTML_DETAIL = "module/userManage/fleet/detail.html";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var infoVue;
            /*html加载*/
            var initDetailHtml = function () {
                $("#fleet_detail_div").html(htmlDetail);
                $("#fleet_detail_div").fadeIn("slow");
                $('#myModal').modal({show: false});
            }
            /*查看界面的操作的回调*/
            var actCallBack = function (resp, but) {
                resp.success == 0 ? $("#check_error").show() : $("#check_success").show();
                $("#fleet_message").text(resp.message);
                $('#myModal').modal('show');
                $(but.siblings()).attr('disabled', "true");
                but.attr('disabled', "true");
                $("#textarea_audit_reject").val("");

            }
            /*事件绑定*/
            var bindEvent = function (pkCarrier,carrType) {
                /* 详情 返回 */
                $("#fleet_back").click(function () {
                    $("#fleet_detail_div").hide();
                    $("#fleet_owner_table").bootstrapTable('refresh');
                    $("#fleet_table_div").show();
                })

                /*冻结*/
                $("#fleet_frozen").click(function () {
                    var url = "fleet/" + pkCarrier + "/" + common.yesStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*解冻*/
                $("#fleet_thaw").click(function () {
                    var url = "fleet/" + pkCarrier + "/" + common.noStatus;
                    common.ajaxfuncURL(url, "PUT", {}, actCallBack, $(this));
                })
                /*删除*/
                $("#fleet_delete").click(function () {
                    var url = "fleet_owner/" + pkCarrier;
                    common.ajaxfuncURL(url, "DELETE", {}, actCallBack, $(this));
                })
                /*审核通过*/
                $("#fleet_audit_sure,#fleet_audit_person_sure").click(function () {
                    var url = "fleet/fleet_audit/" + pkCarrier+"/"+carrType;
                    common.ajaxfuncURL(url, "POST", {}, actCallBack, $(this));
                })
                /*审核驳回*/
                $("#fleet_audit_reject,#fleet_audit_person_reject").click(function () {
                    $('#model_audit_reject').modal('show');
                });
                $("#btn_audit_reject").click(function () {
                    var reason = $("#textarea_audit_reject").val();
                    if (!reason) {
                        $(".audit_reject_span").show();
                        return false;
                    }
                    $('#model_audit_reject').modal('hide');
                    var url = "fleet/fleet_reject/" + pkCarrier;
                    common.ajaxfuncURL(url, "POST", {reason: reason}, actCallBack, $("#fleet_audit_reject,#fleet_audit_person_reject"));
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
            var initData = function (pkCarrier, checkStatus, lockedFlag, carrType) {
                /* 信息的展示 */
                infoVue = new Vue({
                    el: "#fleet_div",
                    data: {
                        flag: (carrType == 3 ? true : false),
                        resp: {},
                        corp: {}
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("fleet/fleetInfo/" + pkCarrier + "/" + carrType, "POST", {}, function (resp) {
                            var data = resp.data;
                            if (data) {
                                data.lockedFlag = (lockedFlag == 'Y' ? true : false);
                                data.checkStatus = (checkStatus == 2 ? false : true);
                                data.id_card_pos = (data.id_card_pos ? window.imgUrl + data.id_card_pos : common.noImage);
                                data.id_card_eng = (data.id_card_eng ? window.imgUrl + data.id_card_eng : common.noImage);
                                data.road_trans_license = (data.road_trans_license ? window.imgUrl + data.road_trans_license : common.noImage);
                                if (carrType == 3) {
                                    data.driving_licence = (data.driving_licence ? window.imgUrl + data.driving_licence : common.noImage);
                                    data.driver_licence = (data.driver_licence ? window.imgUrl + data.driver_licence : common.noImage);
                                    _self.resp = data;
                                } else {
                                    data.business_license = (data.business_license ? window.imgUrl + data.business_license : common.noImage);
                                    data.road_trans_license = (data.road_trans_license ? window.imgUrl + data.road_trans_license : common.noImage);
                                    _self.corp = data;
                                }
                            }
                        })
                    }
                })
            }

            var fleetDetail = {};
            fleetDetail.load = function (pkCarrier, checkStatus, lockedFlag, carrType) {
                initDetailHtml();
                initData(pkCarrier, checkStatus, lockedFlag, carrType);
                bindEvent(pkCarrier,carrType);
            }
            return fleetDetail;
        }
    )
}).call(this)