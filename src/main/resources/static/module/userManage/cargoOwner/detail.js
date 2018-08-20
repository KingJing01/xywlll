(function () {
    var HTML_DETAIL = "module/userManage/cargoOwner/detail.html";
    define([
            'jquery',
            'vue',
            'text!' + HTML_DETAIL
        ], function ($,Vue, htmlDetail) {
            /*html加载*/
            var initDetailHtml = function () {
                $("#cargo_detail_div").html(htmlDetail);
                $("#cargo_detail_div").fadeIn("slow");
            }
            /*事件绑定*/
            var bindEvent = function () {
                /* 详情 返回 */
                $("#cargo_back").click(function () {
                    $("#cargo_detail_div").fadeOut("slow");
                    $("#cargo_owner_table").bootstrapTable('refresh');
                    $("#cargo_table_div").show();
                })
            }
            var initData = function () {
               new Vue({
                    el: '#cargo_base_info',
                    data:{
                        'login_no':'13512157125',
                        'login_name':'杨俊超',
                        'comp_name':'上海欣雅供应链管理有限公司',
                        'passwd':'123456',
                        'regist_date':'2018年7月8号 12:33:14'
                    }
                })
            }


            var cargoDetail = {};
            cargoDetail.load = function () {
                initDetailHtml();
                initData();
                bindEvent();
            }
            return cargoDetail;
        }
    )
}).call(this)