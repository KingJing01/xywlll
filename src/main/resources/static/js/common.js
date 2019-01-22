var common = {
    toBeAudited: 1,//待审核
    hasAudited: 2,//已审核
    hasReject: 3,//已驳回
    hasForbidden: 4,//禁用
    yesStatus: 'Y',//冻结
    noStatus: 'N', //未冻结
    noImage: "images/no-image.jpg",//默认无图片
    noHeadPortrait: "images/top.jpg",//默认头像
    //动态调整tab load界面的高度  宽度已经自适应
    initContainer: function (container) {
        var height = $("#page-wrapper").height();
        $(container).css("height", height);
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
    addMarkersBeidou: function (map, data, mapDiv) {
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
    addMarkerBeiDou: function (data, container) {
        var map = new BMap.Map(container);
        var point = new BMap.Point(data.Lon, data.Lat);
        map.centerAndZoom(point, 14);
        var myIcon = new BMap.Icon("images/car.png", new BMap.Size(80, 40));
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
    },
    /**
     *  通用ajax封装 异步请求  json格式数据传输
     * @param url  请求路径
     * @param restData  请求参数
     * @param data  发送的数据
     * @param callback 回掉函数
     * @param param 回调函数预留参数 不需要时不填
     */
    ajaxfuncURL: function (url, type, data, callback, param) {
        $.ajax({
            url: url,
            type: type,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            success: function (res) {
                callback(res, param);
            },
            error: function (res) {
                console.log(res);
            }
        });
    },
    /*bootstrap获取form表单的数据*/
    formDataAnalyse: function (data) {
        var resp = new Object();
        strs = data.split("&");
        for (var i = 0; i < strs.length; i++) {
            resp[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
        return resp;
    },
    commonModalShow: function (message) {
        $("#com_modal").modal("show");
        $("#com_modal_div").text(message);
    },
    // 13位时间戳格式转换
    formatUnixtimestamp:function (unixtimestamp) {
        var date = new Date();
        date.setTime(unixtimestamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }
}