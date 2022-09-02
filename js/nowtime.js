//刷新函数 wih()
window.onload = (function() {
    setInterval("myFunction()", 100);
})
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function myFunction() {
    d = new Date();
    x = document.getElementById("nowtime");
    x1 = document.getElementById("nowtime1");
    h = addZero(d.getHours());
    m = addZero(d.getMinutes());
    s = addZero(d.getSeconds());
	var tips;
	if(h<=24&& h<3){
		tips = "深夜了早点睡吧";
	}else if(h>3&& h<6){
		tips = "早点睡年轻人";
	}else if(h>=6&& h<8){
		tips = "早上好";
	}else if(h>=8&& h<11){
		tips = "上午好";
	}else if(h>=11&& h<13){
		tips = "中午好";
	}else if(h>=13&& h<17){
		tips = "下午好";
	}else if(h>=17&& h<19){
		tips = "旁晚好";
	}else if(h>=19&& h<24){
		tips = "晚上好";
	}else {
		tips = "格式错误";
	}
    x.innerHTML = tips + '<br/>' + '现在时间为:' + h + "时" + m + "分" + s + '秒';
    x.style.fontSize = ('25px');
    x.style.fontWeight = ('600');
	var ty = document.getElementById('ty');
	var hour1 = document.getElementById("h1");
	var min2 = document.getElementById("m2");
	var scd3  = document.getElementById("s3");
	ty.setAttribute("style","width: 120px;height: 120px;border: 2px black solid;background-color: rgba(244,244,244,0.8);position: relative;border-radius: 50%;text-align: center;");
	scd3.setAttribute("style","transform : rotate("+ (s*6) + "deg);width: 60px;height: 60px;border-right: 1px blue solid;position: absolute;transform-origin: right bottom; ");
	min2.setAttribute("style","transform : rotate("+ (m*6) + "deg);width: 60px;height: 60px;top: 0px;border-right: 1px red solid;position: absolute;transform-origin: right bottom; ");
	hour1.setAttribute("style","transform : rotate("+ (h*30) + "deg);height: 40px;width: 60px;top: 20px;border-right: 1px black solid;position: absolute;transform-origin: right bottom; ");
}
function dads() {
	var day = new Date();
	var year = day.getFullYear();
	var month = day.getMonth() + 1;
	var dday = day.getDate();
	var years = document.getElementById("year");
	years.innerHTML = year + "年";
	var months = document.getElementById("month");
	months.innerHTML = month + "月";
	var dayss = document.getElementById("days");
	dayss.innerHTML = dday + "日";
}
dads();