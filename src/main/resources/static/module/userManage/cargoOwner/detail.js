(function () {
    var HTML_DETAIL = "module/userManage/cargoOwner/detail.html";
    define([
            'jquery',
            'text!' + HTML_DETAIL
        ], function ($, htmlDetail) {
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


            var cargoDetail = {};
            cargoDetail.load = function () {
                initDetailHtml();
                bindEvent();
            }
            return cargoDetail;
        }
    )
}).call(this)