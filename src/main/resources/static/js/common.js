var common = {

    //动态调整tab load界面的高度  宽度已经自适应
    initContainer: function (container) {
        var height = $("#container").height();
        $(container).css("height", height - 40);
    },

    //监听浏览器窗口的界面变化
    changeDivHeight: function (container) {
        window.onresize = function (container) {
            common.initContainer(container);
        }
    },

    //初始化百度地图
    initMap: function (container, data) {
        var map = new BMap.Map(container);
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);

        function myFun(result) {
            var cityName = result.name;
            map.setCenter(cityName);
        }

        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
        map.enableScrollWheelZoom(true);
    },
    //百度地图添加标注点
    addMarkersBeidou: function (map, data) {
        var map = map;
        if (data) {
            var point = new BMap.Point(data[0].Lon, data[0].Lat);
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom(true);
        } else {
            var point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            function myFun(result) {
                var cityName = result.name;
                map.setCenter(cityName);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
            map.enableScrollWheelZoom(true);
        }
        var pt = null;
        for (var i in data) {
            pt = new BMap.Point(data[i].Lon, data[i].Lat);
            var myIcon = new BMap.Icon("images/car.png", new BMap.Size(80, 40));
            var marker = new BMap.Marker(pt, {icon: myIcon});
            map.addOverlay(marker);
        }
    }


}