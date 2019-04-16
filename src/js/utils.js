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
        if (_this.index === _this.arr.length) return;
        // 定时器
        _this.pause();
        _this.timer = setTimeout(() => {
            requestAnimationFrame(_this.arr[_this.index].fn);
            _this.index++;
            if (_this.index === _this.arr.length) _this.pause();
            else _this.start();
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
        let moveArr = [];
        let timer = null;
        obj.each(function (index, el) {
            moveArr.push($(el));
            //运动完成要执行的函数
            $(el).bind("animationEnd webkitAnimationEnd", animateComplete);
        });
        //获取运动元素数量
        const len = moveArr.length;
        const moveStyle = {
            dir: ['left', 'right'],
            time: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'],
            pos: [['bl1', 'bl2', 'bl3', 'bl4', 'bl5', 'bl6', 'bl7', 'bl8'], ['br1', 'br2', 'br3', 'br4', 'br5', 'br6', 'br7', 'br8']]
        }
        //汽车随机运动
        function carMove() {
            clearTimeout(timer);
            let moveObj = moveArr[Math.floor(Math.random() * len)];
            while (moveObj.prop('isAnimated')) {
                moveObj = moveArr[Math.floor(Math.random() * len)];
            };
            //正在运动的汽车的isAnimated为true
            moveObj.prop('isAnimated', true);

            // 来个55开，判断想左还是向右
            const dirNum = Math.round(Math.random()); // 0或1
            const className = `${moveStyle.dir[dirNum]} ${moveStyle.time[Math.ceil(Math.random() * 8)]} ${moveStyle.pos[dirNum][Math.ceil(Math.random() * 7)]}`;
            // 添加class
            moveObj.addClass(className).prop('csName', className);
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
    // 雪花
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
// requestAnimationFrame兼容
; (function () {
    win.requestAnimationFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || win.msRequestAnimationFrame;
    win.cancelAnimationFrame = win.cancelAnimationFrame || win.mozCancelAnimationFrame || win.msCancelAnimationFrame;
})();
module.exports = obj;