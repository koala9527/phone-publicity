/*
* @Author: 12574
* @Date:   2018-07-05 15:00:20
* @Last Modified by:   12574
* @Last Modified time: 2018-07-05 18:57:56
*/

var  screenAnimateElements = {
	'.firstscreen' : [
		'.firstscreen-heading',
		'.firstscreen-phone',
		'.firstscreen-phone-shadow'
	],
	'.secondscreen' : [
		'.secondscreen-heading',
		'.secondscreen-subheading',
		'.secondscreen-phone',
		'.secondscreen-point-left',
		'.secondscreen-point-right',
		'.secondscreen-point-desc1',
		'.secondscreen-point-desc2',
		'.secondscreen-point-desc3'
	],
	'.thirdscreen' : [
		'.thirdscreen-heading',
		'.thirdscreen-subheading',
		'.thirdscreen-phone',
		'.thirdscreen-desc-box'
	],
	'.forthscreen' : [
		'.forthscreen-heading',
		'.forthscreen-subheading',
		'.forthscreen-phone-type',
		'.type-img-item1',
		'.type-img-item2',
		'.type-img-item3',
		'.type-img-item4'
	],
	'.fifthscreen' : [
		'.fifthscreen-heading',
		'.fifthscreen-subheading',
		'.fifthscreen-bg'
	]
};
function setScreenAnimate (screenCls) {
	var screen = document.querySelector(screenCls);   //获取当前屏 的元素
	var animateElements = screenAnimateElements[screenCls];  //小需要设置动画的元素
	var isSetAnimateClass = false;   //是否有初始化子元素的样式
	var isAnimateDone = false;      //当前屏幕下所有子元素的状态是否为done?
	screen.onclick = function() {
		//初始化样式，增加init
		if (isSetAnimateClass === false) {
			for (var i = 0; i < animateElements.length; i++) {
				var element = document.querySelector(animateElements[i]);  //获取每一项类名 注意会有“.”
				var baseCls = element.getAttribute('class');
				element.setAttribute("class",baseCls + ' ' + animateElements[i].substr(1) + '-animate-init');
			}
			isSetAnimateClass = true;
			return ;
		}
		//切换所有  animateElements 的  init ->  done
		if (isAnimateDone === false) {
			for (var i = 0; i < animateElements.length; i++) {
				var element = document.querySelector(animateElements[i]);  //获取每一项类名 注意会有“.”
				var baseCls = element.getAttribute('class');
				element.setAttribute("class",baseCls.replace('-animate-init','-animate-done'));
			}
			isAnimateDone = true;
			return ;
		}
		//切换所有  animateElements 的  done ->  init
		if (isAnimateDone === true) {
			for (var i = 0; i < animateElements.length; i++) {
				var element = document.querySelector(animateElements[i]);  //获取每一项类名 注意会有“.”
				var baseCls = element.getAttribute('class');
				element.setAttribute("class",baseCls.replace('-animate-done','-animate-init'));
			}
			isAnimateDone = false;
			return ;
		}
	}
}
for ( k in screenAnimateElements) {
	setScreenAnimate(k);
}
// setScreenAnimate('.firstscreen');
// setScreenAnimate('.secondscreen');