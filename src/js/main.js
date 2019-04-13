//获取导航a
const navA = $('.nav-a');
//当前屏和上一屏
let [index, prev, b] = [0, 0, true];
//定义所有屏的动画对象
const arr = [];
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
//获取所有屏
const page = $('.page');
//获取swiperBox
const swiperBox = $('#swiper-box');
//获取屏幕的个数
const len = page.length;
//出场动画完成执行此函数
require('./startAni')(function () {
    // 绑定鼠标滚轮事件
    swiperBox.onScroll(function (dir) {
        if (b) {
            b = false;
            if (dir) index++;
            else index--;
            change();
        }
    })[0].className = 'page' + index;
    // 绑定导航点击事件
    navA.click(function () {
        const nowIndex = navA.index($(this));
        if (nowIndex === prev) return;
        if (b) {
            b = false;
            index = nowIndex;
            change();
        }
    }).eq(index).addClass('hover');
    swiperBox.bind('transitionend webkitTransitionend', function (e) {
        if (e.target === this) {
            if (!arr[index]) arr[index] = requirePart(index); // 如果没有导入过当前函数，就导入
            prev = index; // 记录上一屏
            arr[index].start(); // 执行当前屏的动画
            b = true; // 可以继续转换
        }
    });
});
function change() {
    // 判断index是否超出范围
    if (index >= len) index = 0;
    if (index < 0) index = len - 1;
    if (index === prev) return;
    arr[prev].pause();
    //导航切换效果
    navA.eq(prev).removeClass('hover');
    navA.eq(index).addClass('hover');
    swiperBox[0].className = 'page' + index;
};