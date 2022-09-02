//明亮切换
$(document).ready(function() {
    // 写jquery代码
//还未代码优化
    var lb = $("#lite_btton");
	//所有盒子变黑
    var alldiv = $(" #caidan , #box , .more , .more_display , .article_box ,.topnav ,.more_site ,.more_sites ,.row ,.rightcolumn ,.new");
	//盒子灰色
    var lbbgc = $(".left_box>div , .right_box>div , .card ,.gopre,.gonext ");
	//菜单
    var caidana = $(".more_display>a ");
    var opcaidan = $("#caidan , #box , .more ");
    //文字黑变白
    var txt = $(".article_txth1,.article_txt>a , .left_one>h2, .left_two>h3, .left_two>h5, .left_three>h2 , .left_three>h4 , .js_two>p , .right_two>h2 , .right_two>ul>li>a , .guidang>li>a , .card>h2 ,.card>h1 ,#neirong,.more_sites>a ,.gopre ,.gonext,.fakeimg>a ,#tiwen ,.huida ,h1,p");
	//手机盒子变黑
    var phonebox = $(" #txt_box, .left_box , .gdphone , .gd , .articer_box , .nowtime ");
	//恢复
    var none = $("body , #caidan , #box , .more , .more_display ,  .txt_backgrund , .article_box ,.more_display>a ,.left_box>div , .right_box>div,#caidan , #box , .more,.article_txt>a , .left_one>h2, .left_two>h3, .left_two>h5, .left_three>h2 , .left_three>h5 , .js_two>p , .right_two>h3 , .right_two>ul>li>a, #txt_box, .left_box , .gdphone , .gd , .articer_box , .nowtime,#icp , .card , .guidang>li>a , .card>h2  ,.card>h1 ,#neirong ,.topnav,.more_site ,.more_sites ,.more_sites>a ,.row,.gopre ,.gonext,.fakeimg>a ,.new ,#tiwen ,.huida ,h1,p");
    var isOpen = false;
    lb.click(function () {
        isOpen = !isOpen;
        if (isOpen) {
            alert('开启黑夜模式');
			//纯黑
            alldiv.css('background-color', 'rgb(17,17,17)')
			//褐黑 文本框加入
            phonebox.css('background-color', 'rgb(17,17,17)')
			//下拉菜单文字变色 
            caidana.css('color', 'rgb(231, 213, 154)')
            lbbgc.css('background-color', 'rgb(47,47,47)')
            txt.css("color", "white")
        } else {
            alert('关闭黑夜模式');
            none.removeAttr('style');
        }
    })
})