(function () {
    var HTML_DETAIL = "module/userManage/cargoOwner/detail.html";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($, Vue, htmlDetail) {
            var baseInfoVue;//
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
            var initData = function (pkCustomer) {
                baseInfoVue = new Vue({
                    el: '#cargo_base_info',
                    data: {
                        resp: {
                            'cust_code': '',
                            'cust_name': '',
                            'corp_name': '',
                            'passwd': '********',
                            'create_time': ''
                        }
                    },
                    mounted: function () {
                        var _self = this ;
                        common.ajaxfuncURL("cargo_owner/cargeinfo/" + pkCustomer, "POST", {}, function (resp) {
                            _self.resp = resp.obejct;
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