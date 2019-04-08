function show(fn = () => { }) {
    // body
    const body = $('body:first');
    // 获取第一屏
    const pageFirst = $('#pageFirst');
    //logo
    const logo = $('#logo');
    //导航子元素
    const navA = $('.nav-a');
    //出场小球
    const ball = $('<div id="ball" class="ballShake">100%</div>');
    //背景
    const bg1 = $('<div id="bg1" class="bg"></div>');
    const bg2 = $('<div id="bg2" class="bg"></div>');
    // 添加小球和大门
    body.append(ball, bg1, bg2);
    const bg = $('.bg');
    // 获取page
    const page = $('.page');
    page.not('#pageThird').append(`
        <div class="bird"></div>
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
        <div class="cloud cloud4"></div>
        <div class="cloud cloud5"></div>
        <div class="sun"></div>
  `);
    // 获取太阳
    const sun = $('.sun');
    // 去除小鸟
    $('#birdHid').remove();
    // 网页加载
    go();
    //logo交互效果
    logo.hover(
        function () {
            $(this).addClass('rubberBand');
        },
        function () {
            $(this).removeClass('rubberBand');
        }
    );
    // 图片加载完成，执行函数
    function go() {
        const pub = require('./public');
        const t = new pub.timeout();
        t.to(function () {
            ball.removeClass('ballShake');
        }, 500)
            .to(function () {
                // 小球放大
                ball.text('').addClass('ac');
            }, 30)
            .to(function () {
                // 背景出现
                bg.addClass('ac');
                // 第一屏出现
                pageFirst.addClass('show');
            }, 550)
            .to(function () {
                // 小球移出
                ball.remove();
                // 背景移开
                bg1.addClass('lift');
                bg2.addClass('lift');
            }, 100)
            .to(fn)
            .to(function () {
                // logo 出现
                logo.addClass('ac');
                navA.addClass('ac');
                sun.addClass('ac');
            }, 200)
            .to(function () {
                bg.remove();
                sun.addClass('sunRotate');
            }, 1200).start();
    }
}
module.exports = show;
