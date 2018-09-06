/*require js 入口文件 */
(function () {
    /* 需要的js 文件引入 */
    define([
            "vendor/bootstrap/js/bootstrap.min",
            "vendor/bootstrap-table/bootstrap-table",
            /* "vendor/bootstrap-table/bootstrap-table-zh-CN.min",*/
            "vendor/metisMenu/metisMenu",
            "vendor/jpush/jmessage-sdk-web.2.6.0.min",
            "js/common",
            "js/jpush",
            "js/admin"
        ],
        function () {
            $.ajaxSetup({
                type: 'POST',
                complete: function (xhr, status) {
                    var sessionStatus = xhr.getResponseHeader('sessionstatus');
                    if (sessionStatus == 'timeout') {
                        window.location.href = "loginout";
                    }
                }
            });

            /*获取图片服务器地址*/
            var loadImgUrl = function () {
                common.ajaxfuncURL("get_img_url", 'POST', {}, function (resp) {
                    window.imgUrl = resp.paramValue;
                });
            }

            mainFunction = function () {
                loadImgUrl();
                //默认加载电子看板的界面
                requirejs(["module/eKanban/main"], function (main) {
                    var currentMenu = sessionStorage.getItem("currentMenu");
                    currentMenu = (currentMenu ? currentMenu : "order_system");
                    if (currentMenu == "order_system") {
                        main.load();
                    } else {
                        $("#" + currentMenu).click();
                    }
                });
                /* 订单系统点击 */
                $("#order_system").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/eKanban/main"], function (list) {
                        list.load();
                    });
                });
                /* 车辆监控点击 */
                $("#vehicle_monitoring").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/beidou/map"], function (list) {
                        list.load();
                    });
                });

                /* 货主审核*/
                $("#host_audit").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/userManage/cargoOwner/list"], function (list) {
                        list.load();
                    });
                });

                /* 司机审核*/
                $("#driver_audit").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/userManage/driver/list"], function (list) {
                        list.load();
                    });
                });
                /* 车队审核*/
                $("#fleet_audit").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/userManage/fleet/list"], function (list) {
                        list.load();
                    });
                });
                /* 调度载配*/
                $("#dispatch_match").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/dispatch/match/list"], function (list) {
                        list.load();
                    });
                });

                $("#login_out").on('click', function () {
                    sessionStorage.setItem("currentMenu","");
                    window.location.href="loginout";
                });

                jpush.JimInit();
            };
            return mainFunction;
        });
}).call(this);