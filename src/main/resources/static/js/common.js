var common = {

    //动态调整tab load界面的高度  宽度已经自适应
    initContainer: function (container) {
        var height = $("#container").height();
        $(container).css("height", height - 40);
    },

    //监听浏览器窗口的界面变化
    changeDivHeight: function (container) {
        /*window.onresize = function (container) {
            common.initContainer(container);
        }*/
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
    addMarkersBeidou: function (map, data,mapDiv) {
        var map = map;
        if (data) {
            map = new BMap.Map("allmap");
            var point = new BMap.Point(data[0].Lon, data[0].Lat);
        } else {
            var point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            function myFun(result) {
                var cityName = result.name;
                map.setCenter(cityName);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        }
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        var pt = null;
        for (var i in data) {
            pt = new BMap.Point(data[i].Lon, data[i].Lat);
            var myIcon = new BMap.Icon("images/car.png", new BMap.Size(80, 40));
            var marker = new BMap.Marker(pt, {icon: myIcon});
            map.addOverlay(marker);
           // var label = new BMap.Label(data[i].,{offset:new BMap.Size(20,-10)});
            //marker.setLabel(label); //添加百度label
        }
    },
    //北斗根据当前车辆位置信息标注
    addMarkerBeiDou : function (data,container) {
        var map = new BMap.Map(container);
        var point = new BMap.Point(data.Lon, data.Lat);
        map.centerAndZoom(point, 14);
        var myIcon = new BMap.Icon("images/car.png", new BMap.Size(80, 40));
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
    }

}