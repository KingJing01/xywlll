/*require js 入口文件 */
(function () {
    /* 需要的js 文件引入 */
    define([
            "vendor/bootstrap/js/bootstrap.min",
            "vendor/bootstrap-table/bootstrap-table.min",
            "vendor/bootstrap-datepicker/bootstrap-datetimepicker.min",
            "vendor/bootstrap-validator/bootstrapValidator.min",
            "vendor/metisMenu/metisMenu",
            "vendor/jpush/jmessage-sdk-web.2.6.0.min",
            "vendor/citypicker/cityJson",
            "vendor/citypicker/citySet",
            "vendor/citypicker/Popt",
            "vendor/jquery_raty/jquery.raty",
            "vendor/jquery_resize/jquery_resize_event.js",
            "js/common",
            "js/jpush",
            "js/admin",
            "js/plugins"
        ],
        function () {
            $.ajaxSetup({
                complete: function (xhr, status) {
                    if (xhr.status == 403) {
                        sessionStorage.setItem("userCode","");
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

                /*北斗新增功能模块*/
                /* 车辆信息*/
                $("#cars_info").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/beidou/carsInfo/list"], function (list) {
                        list.load();
                    });
                });
                //停车信息
                $("#park_info").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/beidou/parkInfo/list"], function (list) {
                        list.load();
                    });
                });
                //运行状态
                $("#running_info").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/beidou/runningInfo/list"], function (list) {
                        list.load();
                    });
                });
                // 行程信息
                $("#vehicle_info").on('click', function () {
                    sessionStorage.setItem("currentMenu", $(this).attr("id"));
                    requirejs(["module/beidou/vechicelInfo/list"], function (list) {
                        list.load();
                    });
                });

                $("#login_out").on('click', function () {
                    sessionStorage.setItem("currentMenu", "");
                    sessionStorage.setItem("userCode", "");
                    window.location.href = "loginout";
                });
                $('#side-menu').metisMenu({toggle: false});

                $("#page-wrapper").resize(function () {
                    var height = $(this).height();
                    $("#nav_div").css("height", height);
                })

                jpush.JimInit();
            };
            return mainFunction;
        });
}).call(this);