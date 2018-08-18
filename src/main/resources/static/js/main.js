/*require js 入口文件 */
(function () {
    /* 需要的js 文件引入 */
    define([
            "vendor/bootstrap/js/bootstrap.min",
            "vendor/bootstrap-table/bootstrap-table",
            "vendor/metisMenu/metisMenu",
            "vendor/vue/vue.min",
            "js/common",
            "js/admin",
            "vendor/bootstrap-table/bootstrap-table-zh-CN.min",
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
                /* 订单系统点击 */
                $("#order_system").on('click', function () {
                    requirejs(["module/eKanban/main"], function (list) {
                        list.load();
                    });
                });
                /* 车辆监控点击 */
                $("#vehicle_monitoring").on('click', function () {
                    requirejs(["module/beidou/map"], function (list) {
                        list.load();
                    });
                });

                /* 货主审核*/
                $("#host_audit").on('click', function () {
                    requirejs(["module/userManage/cargoOwner/list"], function (list) {
                        list.load();
                    });
                });

            };
            return mainFunction;
        });
}).call(this);