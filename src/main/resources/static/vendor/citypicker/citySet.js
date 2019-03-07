function SelCity(obj, e) {
    var cityId = obj.id;
    var ths = obj;
    var dal = '<div class="_citys"><span title="关闭" id="cColse" >×</span><ul id="_citysheng" class="_citys0"><li class="citySel">省份</li><li>城市</li><!--<li>区县</li>--></ul><div id="_citys0" class="_citys1"></div><div style="display:none" id="_citys1" class="_citys1"></div><div style="display:none" id="_citys2" class="_citys1"></div></div>';
    Iput.show({id: ths, event: e, content: dal, width: "470"});
    $("#cColse").click(function () {
        Iput.colse();
    });
    var tb_province = [];
    var b = province;
    for (var i = 0, len = b.length; i < len; i++) {
        tb_province.push('<a data-level="0" data-id="' + b[i]['id'] + '" data-name="' + b[i]['name'] + '">' + b[i]['name'] + '</a>');
    }
    $("#_citys0").append(tb_province.join(""));
    $("#_citys0 a").click(function () {
        var g = getCity($(this));
        $("#_citys1 a").remove();
        $("#_citys1").append(g);
        $("._citys1").hide();
        $("._citys1:eq(1)").show();
        $("#_citys0 a,#_citys1 a,#_citys2 a").removeClass("AreaS");
        $(this).addClass("AreaS");
        var lev = $(this).data("id");
        if (document.getElementById(cityId + "_hcity") == null) {
            var hcitys = $('<input>', {
                type: 'hidden',
                name: cityId + "_hcity",
                "data-id": $(this).data("id"),
                id: cityId + "_hcity",
                val: lev
            });
            $(ths).after(hcitys);
        }
        else {
            $("#" + cityId + "_hcity").val(lev);
            $("#" + cityId + "_hcity").attr("data-id", $(this).data("id"));
        }
        $("#_citys1 a").click(function () {
            $("#_citys1 a,#_citys2 a").removeClass("AreaS");
            $(this).addClass("AreaS");
            var lev = $(this).data("id");
            if (document.getElementById(cityId + "_hproper") == null) {
                var hcitys = $('<input>', {
                    type: 'hidden',
                    name: cityId + "_hproper",
                    "data-id": $(this).data("id"),
                    id: cityId + "_hproper",
                    val: lev
                });
                $(ths).after(hcitys);
            }
            else {
                $("#" + cityId + "_hproper").attr("data-id", $(this).data("id"));
                $("#" + cityId + "_hproper").val(lev);
            }
            ths.value = $(this).data("name");
            Iput.colse();

            //var ar = getArea($(this));

            // $("#_citys2 a").remove();
            // $("#_citys2").append(ar);
            // $("._citys1").hide();
            // $("._citys1:eq(2)").show();

            /*$("#_citys2 a").click(function () {
                $("#_citys2 a").removeClass("AreaS");
                $(this).addClass("AreaS");
                var lev = $(this).data("id");
                if (document.getElementById(cityId + "_harea") == null) {
                    var hcitys = $('<input>', {
                        type: 'hidden',
                        name: cityId + "_harea",
                        "data-id": $(this).data("id"),
                        id: cityId + "_harea",
                        val: lev
                    });
                    $(ths).after(hcitys);
                }
                else {
                    $("#" + cityId + "_harea").val(lev);
                    $("#" + cityId + "_harea").attr("data-id", $(this).data("id"));
                }
                var bc = $("#" + cityId + "_hcity").val();
                var bp = $("#" + cityId + "_hproper").val();
                /!* ths.value = bc + "-" + bp + "-" + $(this).data("name");*!/
                ths.value = $("#" + cityId + "_hproper").val() + $(this).data("name");
                Iput.colse();
            });*/


        });
    });
    $("#_citysheng li").click(function () {
        $("#_citysheng li").removeClass("citySel");
        $(this).addClass("citySel");
        var s = $("#_citysheng li").index(this);
        $("._citys1").hide();
        $("._citys1:eq(" + s + ")").show();
    });
}

function getCity(obj) {
    var c = obj.data('id');
    var e = province;
    var f;
    var g = '';
    for (var i = 0, plen = e.length; i < plen; i++) {
        if (e[i]['id'] == c) {
            f = e[i]['city'];
            break
        }
    }
    for (var j = 0, clen = f.length; j < clen; j++) {
        g += '<a data-level="1" data-id="' + f[j]['id'] + '" data-name="' + f[j]['name'] + '" title="' + f[j]['name'] + '">' + f[j]['name'] + '</a>'
    }
    $("#_citysheng li").removeClass("citySel");
    $("#_citysheng li:eq(1)").addClass("citySel");
    return g;
}

function getArea(obj) {
    var c = obj.data('id');
    var e = area;
    var f = [];
    var g = '';
    for (var i = 0, plen = e.length; i < plen; i++) {
        if (e[i]['pid'] == c) {
            f.push(e[i]);
        }
    }
    for (var j = 0, clen = f.length; j < clen; j++) {
        g += '<a data-level="1" data-id="' + f[j]['id'] + '" data-name="' + f[j]['name'] + '" title="' + f[j]['name'] + '">' + f[j]['name'] + '</a>'
    }

    $("#_citysheng li").removeClass("citySel");
    $("#_citysheng li:eq(2)").addClass("citySel");
    return g;
}