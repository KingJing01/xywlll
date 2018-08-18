/* requirejs 业务操作的模板js */
(function () {
    var HTML_DETAIL = "";
    define([
            'jquery',
            'text!' + HTML_DETAIL
        ], function ($, htmlDetail) {




            var cargoDetail = {};
            cargoDetail.load = function () {

            }
            return cargoDetail;
        }
    )
}).call(this)