(function () {
    initMap = function () {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        common.initContainer("#allmap");
        getVechicelData(map,"allmap");
    }

    getVechicelData = function(map,mapDiv){
        $.post("beidou/get_vechicel_gps_all",function (resp) {
            common.addMarkersBeidou(map,resp.Data,mapDiv)
        },'json')

    }

    $(document).ready(function () {
        initMap();
        common.changeDivHeight("#allmap");
    })

}());



