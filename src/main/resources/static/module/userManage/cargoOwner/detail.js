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
                $('#myModal').modal({
                    show:false
                });
            }
            /*查看界面的操作的回调*/
            var actCallBack  = function (resp,but) {
                var actionVue = new Vue({
                    el:"#cargo_model",
                    data:{
                        'message':'action succss!'
                    }
                })
                $('#myModal').modal('show');
                but.attr('disabled',"true");

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
                   var url ="cargo_owner/" + pkCustomer + "/" + common.yesStatus;
                    common.ajaxfuncURL(url,"PUT",{},actCallBack,$(this));
                })
                /*删除*/
                $("#cargo_delete").click(function () {
                   var url = "cargo_owner/" + pkCustomer;
                    common.ajaxfuncURL(url,"DELETE",{},actCallBack,$(this));
                })
                /*审核通过*/
                $("#cargo_audit_sure").click(function () {

                })
                /*审核驳回*/
                $("#cargo_audit_reject").click(function () {

                })
            }
            /* 数据初始化 */
            var initData = function (pkCustomer) {
                /*基础信息的vue对象*/
                baseInfoVue = new Vue({
                    el: '#cargo_base_info',
                    data: {
                        resp: {}
                    },
                    mounted: function () {
                        var _self = this ;
                        common.ajaxfuncURL("cargo_owner/cargeinfo/" + pkCustomer, "POST", {}, function (resp) {
                            var data = resp.data;
                            data.customer_picture = (data.customer_picture?window.imgUrl+data.customer_picture:common.noHeadPortrait);
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
                        var _self = this ;
                        common.ajaxfuncURL("cargo_owner/cargecorpinfo/" + pkCustomer, "POST", {}, function (resp) {
                            var data = resp.data;
                            data.customer_picture = (data.customer_picture?window.imgUrl+data.customer_picture:common.noHeadPortrait);
                            data.relation_license = (data.relation_license?window.imgUrl+data.relation_license:common.noImage);
                            data.id_card_neg = (data.id_card_neg?window.imgUrl+data.id_card_neg:common.noImage);
                            data.id_card_pos = (data.id_card_pos?window.imgUrl+data.id_card_pos:common.noImage);
                            data.business_license = (data.business_license?window.imgUrl+data.business_license:common.noImage);
                            _self.corp = data;

                        })
                    }
                });
            }

            var cargoDetail = {};
            cargoDetail.load = function (pkCustomer) {
                initDetailHtml();
                initData(pkCustomer);
                bindEvent(pkCustomer);
            }
            return cargoDetail;
        }
    )
}).call(this)