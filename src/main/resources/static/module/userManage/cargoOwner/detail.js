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
            }
            /*事件绑定*/
            var bindEvent = function (pkCustomer) {
                /* 详情 返回 */
                $("#cargo_back").click(function () {
                    $("#cargo_detail_div").hide();
                    $("#cargo_owner_table").bootstrapTable('refresh');
                    $("#cargo_table_div").show();
                })
            }
            var initData = function (pkCustomer) {
                baseInfoVue = new Vue({
                    el: '#cargo_base_info',
                    data: {
                        resp: {
                            'cust_code': '13512157125',
                            'cust_name': '杨俊超',
                            'corp_name': '上海欣雅供应链管理有限公司',
                            'passwd': '********',
                            'create_time': '2018年7月8号 12:33:14'
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