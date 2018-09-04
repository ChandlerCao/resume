// 获取第一屏
const pageFirst = $('#pageFirst');
// 小车和人物父级
const carWrapper = $('#car-wrapper');
//获取小车盒子
const carBox = $('#car-box');
// 车身
const carBody = $('#car-body');
// 轮胎
const luntai = carBox.find('.mainLuntai');
// 获取人物盒子
const manBox = $('#manBox1');
// 获取人物
const man = manBox.find('.man:first');
// 获取对话框
const dialog = $('#dialog1');
//获取箭头
const arrow = $('#arrow-down');



const pub = require('./public');
// 汽车发车
const carAniFn = pub.move($('.car'));
// 定义t
const t = new pub.timeout();
t.to(function() {
	// 第一屏出现
	pageFirst.addClass('light');
	// 人物和汽车出现
	luntai.addClass('rotate');
	carBody.addClass('shake');
	carWrapper.addClass('ac');
})
.to(function() {
	// 轮胎停止转动
	luntai.removeClass('rotate');
	carBody.removeClass('shake');
}, 2000)
.to(function() {
	// 人物跳上去
	man.removeClass('bp2').addClass('bp1');
	manBox.addClass('jump');
}, 200)
.to(function() {
	// 人物跳下来
	manBox.removeClass('jump').addClass('down');
}, 500)
.to(function() {
	man.removeClass('bp1').addClass('bp2');
	// 轮胎继续转动 车身继续抖动
	luntai.addClass('rotate');
	carBody.addClass('shake');
}, 500)
.to(function() {
	// 汽车离开
	carBox.addClass('ac');
}, 500)
.to(function() {
	// 对话框出现
	dialog.addClass('ac');
	// 下箭头出现
	arrow.addClass('ac');
}, 300)
.to(function() {
	// 将汽车移出
	carBox.remove();
}, 1700);
module.exports = {
	start() {
		carAniFn.start();
		t.start();
	},
	pause() {
		carAniFn.pause();
		t.pause();
	}
};