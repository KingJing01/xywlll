(function () {

    var gpsData = null;
    // init baidu  map
    initMap = function () {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        common.initContainer("#allmap");
        getVechicelData(map, "allmap");
    }

    //get all car gps data
    getVechicelData = function (map, mapDiv) {
        $.post("beidou/get_vechicel_gps_all", function (resp) {
            gpsData = resp.Data;
            common.addMarkersBeidou(map, gpsData, mapDiv)
        }, 'json')
    }

    //init table   for vechicel data
    initTable = function () {
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem: '#car_data',
                url: 'beidou/get_vechicel_data_all',
                limit: 5,
                method: 'Post',
                width: '273',
                page: false,
                cols: [[ //表头
                    {field: 'SystemNo', title: '司机手机号', width: 150, event: "detail"},
                    {field: 'VehNof', title: '车牌号', width: 120}
                ]]
            });
            table.on('tool(test)', function (obj) {
                debugger;
                var data = obj.data;
                var layEvent = obj.event;
                if (layEvent === 'detail') { //查看
                    $.post("beidou/get_vechiecl_data_by_no",{deviceNo:data.SystemNo},function (resp) {
                        console.log(resp);
                        common.addMarkerBeiDou(resp,'allmap');
                    },'json');
                }
            });
        });

    }

    $(document).ready(function () {
        initMap();
        common.changeDivHeight("#allmap");
        initTable();
    })

}());



