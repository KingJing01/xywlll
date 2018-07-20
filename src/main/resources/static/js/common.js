var common = {

    //动态调整tab load界面的高度  宽度已经自适应
    initContainer: function (container) {
        var height = $("#container").height();
        $(container).css("height", height - 40);
    },

    //监听浏览器窗口的界面变化
    changeDivHeight: function (container) {
        window.onresize = function (container) {
            this.initContainer(container);
        }
    }


}