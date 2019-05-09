[在线预览（移动端慎入）](https://www.caodj.cn/)

[github](https://github.com/chandlerCao/resume)

>又到了一年一度躁动不安的季节，跳槽升职加薪当然需要一份很nice的简历啦，作为一位在本圈刚出道的前端小白，当然需要一份很nice的简历啦！

## 图片展示
设计粗糙，原谅一个理科生（理科都还没学好）的审美
### 介绍页
![](https://user-gold-cdn.xitu.io/2019/4/16/16a24dba6ef3097a?w=1920&h=899&f=png&s=356163)
### 技能清单页
![](https://user-gold-cdn.xitu.io/2019/4/16/16a24dbecbb800b9?w=1919&h=904&f=png&s=223654)
### 经历页
![](https://user-gold-cdn.xitu.io/2019/4/16/16a24dc1aef177d0?w=1920&h=897&f=png&s=464360)
### 作品页
![](https://user-gold-cdn.xitu.io/2019/4/16/16a24dc57338a4ef?w=1919&h=900&f=png&s=300170)
### 联系方式页
![](https://user-gold-cdn.xitu.io/2019/4/16/16a24dce58772798?w=1920&h=900&f=png&s=259103)

## 核心动画延迟函数
### js文件目录
```
│  jqExt.js // 扩展一些jq插件
│  main.js // 主函数
│  pageFirst.js // 第一屏动画
│  pageSecond.js // 第二屏动画
│  pageThird.js // 第三屏动画
│  pageFourth.js // 第四屏动画
|  pageFifth.js // 第五屏动画
│  startAni.js // 页面初始化动画
│  utils.js // 工具函数
```
### 核心延迟函数
网站一共分为五屏，每翻到一屏都会执行当前页面的动画，由于动画为延迟逐个进行的方式，一开始非常简单粗暴的使用setTimeout嵌套，酱紫：
```js
setTimeout(() => {
    /* 需要执行的动画内容 */
    setTimeout(() => {
        /* 需要执行的动画内容 */
        setTimeout(() => {
            /* 需要执行的动画内容 */
        }, delay);
    }, delay);    
}, delay);
```
臭名远扬的回调函数，其实我是没问题的，可是咱得考虑到开源呀，这整出去不是打自个脸吗，所以自个封装了一个非常简易还有点low的延迟库，酱紫：
```js
class Timeout {
    constructor() {
        this.timer = null; // 定时器
        this.fns = []; // 存储所有运动函数
        this.index = 0; // 索引
    }
    to(fn = () => { }, time = 0) {
        // 存储所有执行函数以及对应的延迟时间
        this.fns.push({
            fn,
            time
        });
        return this;
    }
    start() {
        const _this = this;
        /* 通过索引判断当前动画是否执行完毕，不需要继续执行 */
        if (_this.index === _this.fns.length) return;
        // 清除定时器
        _this.pause();
        _this.timer = setTimeout(() => {
            //执行当前阶段函数
            requestAnimationFrame(_this.fns[_this.index].fn);
            // 索引+1
            _this.index++;
            if (_this.index === _this.fns.length) _this.pause();
            else _this.start();
            // 时间递增
        }, _this.fns[_this.index].time);
    }
    // 暂停
    pause() {
        clearTimeout(this.timer);
    }
};
```
调用方式如下：
```js
const t = new Timeout();
t.to(() => {
    /* 动画函数 */
}, delay)
.to(() => {
    /* 动画函数 */
}, delay)
......
// 执行当前动画组
t.start();
```
这就好多了

每个屏最终都会导出当前屏动画的**开始**和**暂停**开关
```js
module.exports = {
    start() {
        t.start();
        /* 当前屏其他动画开始函数 */
    },
    pause() {
        t.pause();
        /* 当前屏其他动画暂停函数 */
    }
};
```
当页面滚动到当前屏，执行start开始方法，离开之后执行pause暂停，尤其是需要canvas和setInterval的屏，暂停能节约性能开销呢

## 首屏随机行驶的小车原理
### 预览

![](https://user-gold-cdn.xitu.io/2019/4/16/16a24eafdf9d31d7?w=1920&h=890&f=gif&s=3730505)
首先准备若干量小车div，蜷缩在屏幕外边随时准备待命，开一个定时器，随机抓出一辆小车放生

共有三个要素决定小车的运动形式(行驶方向、上下位置、运动速度)

### 行驶方向
车从左到右行驶 或 从右到左行驶
```css
.car {
    // 小车向右边行驶
    &.left {
        animation-name: moveL;
        @keyframes moveL {
            0% {
                transform: translateX(-300px) rotateY(0);
            } 100% {
                transform: translateX(140vw) rotateY(0);
            }
        }
    }

    // 小车向左边行驶
    &.right {
        animation-name: moveR;
        @keyframes moveR {
            0% {
                transform: translateX(140vw) rotateY(180deg);
            } 100% {
                transform: translateX(-300px) rotateY(180deg);
            }
        }
    }
    
    // 鼠标移动到小车上停止
    &:hover {
        animation-play-state: paused;
    }
 }
```
### 上下位置
枚举出所有小车可能出现的最佳位置，方便js随机动态生成class
```css
.car {
    /* 枚举出左右车道小车位置，方便js随机动态生成class */
    // 左车道
    &.bl1 {
        bottom: 91%;
        z-index: 8;
    }
    &.bl2 {
        bottom: 92%;
        z-index: 7;
    }
    // ......
    
    // 右车道
    &.br1 {
        bottom: 71%;
        z-index: 18;
    }

    &.br2 {
        bottom: 72%;
        z-index: 17;
    }
    // ......
}
```
### 行驶时间
```css
.car {
    // 时间
    &.t1 {
        animation-duration: 1s;
    }

    &.t2 {
        animation-duration: 2s;
    }
    // ......
}
```
### 核心js代码如下：
```js
// 需要用到的运动类
const moveStyle = {
    dir: ['left', 'right'],
    time: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'],
    pos: [['bl1', 'bl2', 'bl3', 'bl4', 'bl5', 'bl6', 'bl7', 'bl8'], ['br1', 'br2', 'br3', 'br4', 'br5', 'br6', 'br7', 'br8']]
}
const move = () => {
    /* moveArr为需要运动的小车集合 */
    /* 随机取出一辆小车 len为小车个数 */
    moveObj = moveArr[Math.floor(Math.random() * len)];
    // 选出一辆不处于运动状态的小车
    while (moveObj.prop('isAnimated')) {
        moveObj = moveArr[Math.floor(Math.random() * len)];
    };
    // 将即将运动的小车的加上运动标识
    moveObj.prop('isAnimated', true);
    /* 这里来一个55开，决定当前小车行驶方向 */
    const dirNum = Math.round(Math.random()); // 0或1
    // 生成运动类名
    const className = `${moveStyle.dir[dirNum]} ${moveStyle.time[Math.ceil(Math.random() * 8)]} ${moveStyle.pos[dirNum][Math.ceil(Math.random() * 7)]}`;
    // 给小车加上class，并将类名存储到自定义数据中，方便后期清空
    moveObj.addClass(className).prop('csName', className);
    // 每隔四秒走一次
    timer = setTimeout(() => {
        requestAnimationFrame(move);
    }, 4000);
}
```
当然，我们需要监听当前小车车是否运动完毕，以此来取消它的运动状态，所以需要搞一个监听：
```js
// 当animate完成，会触发当前事件
car.bind("animationEnd webkitAnimationEnd", animateComplete);
function animateComplete() {
    // 清空刚刚随机生成的class运动类，并且将当前的运动状态设置为false
    $(this).removeClass($(this).prop('csName')).prop('isAnimated', false);
};
```
ok，差不多完成了，但是还有一个很重要的性能问题，假如浏览者离开了当前屏幕，我们就需要清空当前小车的运动定时器，最终我们依然导出了一个start（开始）和pause（暂停）函数
```js
return {
    // 小车开始运动
    start: move,
    pause() {
        // 清除小车的定时器
        clearTimeout(timer);
        // 遍历所有小车，清空他们的运动状态
        cars.each(moveEl => {
            // 把运动中的车全部清除
            if ($(moveEl).prop('isAnimated')) $(moveEl).removeClass($(moveEl).prop('csName')).prop('isAnimated', false);
        });
    }
};
// 然后放到对应的页面中去
// 比如首屏最终的导出函数就成了酱紫：
module.exports = {
    start() {
    	t.start();
        /* 小车开始 */
    	carAniFn.start();
    },
    pause() {
    	t.pause();
    	/* 离开当前屏，小车暂停 */
    	carAniFn.pause();
    }
};
```
## 页面切换效果
所有页面都包装在一个div里面，通过切换css类名来实现上下运动，css如下
```css
/* vh是css3的一个相对单位，100vh相当于浏览器可视区域的高度 */
#swiper-box {
    .ts(.4s linear);
    &.page0 {
        .tf(translateY(0));
    }

    &.page1 {
        .tf(translateY(-100vh));
    }

    &.page2 {
        .tf(translateY(-200vh));
    }

    &.page3 {
        .tf(translateY(-300vh));
    }

    &.page4 {
        .tf(translateY(-400vh));
    }
}
```
监听鼠标滚轮，在这里需要注意下chrome和firefox滚动方向需要做一下兼容：
```js
/* 扩展jq函数 */
$.fn.extend({
    onscroll(fn) {
        let dir = null;
        let gg, ff;
        $(this).bind('mousewheel || DOMMouseScroll', function (e) {
            gg = e.originalEvent.wheelDelta;
            ff = e.originalEvent.detail;
            dir = gg ? (gg < 0 ? true : false) : (ff < 0 ? false : true);
            fn && fn(dir, e);
        });
        return $(this);
    }
});
```
给需要滚动的父级元素加上鼠标滚轮事件
```js
swiperBox.onscroll(function (dir) {
   /**/
    if (dir) index++;
    else index--;
    // 判断index是否超出范围，len为屏幕个数
    if (index >= len) index = 0;
    if (index < 0) index = len - 1;
    if (index === prev) return;
    // 暂停上一屏的动画
    arr[prev].pause();
    // 3d导航切换效果
    navA.eq(prev).removeClass('hover');
    navA.eq(index).addClass('hover');
    // 给父级加上已经写好的class类名
    swiperBox[0].className = 'page' + index;
});
```
当滚动到当前屏之后，需要执行当前屏的动画，在这里我们监听父级页面是否运动完成，运动完成之后就按需加载当前页面对应的动画：
```js
/* 将对应的页面存储到数组当中，用于判断是否已经require过 */
const partArr = [];
swiperBox.bind('transitionend webkitTransitionend', function (e) {
    /* 考虑到子元素会重复触发当前事件，判断下子 */
    if (e.target === this) {
        if (!partArr[index]) partArr[index] = requirePart(index); // 如果没有导入，进行导入
        prev = index; // 记录上一屏
        partArr[index].start(); // 执行当前屏的动画
    }
});
// 用于导入各个页面的函数
function requirePart(index) {
    switch (index) {
        case 0:
            return require('./pageFirst');
        case 1:
            return require('./pageSecond');
        case 2:
            return require('./pageThird');
        case 3:
            return require('./pageFourth');
        case 4:
            return require('./pageFifth');
    }
}
```
## 总结
由于技术原因页面可能存在诸多潜在问题，欢迎感兴趣的大佬可以通过简历的联系方式来指导下我，最后再不要脸的附上地址：

[在线预览（移动端慎入）](https://www.caodj.cn/)

[github](https://github.com/chandlerCao/resume)

[个人技术博客（还在完善阶段）](https://blog.caodj.cn)
