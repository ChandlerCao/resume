// 获取飞机
const plane = $('#plane-box');
// 获取四个箱子
const contactItem = $('.contact-item');
// 获取箱子
const cube = $('.cube');
// 获取人物
const manBox = $('#manBox5');
const man = manBox.find('.man:first');
// 获取降落伞
const parachute = $('.parachute');
const pub = require('./public');
// 汽车发车
const boatAniFn = pub.move($('.boat'));
// 定义t
const t = new pub.timeout();
t.to(function () {
	// 飞机飞过来
	plane.addClass('ac');
	// 人物降落
	manBox.addClass('ac');
	// 箱子掉下来
	contactItem.addClass('ac');
})
	.to(function () {
		// 降落伞消失
		parachute.addClass('hide');
		// 箱子呈现3d状态
		cube.addClass('ac');
		// 人物变换姿势
		man.addClass('bp8');
		// 飞机remove
		plane.remove();
	}, 2000)
module.exports = {
	start() {
		boatAniFn.start();
		t.start();
	},
	pause() {
		boatAniFn.pause();
		t.pause();
	}
};