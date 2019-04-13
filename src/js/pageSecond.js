// 技能box
const skillBox = $('#skill-box');
//获取标题
const beeTitle = skillBox.find('.honeybee-title');
//获取技能进度框
const honeybee = skillBox.find('.honeybee');
// 获取蜜蜂身体
const honeybeeBox = skillBox.find('.honeybee-box');
// 获取椅子
const chair = $('#chair');
// 定义当前蜜蜂和索引
let [nowHb, index] = [null, 0];
//人物
const manBox = $('#manBox2');
const oManBox = manBox[0];
const man = manBox.find('.man:first');
// 获取船
const boat = $('#boat-box');
//获取棍子
const stick = $('#stick');
// 获取热气球
const hot = $('#air-balloon');
// 人物和蜜蜂之间的距离
// 获取比例
const [x, y] = [-76, -50];
/* beeTitle和蜜蜂鼠标移入 */
honeybee.hover(function () {
    $(this).removeClass('jello').addClass('rubberBand animated')
}, function () {
    $(this).removeClass('rubberBand animated')
});
beeTitle.hover(function () {
    $(this).removeClass('jello').addClass('rubberBand animated')
}, function () {
    $(this).removeClass('rubberBand animated')
});
/* beeTitle和蜜蜂鼠标移入 */
const utils = require('./utils');
const t = new utils.timeout();
function beeMove() {
    nowHb.addClass('jello animated');
    // 蜜蜂的显示
    honeybeeBox.eq(index).addClass('ac');
};
// 打下去
function beat(nowHb) {
    man.toggleClass('bp3 bp4');
    stick.addClass('beat');
    requestAnimationFrame(beeMove);
};
// 人物移动到蜜蜂
function move() {
    oManBox.style.cssText = 'left: ' + (nowHb.offset().left + x) + 'px; top: ' + (nowHb.offset().top + y) + 'px;';
};
// 抬起来
function list(i) {
    index = i;
    // 抬起来
    man.toggleClass('bp4 bp3');
    stick.removeClass('beat');
    // 飞到第二个蜜蜂
    nowHb = honeybee.eq(i);
    requestAnimationFrame(move);
};
// 热气球起飞
hot.removeClass('pause');
t.to(function () {
    // title和蜜蜂缩放到1
    beeTitle.addClass('ac');
    honeybee.addClass('ac');
})
    .to(function () {
        // 人物出现在屏幕中央
        manBox.addClass('ac');
    }, 300)
    .to(function () {
        man.toggleClass('bp5 bp6');
        nowHb = honeybee.eq(0);
        // 人物飞到第一个蜜蜂处
        manBox.addClass('ts1');
        requestAnimationFrame(move);
        boat.remove();
    }, 1200)
    .to(function () {
        // 变换为接受棍子的姿势
        man.toggleClass('bp6 bp3');
        // 棍子飞过来
        stick.addClass('ac');
    }, 300)
    .to(function () {
        stick.removeClass('ts');
        beat(nowHb);
    }, 550)
    .to(function () {
        list(4);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(1);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(5);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(2);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(6);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(3);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        list(7);
    }, 100)
    .to(function () {
        beat(nowHb);
    }, 300)
    .to(function () {
        man.toggleClass('bp4 bp6');
        stick.removeClass('ac');
        oManBox.style.cssText = 'left: ' + (chair.offset().left - 115) + 'px; top: ' + (chair.offset().top + 35) + 'px;';
    }, 300)
    .to(function () {
        man.toggleClass('bp6 bp8');
        $('#dialog2').addClass('ac');
    }, 300);


module.exports = {
    start() {
        t.start();
        hot.removeClass('pause');
    },
    pause() {
        hot.addClass('pause');
        t.pause();
    }
};
