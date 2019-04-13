; (function (win) {
    $.fn.extend({
        onScroll: scroll,
        tf: transform
    });
    // 鼠标滚轮事件
    function scroll(fn) {
        let dir = null;
        let gg, ff;
        $(this).bind('mousewheel || DOMMouseScroll', function (e) {
            gg = e.originalEvent.wheelDelta;
            ff = e.originalEvent.detail;
            dir = gg ? (gg < 0 ? true : false) : (ff < 0 ? false : true);
            fn && fn(dir, e);
        });
        return $(this);
    };
    // transform
    function transform(tf, val) {
        if (isJson(tf)) for (var attr in tf) $(this).tf(attr, tf[attr]);

        var _this = $(this)[0];
        if (!_this.data) {
            _this.data = {};
        }

        if (_this.tf === undefined) _this.tf = '';

        if (val === undefined) return _this.data[tf];

        var relTf = '', unit = '';

        switch (tf) {
            case 'x':
                relTf = 'translateX', unit = 'px';
                break;
            case 'y':
                relTf = 'translateY', unit = 'px';
                break;
            case 'z':
                relTf = 'translateZ', unit = 'px';
                break;
            case 'skew':
                relTf = 'skew', unit = 'deg';
                break;
            case 'skewX':
                relTf = 'skewX', unit = 'deg';
                break;
            case 'skewY':
                relTf = 'skewY', unit = 'deg';
                break;
            case 'rotate':
                relTf = 'rotate', unit = 'deg';
                break;
            case 'rotateX':
                relTf = 'rotateX', unit = 'deg';
                break;
            case 'rotateY':
                relTf = 'rotateY', unit = 'deg';
                break;
            case 'scale':
                relTf = 'scale', unit = '';
                break;
            case 'scaleX':
                relTf = 'scaleX', unit = '';
                break;
            case 'scaleY':
                relTf = 'scaleX', unit = '';
        }

        val += '';

        // 如果最后一位 不 是百分号
        if (val.charAt(val.length - 1) !== '%') val = parseFloat(val);

        assignment();

        function assignment() {

            // 存放当前元素的值
            var value = relTf + '(' + val + unit + ')';

            if (_this.data[tf]) { // 如果已经赋过值了
                var arr = _this.tf.split(' ');
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].indexOf(relTf) != -1) arr[i] = value;
                }
                _this.tf = arr.join(' ');
            } else { // 如果没有赋过值
                _this.tf += value + ' ';
            }
            _this.style.transform = _this.style.WebkitTransform = _this.style.MozTransform = _this.style.OTransform = _this.style.MsTransform = _this.tf;
            // 自定义属性 只存放数字
            _this.data[tf] = val;
        }
    };
})(window);