/* 调度装配 js */
(function () {
    var HTML_LIST = "module/dispatch/match/list.html";
    var JSON_DATA ="tms_system/public/httpEdi/Sto/loadData.do";
    define([
            'jquery',
            'text!' + HTML_LIST
        ], function ($, htmlList) {
            /*指定位置加载html界面*/
            var initDetailHtml = function () {
                $("#page-wrapper").html(htmlList);
            }
            var initTable = function () {
                $('#dispatch_match_table').bootstrapTable({
                    url: JSON_DATA,
                    contentType: 'application/x-www-form-urlencoded',
                    method: 'post',
                    pageList: [10, 15, 20],
                    pagination: true,
                    sidePagination: 'server',
                    pageSize: 10,
                    pageNumber: 1,
                    queryParams: function queryParams(params) {   //设置查询参数
                        var param = {
                            pageSize: this.pageSize,   //每页多少条数据
                            pageNumber: this.pageNumber, // 页码
                        };
                        return param;
                    },
                    responseHandler: function (res) {
                        return {
                            "total": res.total,
                            "rows": res.list
                        };
                    },
                    columns: [{
                        title: 'checked',
                        checkbox : true
                    },{
                        field: 'rowNum',
                        title: '序号',
                        align: 'center',
                        valign: 'middle'
                    }, {
                        field: 'custName',
                        title: '运段号',
                        align: 'center'
                    }, {
                        field: 'custCode',
                        title: '订单来源',
                        align: 'center'
                    }, {
                        field: 'custType',
                        title: '货物类型',
                        align: 'center',
                        formatter: function (value) {
                            return "货主";
                        }
                    }, {
                        field: 'checkStatus',
                        title: '件/重/体',
                        align: 'center',
                        formatter: function (value) {
                            return value == 2 ? '是' : '否';
                        }
                    }, {
                        field: 'createTime',
                        title: '运输类别',
                        align: 'center',
                    }, {
                        field: 'lockedFlag',
                        title: '提货',
                        align: 'center',
                        formatter: function (value) {
                            return value == 'Y' ? '冻结' : '正常';
                        }
                    },{
                        field: 'lockedFlag',
                        title: '到货',
                        align: 'center',
                        formatter: function (value) {
                            return value == 'Y' ? '冻结' : '正常';
                        }
                    }, {
                        field: 'pkCustomer',
                        title: '操作',
                        align: 'center',
                        formatter: function (value, row) {
                            var str = "<div id='" + value + "' checkStatus='" + row.checkStatus + "' lockedFlag='" + row.lockedFlag + "'><a href='#' class='detail'>查看</a>";
                            if (row.lockedFlag == 'Y') {
                                str += "<a href='#' class='thaw audit_a'>解冻</a>";
                            } else {
                                str += "<a href='#' class='freeze audit_a'>冻结</a>";
                            }
                            //return str + "<a href='#' class='del audit_a'>删除</a></div>";
                            return str + "</div>";
                        }
                    }]
                });
            }
            /* 事件绑定操作 */
            var bindEvent = function () {

            }

            var object = {};
            object.load = function () {
                initDetailHtml();
                initTable();
                bindEvent();
            }
            return object;
        }
    )
}).call(this)