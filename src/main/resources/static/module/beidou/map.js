(function () {
    var PAGE_HTML = "module/beidou/map.html";
    define([
            'jquery',
            'text!' + PAGE_HTML
        ], function ($, pageHtml) {
          //  var gpsData = null;
            var initHtml = function () {
                $("#page-wrapper").html(pageHtml);
            };

            // init baidu  map
            var initMap = function () {
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398, 39.897445);
                map.centerAndZoom(point, 12);
                map.enableScrollWheelZoom(true);
                common.initContainer("#allmap");
                getVechicelData(map, "allmap");
            };

            //get all car gps data
            var getVechicelData = function (map, mapDiv) {
                $.post("beidou/get_vechicel_gps_all", function (resp) {
                    gpsData = resp.Data;
                    common.addMarkersBeidou(map, gpsData, mapDiv)
                }, 'json')
            };

            //init table   for vechicel data
            var initTable = function () {
                    $('#car_data').bootstrapTable({
                        url: 'beidou/get_vechicel_data_all',
                        method: 'post',
                        pageNumber:1,
                        pageSize:5,
                        pagination: true,
                        sidePagination: 'server',
                        queryParams:function(params){
                            var temp={};
                            temp.page=this.pageNumber;
                            temp.size=this.pageSize;
                            return temp;
                        },
                        columns: [ {
                            field: 'SystemNo',
                            title: '司机手机号',
                            align:'center',
                            width: 150
                        }, {
                            field: 'VehNof',
                            title: '车牌号',
                            align:'center',
                            width: 120
                        }],
                        onClickCell:function(field,value,row){
                                $.post("beidou/get_vechiecl_data_by_no", {deviceNo: row.SystemNo}, function (resp) {
                                    common.addMarkerBeiDou(resp, 'allmap');
                                }, 'json');
                        }
                    });


            }
            var vechicel = {};
            vechicel.load = function () {
                initHtml();
                initMap();
                initTable();
                common.changeDivHeight("#allmap");
            }
            return vechicel;
        }
    )
}).call(this)


