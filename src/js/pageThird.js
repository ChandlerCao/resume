// 获取experience
const experience = $('#experience');
experience.onScroll(function(dir, e) {
  if( experience[0].offsetHeight < experience[0].scrollHeight ) e.stopPropagation();
});
// 获取date
const dateNum = $('.ex-date-num');
// 获取工作描述
const exDes = $('.ex-des');
// 获取潜水艇
const submarine = $('#submarine-box');

const water = require('./public').canvas({
	el: $('#water-canvas'),
	dir: 'up',
	len: 20
});

dateNum.addClass('ac');
exDes.addClass('ac');
submarine.addClass('ac');

module.exports = water;