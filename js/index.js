/*
* @Author: 12574
* @Date:   2018-07-05 19:27:13
* @Last Modified by:   12574
* @Last Modified time: 2018-07-06 11:09:50
*/
//获取元素
var getElem = function(selector) {
	return document.querySelector(selector)
}
var getAllElem = function(selector) {
	return document.querySelectorAll(selector)
}

//获取元素样式
var getCls = function(element) {
	return element.getAttribute('class');   //获取类名
}
//设置元素样式
var setCls = function(element,cls) {
	return element.setAttribute('class', cls);   //cls为样式名,设置一个类名
}
//为元素添加样式
var addCls = function(element, cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {         //从当前样式检索有没有添加的cls样式，没有则返回-1
		setCls(element,baseCls +' ' +cls);
	}
}

//为元素删除样式
var delCls = function(element, cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) != -1) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '))
	}
}

//第一步： 初始化 init

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

//设置屏内元素为初始状态
var setScreenAnimationInit = function(screenCls) {
	var screen = document.querySelector(screenCls);   //获取当前屏 的元素
	var animateElements = screenAnimateElements[screenCls];  //小需要设置动画的元素
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);  //获取每一项类名 注意会有“.”
		var baseCls = element.getAttribute('class');
		element.setAttribute("class",baseCls + ' ' + animateElements[i].substr(1) + '-animate-init');
	}
}

//设置播放屏内的元素动画
var playScreenAnimationDone = function (screenCls) {
	var screen = document.querySelector(screenCls);   //获取当前屏 的元素
	var animateElements = screenAnimateElements[screenCls];  //小需要设置动画的元素
	for (var i = 0; i < animateElements.length; i++) {
		var element = document.querySelector(animateElements[i]);  //获取每一项类名 注意会有“.”
		var baseCls = element.getAttribute('class');
		element.setAttribute("class",baseCls.replace('-animate-init','-animate-done'));
	}
};

window.onload = function() {
	for ( k in screenAnimateElements) {
		//默认载入第一屏动画
		if (k === '.firstscreen') {
			continue;
		}
		setScreenAnimationInit(k);
	}
}

//第二步： 滚动到哪，就播放到哪

var navItems = getAllElem('.header-nav-item');   //获取导航条子元素
var outLineItems = getAllElem('.outline-item');   //获取大纲子元素
//导航条下方红色横线跟随着导航，首先去除横线颜色样式，当选择哪一个时，再添加样式
var switchNavItemActive = function (idx) {
	for ( var i = 0; i<navItems.length; i++) {
		delCls(navItems[i],'header-nav-item-status-active');
	}
	addCls(navItems[idx],'header-nav-item-status-active');

	for ( var i = 0; i<outLineItems.length; i++) {
		delCls(outLineItems[i],'outline-item-statue');
	}
	addCls(outLineItems[idx],'outline-item-statue');
}

switchNavItemActive(0);
window.onscroll = function() {
	var top=document.documentElement.scrollTop||document.body.scrollTop;   // 兼容各浏览器
	var navTip = getElem('.nav-item-tip');
	// console.log(top);
	if (top > 80) {
		addCls( getElem('.header') , 'header-status-back');
		addCls( getElem('.outline') , 'outline-status-in');
	}else {
		delCls(getElem('.header'), 'header-status-back');
		delCls( getElem('.outline') , 'outline-status-in');
		navTip.style.left=(0 * 70) + 'px';
		switchNavItemActive(0);
	}
	if(top > 1) {
		playScreenAnimationDone(".firstscreen");
	}
	if(top > 800*1 -100) {
		playScreenAnimationDone(".secondscreen");
		navTip.style.left=(1* 70) + 'px';
		switchNavItemActive(1);
	}
	if(top > 800*2 -100) {
		playScreenAnimationDone(".thirdscreen");
		navTip.style.left=(2* 70) + 'px';
		switchNavItemActive(2);
	}
	if(top > 800*3 -100) {
		playScreenAnimationDone(".forthscreen");
		navTip.style.left=(3* 70) + 'px';
		switchNavItemActive(3);
	}
	if(top > 800*4 -100) {
		playScreenAnimationDone(".fifthscreen");
		navTip.style.left=(4* 70) + 'px';
		switchNavItemActive(4);
	}
}


// 第三步： 双向定位

 
var setNavJump = function(i,lib) {
	var item = lib[i];
	item.onclick = function() {
		// console.log(i);
		document.documentElement.scrollTop = i*800;
	}
}
for (var i = 0; i<navItems.length; i++) {
	setNavJump(i,navItems);
}
for (var i = 0; i<outLineItems.length; i++) {
	setNavJump(i,outLineItems);
}


// 第四步： 滑动门特效
var navTip = getElem('.nav-item-tip');

var setTip = function (idx,lib) {
	lib[idx].onmouseover = function() {
		navTip.style.left=(idx * 70) + 'px';
	}

	var activeIdx = 0;
	lib[idx].onmouseout = function() {
		for(var i = 0;i<lib.length;i++) {
			if (getCls(lib[i]).indexOf('header-nav-item-status-active') > -1) {
				activeIdx = i;
				break;
			}
		}
		navTip.style.left=(activeIdx * 70) + 'px';
	}
}
for (var i = 0; i<navItems.length; i++ ) {
	setTip(i,navItems);
}	

setTimeout(function(){
	playScreenAnimationDone('.firstscreen');
},200)
