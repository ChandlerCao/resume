const pub = require('./public');
// 作品鼠标移入
(function () {
  // 获取作品和蒙版包裹层
  const signWrapper = $('.sign-wrapper');
  // 获取布
  const signBox = $('.sign-box');
  // 获取作品
  const workBox = $('.work-box');
  // 鼠标移入
  let signHover = null;
  signWrapper.each((i, el) => {
    signHover = $(el);
    (function (i) {
      signHover.hover(function () {
        signBox.eq(i).removeClass('delay ac');
        workBox.eq(i).addClass('delay ac');
      }, function () {
        workBox.eq(i).removeClass('delay ac');
        signBox.eq(i).addClass('delay ac');
      });
    })(i);
  });
})();
// 获取人物
const manBox = $('#manBox3');
// 下雪
const man = manBox.find('.man:first');
// 获取雪花
const snow = pub.canvas({
  el: $('#snow-canvas'),
  dir: 'down',
  len: 50
});
const t = new pub.timeout();
// 获取作品
const works = $('.work-item');
// 获取字母
const words = $('#word-box');
t.to(function () {
  // 作品掉落
  works.addClass('ac');
})
  .to(function () {
    // 字母出现
    words.addClass('ac');
  }, 500)
  .to(function () {
    // 人物飞到作品旁边
    manBox[0].style.cssText = 'left:' + ($('#work-box').offset().left - 145) + 'px; bottom:28%;';
  }, 50)
  .to(function () {
    // 人物切换姿势
    man.addClass('bp7');
  }, 1000);
module.exports = {
  start() {
    t.start();
    snow.start();
  },
  pause() {
    t.pause();
    snow.pause();
  }
};