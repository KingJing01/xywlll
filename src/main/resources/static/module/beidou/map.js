(function () {
    initMap = function () {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        common.initContainer("#allmap");
        getVechicelData(map);
    }

    getVechicelData = function(map){
        $.post("beidou/get_vechicel_gps_all",function (resp) {
            common.addMarkersBeidou(map,resp.Data)
        },'json')

    }

    $(document).ready(function () {
        initMap();
        common.changeDivHeight("#allmap");
    })

}());



