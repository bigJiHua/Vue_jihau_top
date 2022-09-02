var icp = $("#icp");
var tops = $(".top");
icp.css({
	"height": " auto",
	"text-align": "center",
	"margin": "0 auto",
	"color": "white",
	"font-size": "15px",
	"background-color": "rgb( 37,51,62)",
	"width": "100%",
	"bottom": "0"
})

tops.css({
	"right": "24px",
	"position": "fixed",
	"bottom": "70px",
	"z-index": "99",
	"width": "40px",
	"height": "auto",
	"text-align": "center",
	"display": "none"
})
setInterval(function() {
	var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
	//console.log(scrollTop)
	if (scrollTop >= 1500) {
		document.getElementsByClassName("top")[0].style.display = "block";
	} else if (scrollTop <= 1500) {
		document.getElementsByClassName("top")[0].style.display = "none";
	}
}, 100)

function wechat() {
	$('.wechat').css("display", "block")
	$('.qq').css("display", "none")
}

function qq() {
	$('.qq').css("display", "block");
	$('.wechat').css("display", "none");
}
// // 福
// function showCoords(evt) {
//     //获取 鼠标点击位置
//     var Xindex = evt.clientX;
//     var Yindex = evt.clientY;
//     //创建 img元素 赋值 类名 和 路径
//     var imgbox = document.createElement('img');
//     // imgbox.className = 'item node';
//     imgbox.src = 'https://d.da4.cc/img/newyear/fu.svg';
//     // 获取父节点 body 因为页面目前只有一个大的div盒子装着四个图片 想让新增加的图片与他成为兄弟关系
//     var body_box = document.querySelector('body');
//     //在父节点后添加 创建的元素
//     body_box.appendChild(imgbox);
//     // 给元素设置样式                                                             动态添加      这两个位置
//     imgbox.setAttribute('style', 'position: absolute;width: 45px;height:45px;top:' + (Yindex - 20) + 'px;left:' + (Xindex - 20) + 'px;');
//     // 设置定时器 用于删除 多次点击剩余的 新建元素
//     setTimeout(() => {
//         imgbox.remove();
//     }, 1200)
// }
// // 点击触发
// body_box.addEventListener('mousedown', function () {
//     showCoords(event);
// })