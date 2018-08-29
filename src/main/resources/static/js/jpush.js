var jpush = {

    JimInit: function () {
        var JIM = new JMessage();
        JIM.init({
            "appkey": 'ca1d6a0d5d1983d874001cea',
            "random_str": sessionStorage.getItem("userCode"),
            "signature": sessionStorage.getItem("signature"),
            "timestamp": sessionStorage.getItem("timestamp"),
            "flag": 0
        }).onSuccess(function (data) {
            console.log("random_str" + sessionStorage.getItem("userCode") + "  signature" + sessionStorage.getItem("signature") +
                "timestamp" + sessionStorage.getItem("timestamp"));
            console.log("极光推送 成功" + data);
        }).onFail(function (data) {
            console.log("极光推送 失败" + data);
        });

    }

}