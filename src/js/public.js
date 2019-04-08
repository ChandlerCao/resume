const win = window;
// 获取Math
const math = Math;
//定义随机数函数
function random(x) {
    return math.random() * x;
};
class timeout {
    constructor() {
        this.timer = null;
        this.arr = [];
        this.index = 0;
    }
    to(fn = () => { }, time = 0) {
        // 将所有运动的函数全部载入
        this.arr.push({
            fn,
            time
        });
        return this;
    }
    start() {
        var _this = this;
        if (_this.over) return;
        // 定时器
        _this.pause();
        _this.timer = setTimeout(() => {
            requestAnimationFrame(_this.arr[_this.index].fn);
            _this.index++;
            if (_this.index === _this.arr.length) {
                _this.over = true;
                _this.pause();
            } else _this.start();
            // 时间递增
        }, _this.arr[_this.index].time);
    }
    pause() {
        clearTimeout(this.timer);
    }
};
const obj = {
    view: {
        w: $(win).width(),
        h: $(win).height()
    },
    move: function (obj) {
        clearTimeout(timer);
        //获取所有要运动的对象
        let arr = [];
        let timer = null;
        obj.each(function (index, el) {
            arr.push($(el));
            //运动完成要执行的函数
            $(el).bind("animationEnd webkitAnimationEnd", animateComplete);
        });
        //获取运动元素数量
        const len = arr.length;
        //正在运动的对象
        let moveObj = null;
        // 定义当前className
        let className = '';
        //汽车随机运动
        function carMove() {
            clearTimeout(timer);
            moveObj = arr[Math.floor(Math.random() * len)];
            while (moveObj.prop('isAnimated')) {
                moveObj = arr[Math.floor(Math.random() * len)];
            };
            //正在运动的汽车的isAnimated为1
            moveObj.prop('isAnimated', true);
            if (Math.random() > 0.5) {
                // 计算当前class
                className = 'left t' + Math.ceil(Math.random() * 8) + ' bl' + Math.ceil(Math.random() * 8);
                // 添加class
                moveObj.addClass(className).prop('csName', className);
            } else {
                // 计算当前class
                className = 'right t' + Math.ceil(Math.random() * 8) + ' br' + Math.ceil(Math.random() * 9);
                // 添加class
                moveObj.addClass(className).prop('csName', className);
            }
            timer = setTimeout(function () {
                requestAnimationFrame(carMove);
            }, 4000);
        };

        function animateComplete() {
            $(this).removeClass($(this).prop('csName')).prop('isAnimated', false);
        };
        return {
            start: carMove,
            pause: function () {
                clearTimeout(timer);
                obj.each(function (index, el) {
                    // 把运动中的车全部清除
                    if ($(el).prop('isAnimated')) $(el).removeClass($(el).prop('csName')).prop('isAnimated', false);
                });
            }
        };
    },
    timeout: timeout,
    hash: function (hash) {
        // 如果传入了hash值
        if (hash) {
            if (hash === 'page1' || hash === 'page2' || hash === 'page3' || hash === 'page4' || hash === 'page5') {
                win.location.hash = hash;
            } else {
                win.location.hash = 'page1';
            }
        }
        // 如果没有传入hash值
        else {
            // 判断浏览器是否有hash值
            let [hash, num] = [win.location.hash, 0];
            hash = hash.substr(1, hash.length);
            if (hash) {
                switch (hash) {
                    case 'page1':
                        num = 0;
                        break;
                    case 'page2':
                        num = 1;
                        break;
                    case 'page3':
                        num = 2;
                        break;
                    case 'page4':
                        num = 3;
                        break;
                    case 'page5':
                        num = 4;
                        break;
                    default:
                        hash = 'page1';
                        num = 0;
                };
                return num;
            } else {
                window.location.hash = 'page1';
                return 0;
            }
        }
    },
    canvas: function (obj) {
        const _this = this;
        let timer = null;
        //canvas雪花
        const c = obj.el;
        const g = c[0].getContext('2d');
        c.attr('width', _this.view.w);
        c.attr('height', _this.view.h);
        let snowArr = [];
        const starLen = obj.len;
        initStar();

        function initStar() {
            g.clearRect(0, 0, c.attr('width'), c.attr('height'));
            snowArr = [];
            // 初始化每一个雪花
            for (var i = 0; i < starLen; i++) {
                let x = random(_this.view.w);
                snowArr.push({
                    x,
                    y: random(_this.view.h),
                    speedY: random(6) + 1,
                    r: random(5),
                    startX: x,
                    num: 0,
                    range: random(200),
                });
            }
        };
        starFlash();
        // 重绘
        function starFlash() {
            clearTimeout(timer);
            g.clearRect(0, 0, c.attr('width'), c.attr('height'));
            g.fillStyle = '#fff';
            for (var i = 0; i < starLen; i++) {
                // 雪花下落
                if (obj.dir === 'down') {
                    // y轴加
                    snowArr[i].y += snowArr[i].speedY;
                    if (snowArr[i].y > _this.view.h - 150) snowArr[i].y = 0;
                }
                if (obj.dir === 'up') {
                    // y轴减
                    snowArr[i].y -= snowArr[i].speedY;
                    if (snowArr[i].y < 0) snowArr[i].y = _this.view.h + snowArr[i].r;
                }
                snowArr[i].num--;
                if (snowArr[i].num === -360) snowArr[i].num = 0;
                snowArr[i].x = snowArr[i].startX - snowArr[i].range * math.sin(math.PI / 180 * snowArr[i].num);
                g.beginPath();
                g.arc(snowArr[i].x, snowArr[i].y, snowArr[i].r, 0, math.PI * 2);
                g.fill();
                g.closePath();
            };
            timer = requestAnimationFrame(starFlash);
        };
        return {
            start() {
                cancelAnimationFrame(timer);
                requestAnimationFrame(starFlash);
            },
            pause() {
                cancelAnimationFrame(timer);
            }
        };
    }
};
module.exports = obj;