/* 调度装配 js */
(function () {
    var HTML_LIST = "module/dispatch/match/list.html";
    var JSON_DATA = "tms_system/public/httpEdi/Sto/loadData.do";
    var JSON_TRANS ="/xinyang/json/trans_type.json";
    var JSON_TRANS_STATUS ="/xinyang/json/trans_status.json";
    define([
            'jquery',
            'vue',
            'text!' + HTML_LIST,
            'json!' + JSON_TRANS,
             'json!'+ JSON_TRANS_STATUS
        ], function ($, Vue, htmlList,transJson,transStatusJson) {
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
                searchData = new Vue ({
                    el:"#dispatch_match_search",
                    data:{
                        transData:transJson,
                        transStatus:transStatusJson,
                        goodsType:{},
                    },
                    mounted: function () {
                        var _self = this;
                        common.ajaxfuncURL("tms_system/public/httpEdi/Sto/getGoodsType.do", "POST", {}, function (resp) {
                            _self.goodsType = resp.datas;
                        })
                    }
                })
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
                    language: 'zh-CN',
                    value:new Date()
                });
                $("#arrival_date").datetimepicker({
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    language: 'zh-CN'
                });
            }
            /*增加统计的数据*/
            var addTotalData = function (data) {
                length = data.length;
                var num = length > 1 ? 0 : totalData._data.num;
                var weight = length > 1 ? 0 : totalData._data.weight;
                var volumn = length > 1 ? 0 : totalData._data.volume;
                for (var j = 0; j < length; j++) {
                    num = (num*100 + data[j].num_count*100)/100;
                    weight = (weight*100 + data[j].weight_count*100)/100;
                    volumn = (volumn*100 + data[j].volume_count*100)/100;
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
                    num = (num*100 - data[k].num_count*100)/100;
                    weight = (weight*100 - data[k].weight_count*100)/100;
                    volumn = (volumn*100 - data[k].volume_count*100)/100;
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
                        formatter: function (value,row) {
                            return row.num_count + "件/" +row.weight_count * 1 + "吨/" + row.volume_count * 1 + "立方";
                        }
                    }, {
                        field: 'pk_trans_type',
                        title: '运输类别',
                        align: 'center'
                    }, {
                        field: 'deli',
                        title: '提货',
                        align: 'center',
                        formatter: function (value,row) {
                            return row.deli_city+" \n "+row.req_deli_date;
                        }
                    }, {
                        field: 'arri',
                        title: '到货',
                        align: 'center',
                        formatter: function (value,row) {
                            return row.arri_city+" \n "+row.req_arri_date;
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