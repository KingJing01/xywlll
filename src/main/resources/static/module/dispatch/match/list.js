/* 调度装配 js */
(function () {
    var HTML_LIST = "module/dispatch/match/list.html";
    var JSON_DATA = "tms_system/public/httpEdi/Sto/loadData.do";
    define([
            'jquery',
            'vue',
            'text!' + HTML_LIST
        ], function ($, Vue, htmlList) {
            var totalData;
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#page-wrapper").html(htmlList);
            }
            var changeTotalData = function (num, weight, volume) {
                totalData._data.num = num;
                totalData._data.weight = weight;
                totalData._data.volume = volume;
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
            }

            var initComponent = function () {
                $("#deli_city").click(function (e) {
                    SelCity(this, e);
                });
                $("#arrival_city").click(function (e) {
                    SelCity(this, e);
                });

                $("#delivery_date").datetimepicker({
                    /*language:"zh-CN"*/
                });
                $("#arrival_date").datetimepicker({
                   /* language:"zh-CN"*/
                });
            }
            /*增加统计的数据*/
            var addTotalData = function (data) {
                length = data.length;
                var num = length > 1 ? 0 : totalData._data.num;
                var weight = length > 1 ? 0 : totalData._data.weight;
                var volumn = length > 1 ? 0 : totalData._data.volume;
                for (var j = 0; j < length; j++) {
                    var arr = data[j].num_weight_volume.split(",");
                    num = num + Number(arr[0]);
                    weight = weight + Number(arr[1]);
                    volumn = volumn + Number(arr[2]);
                }
                changeTotalData(num, weight, volumn);
            }
            /*减少统计的数据*/
            var reduceTotalData = function (data) {
                length = data.length;
                var num = length > 1 ? 0 : totalData._data.num;
                var weight = length > 1 ? 0 : totalData._data.weight;
                var volumn = length > 1 ? 0 : totalData._data.volume;
                for (var  k= 0; k < length; k++) {
                    var arr = data[k].num_weight_volume.split(",");
                    num = num - Number(arr[0]);
                    weight = weight - Number(arr[1]);
                    volumn = volumn - Number(arr[2]);
                }
                changeTotalData(num, weight, volumn);
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
                            pageSize: this.pageSize+'',   //每页多少条数据
                            pageNumber: this.pageNumber+'', // 页码
                        };
                        return param;
                    },
                    responseHandler: function (res) {
                         return {
                              "total": 128,
                              "rows": res.datas
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
                        formatter: function (value) {
                            var arr = new Array();
                            arr = value.split(",");
                            return arr[0] + "件/" + arr[1] * 1 + "吨/" + arr[2] * 1 + "立方";
                        }
                    }, {
                        field: 'pk_trans_type',
                        title: '运输类别',
                        align: 'center'
                    }, {
                        field: 'deli',
                        title: '提货',
                        align: 'center',
                        formatter: function (value) {
                            return value.replace(",", " \n ");
                        }
                    }, {
                        field: 'arri',
                        title: '到货',
                        align: 'center',
                        formatter: function (value) {
                            return value.replace(",", " \n ");
                        }
                    }, {
                        field: 'pkCustomer',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row) {
                            var str = "<div id='" + value + "'><a href='#' class='detail'>查看</a><a href='#' class='thaw audit_a'>放弃订单</a>";
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
                    }
                });
            }
            /* 事件绑定操作 */
            var bindEvent = function () {

            }

            var object = {};
            object.load = function () {
                initDetailHtml();
                initComponent();
                initTable();
                initVueData();
                bindEvent();
            }
            return object;
        }
    )
}).call(this)