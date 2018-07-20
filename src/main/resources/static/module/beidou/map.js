(function () {
    initMap = function () {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        function myFun(result) {
            var cityName = result.name;
            map.setCenter(cityName);
        }

        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
        map.enableScrollWheelZoom(true);
        common.initContainer("#allmap");
    }

    $(document).ready(function () {
        initMap();
        common.changeDivHeight("#allmap");
    })

}());



