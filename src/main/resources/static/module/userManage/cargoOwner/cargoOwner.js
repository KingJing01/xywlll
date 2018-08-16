/* 货主审核模块的 js  */
(function () {
    var HTML_PAGE="module/userManage/cargoOwner/cargoOwner.html";
    define([
        'jquery',
        'text!'+ HTML_PAGE
    ],function ($,pageHtml) {
       var initHtml = function () {
           $("#page-wrapper").html(pageHtml);
       }
     var hostObj ={};
     hostObj.load(function () {
         initHtml();
     })

    })

}).call(this)