/* 调度装配 js */
(function () {
    var HTML_LIST = "module/dispatch/match/list.html";
    var JSON_DATA = "tms_system/public/httpEdi/Sto/loadData.do";
    var CANCEL_SECTION = "tms_system/public/httpEdi/Sto/cancelSplitSect.do";
    var CANCEL_AMOUNT = "tms_system/public/httpEdi/Sto/cancelSplitNum.do";
    var JSON_TRANS = "/xinyang/json/trans_type.json";
    var JSON_TRANS_STATUS = "/xinyang/json/trans_status.json";
    define([
            'jquery',
            'vue',
            'text!' + HTML_LIST,
            'json!' + JSON_TRANS,
            'json!' + JSON_TRANS_STATUS
        ], function ($, Vue, htmlList, transJson, transStatusJson) {
            var totalData;
            var searchData;
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#page-wrapper").html(htmlList);
            }
            var changeTotalData = function (num, weight, volume) {
                totalData._data.num = num;
                totalData._data.weight = weight;
                totalData._data.volume = volume;
            }
            var initComponent = function () {
                $("#deli_city").click(function (e) {
                    SelCity(this, e);
                });
                $("#arrival_city").click(function (e) {
                    SelCity(this, e);
                });

                $("#delivery_date").datetimepicker({
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    language: 'zh-CN'
                });
                $("#arrival_date").datetimepicker({
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    language: 'zh-CN'
                });
            }
            /*利用vue进行界面内容的渲染*/
            var initVueData = function () {
                totalData = new Vue({
                    el: '#dispatch_match_total',
                    data: {
                        num: 0,
                        weight: 0,
                        volume: 0
                    }
                });
                searchData = new Vue({
                    el: "#dispatch_match_search",
                    data: {
                        transData: transJson,
                        transStatus: transStatusJson,
                        goodsType: {},
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("tms_system/public/httpEdi/Sto/getGoodsType.do", "POST", {}, function (resp) {
                            _self.goodsType = resp.datas;
                        })
                        _self.$nextTick(function () {
                            initComponent();
                        })
                    },
                })
            }

            /*增加统计的数据*/
            var addTotalData = function (data) {
                length = data.length;
                var num = length > 1 ? 0 : totalData._data.num;
                var weight = length > 1 ? 0 : totalData._data.weight;
                var volumn = length > 1 ? 0 : totalData._data.volume;
                for (var j = 0; j < length; j++) {
                    num = parseFloat((num + data[j].num_count).toFixed(2));
                    weight = parseFloat((weight + data[j].weight_count).toFixed(2));
                    volumn = parseFloat((volumn + data[j].volume_count).toFixed(2));
                }
                changeTotalData(num, weight, volumn);
            }
            /*减少统计的数据*/
            var reduceTotalData = function (data) {
                length = data.length;
                var num = length > 1 ? 0 : totalData._data.num;
                var weight = length > 1 ? 0 : totalData._data.weight;
                var volumn = length > 1 ? 0 : totalData._data.volume;
                for (var k = 0; k < length; k++) {
                    num = parseFloat((num - data[k].num_count).toFixed(2));
                    weight = parseFloat((weight - data[k].weight_count).toFixed(2));
                    volumn = parseFloat((volumn - data[k].volume_count).toFixed(2));
                }
                changeTotalData(num, weight, volumn);
            };
            /*搜索数据*/
            var searchDataFun = function (number, size) {
                var formData = $('#dispatch_match_search').serialize();
                var submitData = decodeURIComponent(formData, true);
                var resp = common.formDataAnalyse(submitData);
                if (resp.weight_count_floor && resp.weight_count_top) {
                    resp.weight_count = resp.weight_count_floor + "," + resp.weight_count_top;
                } else if (resp.weight_count_floor && !resp.weight_count_top) {
                    resp.weight_count = resp.weight_count_floor + ",";
                } else if (!resp.weight_count_floor && resp.weight_count_top) {
                    resp.weight_count = "," + resp.weight_count_top;
                }
                if (resp.volume_count_floor && resp.volume_count_top) {
                    resp.volume_count = resp.volume_count_floor + "," + resp.volume_count_top;
                } else if (!resp.volume_count_floor && resp.volume_count_top) {
                    resp.volume_count = "," + resp.volume_count_top;
                } else if (resp.volume_count_floor && !resp.volume_count_top) {
                    resp.volume_count = resp.volume_count_floor + ",";
                }
                if (resp.deli_city_hproper) {
                    resp.deli_city = resp.deli_city_hproper;
                }
                if (resp.arrival_city_hproper) {
                    resp.arri_city = resp.arrival_city_hproper;
                }
                resp.pageSize = size + "";
                resp.pageNumber = number + "";
                return resp;
            }
            var initTable = function () {
                $('#dispatch_match_table').bootstrapTable({
                    url: JSON_DATA,
                    contentType: 'application/json',
                    method: 'post',
                    pageList: [10, 15, 20],
                    pagination: true,
                    locales: "zh-CN",
                    sidePagination: 'server',
                    pageSize: 10,
                    pageNumber: 1,
                    queryParams: function queryParams(params) {   //设置查询参数
                        var param = {
                            pageSize: this.pageSize + '',   //每页多少条数据
                            pageNumber: this.pageNumber + '' // 页码
                        };
                        return param;
                    },
                    responseHandler: function (res) {
                        changeTotalData(0, 0, 0);
                        return {
                            "total": res.totalRecords,
                            "rows": res.records
                        };
                    },
                    columns: [{
                        title: 'checked',
                        checkbox: true
                    }, {
                        field: 'num',
                        title: '序号',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var pageSize = $('#dispatch_match_table').bootstrapTable('getOptions').pageSize
                            var pageNumber = $('#dispatch_match_table').bootstrapTable('getOptions').pageNumber;
                            return pageSize * (pageNumber - 1) + index + 1;
                        }
                    }, {
                        field: 'vbillno',
                        title: '运段号',
                        align: 'center',
                        formatter: function (value, row) {
                            return "<a href='#' class='a_vbillno'>" + value + "</a>";
                        }
                    }, {
                        field: 'invoice_vbillno',
                        title: '发货单号',
                        align: 'center'
                    }, {
                        field: 'bill_origin',
                        title: '订单来源',
                        align: 'center'
                    }, {
                        field: 'goods_type',
                        title: '货物类型',
                        align: 'center'
                    }, {
                        field: 'num_weight_volume',
                        title: '件/重/体',
                        align: 'center',
                        formatter: function (value, row) {
                            return row.num_count + "件/" + row.weight_count * 1 + "吨/" + row.volume_count * 1 + "立方";
                        }
                    }, {
                        field: 'pk_trans_type',
                        title: '运输类别',
                        align: 'center'
                    }, {
                        field: 'deli',
                        title: '提货',
                        align: 'center',
                        formatter: function (value, row) {
                            return row.deli_province + row.deli_city + " \n " + row.req_deli_date;
                        }
                    }, {
                        field: 'arri',
                        title: '到货',
                        align: 'center',
                        formatter: function (value, row) {
                            return row.arri_province + row.arri_city + " \n " + row.req_arri_date;
                        }
                    }, {
                        field: 'seg_type',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row) {
                            //seg_type  0表示分段  1表示分量  2表示原始的
                            var str = "<div id='" + row.pk_segment + "'>";
                            if (value == '0') {
                                str += "<a href='#' class='a_action cancel_section'>取消拆段</a>";
                            } else if (value == '1') {
                                str += "<a href='#' class='a_action cancel_amount'>取消拆量</a>";
                            } else {
                                str += "<a href='#' class='a_action amount'>拆量</a><a href='#' class='a_action section'>拆段</a>"
                            }
                            return str + "</div>";
                        }
                    }],
                    onCheck: function (row) {
                        var arr = new Array();
                        arr[0] = row;
                        addTotalData(arr);
                    },
                    onUncheck: function (row) {
                        var arr = new Array();
                        arr[0] = row;
                        reduceTotalData(arr)
                    },
                    onCheckAll: function (rows) {
                        addTotalData(rows);
                    },
                    onUncheckAll: function () {
                        changeTotalData(0, 0, 0)
                    },
                    onPageChange: function (number, size) {
                        resp = searchDataFun(number, size);
                        $("#dispatch_match_table").bootstrapTable('refreshOptions', {
                            queryParams: resp
                        });
                    }
                });
            }

            /* 事件绑定操作 */
            var bindEvent = function () {
                /*搜索按钮的点击事件*/
                $("#dispatch_match_btn").click(function () {
                    size = $('#dispatch_match_table').bootstrapTable('getOptions').pageSize;
                    resp = searchDataFun(1, size);
                    $("#dispatch_match_table").bootstrapTable("refreshOptions", {pageNumber: 1, queryParams: resp});
                })
                /*重置按钮*/
                $("#dispatch_match_reset").click(function () {
                    document.getElementById("dispatch_match_search").reset();
                    $("#deli_city_hproper").val("");
                    $("#arrival_city_hproper").val("");
                    size = $('#dispatch_match_table').bootstrapTable('getOptions').pageSize;
                    resp = searchDataFun(1, size);
                    $("#dispatch_match_table").bootstrapTable("refreshOptions", {pageNumber: 1, queryParams: resp});
                })

                $("#dispatch_match_table").on('click', '.a_vbillno', function () {
                    $("#dispatch_match_div_list").hide();
                    $("#dispatch_match_div_detail").show();
                    requirejs(["module/dispatch/match/detail"], function (list) {
                        list.load();
                    });
                })
                //表单界面的刷新
                var eventCallBack = function (data) {
                    if (data.success == true) {
                        size = $('#dispatch_match_table').bootstrapTable('getOptions').pageSize;
                        resp = searchDataFun(1, size);
                        $("#dispatch_match_table").bootstrapTable("refreshOptions", {pageNumber: 1, queryParams: resp});
                    } else {
                        common.commonModalShow(data.msg);
                    }
                }

                /* 表格事件绑定*/
                $("#dispatch_match_table").on('click', 'a', function () {
                    var pk_segment = $(this).parent("div").attr("id");
                    if ($(this).hasClass("cancel_section")) {
                        /*取消拆段*/
                        common.ajaxfuncURL(CANCEL_SECTION, "POST", {pk_segment: pk_segment}, eventCallBack);
                    } else if ($(this).hasClass("cancel_amount")) {
                        /*取消拆量*/
                        common.ajaxfuncURL(CANCEL_AMOUNT, "POST", {pk_segment: pk_segment}, eventCallBack);
                    } else if ($(this).hasClass("section")) {
                        $("#dispatch_match_div_list").hide();
                        $("#dispatch_match_div_detail").show();
                        requirejs(["module/userManage/driver/detail"], function (list) {
                            list.load(id, checkStatus);
                        });
                    } else if ($(this).hasClass("amount")) {
                        //拆量
                        $("#dispatch_match_div_list").hide();
                        $("#dispatch_match_div_detail").show();
                        requirejs(["module/userManage/driver/detail"], function (list) {
                            list.load(id, checkStatus);
                        });
                    }
                })

            }

            var object = {};
            object.load = function () {
                initDetailHtml();
                initTable();
                initVueData();
                bindEvent();
            }
            return object;
        }
    )
}).call(this)