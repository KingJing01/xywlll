/*require js 入口文件 */
(function () {
    /* 需要的js 文件引入 */
    define([
        "vendor/bootstrap/js/bootstrap.min",
        "js/common"

        ],
        function () {

            /**判断session是否失效，如失效则跳转到登录界面**/
            $.ajaxSetup({
                complete: function (data, TS) {
                    /*common.isSessionFail(data);*/
                }
            });

            mainFunction = function () {
                //默认加载电子看板的界面
               requirejs(["module/eKanban/main"], function (main) {
                   main.load();
                });
               /* $("#btn_march_out").on('click', function () {
                    requirejs(["modules/salemarket/marchout/list"], function (list) {
                        list.load();
                    });
                });
                */
            };
            return mainFunction;
        });
}).call(this);