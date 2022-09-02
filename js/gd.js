var items = document.getElementsByClassName('item');
var goPreBtn = document.getElementById('goPre');
var goNextBtn = document.getElementById('goNext');
var points = document.getElementsByClassName('point');


var index = 0; //index表示第几张图片在展示 ==》第index张图片有active这个类名
//同时展示第几个点

//轮播改变clearActive的名字
var clearActive = function () {
	for (var i = 0; i < items.length; i++) {
		items[i].className = 'item';
	}
	for (var i = 0; i < points.length; i++) {
		points[i].className = 'point';
	}
}
//下一张的class改成 item active
var goIndex = function () {
	clearActive();
	//console.log(index)
	items[index].className = 'item active';
	points[index].className = 'point active';
}
//下一张
var goNext = function () {
	if (index < 4) {
		index++;
	} else {
		index = 0;
	}
	goIndex();
}
//上一张
var goPre = function () {
	if (index == 0) {
		index = 4;

	} else {
		index--;
	}
	goIndex();
}
//监听事件下一张按钮
goNextBtn.addEventListener('click', function () {
	goNext();
})
goPreBtn.addEventListener('click', function () {
	goPre();
})

for (var i = 0; i < points.length; i++) {
	points[i].addEventListener('click', function () {
		var pointIndex = this.getAttribute('data-index');
		index = pointIndex;
		goIndex();
		time = 0;
	})
}

var time = 0; //定时器图片跳转参数

setInterval(function () {
	time++;
	if (time == 40) {
		goNext();
		time = 0;
	}

}, 100)
