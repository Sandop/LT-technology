// 头部more-hidden隐藏显示
(function showMore() {
	var $show = $('#more-hidden');
	var $more = $('#show-more');
	
	$more.click(function(e){
		$show.toggle();
	});
})();

// 首页轮播部分
(function (){
	var $tab = $('#banner .tab ul li'),
		$part = $('#banner .container .part'),
		$banner = $('#banner'),
		length = $tab.length,
		index = 0,
		timer = null;

		$tab.eq(0).addClass('on');
		$part.eq(0).show();
		
		$tab.click(function(){
			tabChange(function(){
				index = $(this).index();
			}.bind(this));
		});

		auto();
		$banner.hover(function(){
			clearInterval(timer);
		},auto);

		function auto(){
			timer = setInterval(function(){
				tabChange(function(){
					index ++;
					index %= length;
				}) ;
			},3000);
		}
		function tabChange(fn){
			$part.eq(index).fadeOut(500);
			$tab.eq(index).removeClass('on');
			fn && fn();
			$part.eq(index).fadeIn(500);
			$tab.eq(index).addClass('on');
		}
})();

// 首页经典案例部分图片切换
(function (){
	var $ul = $('#classic .c-swiper ul'),
		$li = $ul.children(),
		$dotLi = $('#classic .c-dot>ul>li'),
		length = $li.length,
		$btn = $('#classic .c-btn div'),
		width = $ul.children().eq(0).width(),
		midIndex = Math.floor(length/2),
		clickTime = 0,
		sumWidth = 0,
		timer = 0,
		// curDotIndex = midIndex,
		timer;

	changeClassName();
	setTimeout(function(){
		sumWidth = 0;
		$li.each(function(){
			sumWidth += $(this).width();
		});
		$ul.css('marginLeft',-sumWidth/2 + 'px').css('opacity',1);
	},300);

	$(window).resize(function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			width = $ul.children().eq(0).width();
			sumWidth = 0;
			$li.each(function(){
				sumWidth += $(this).width();
			});
			$ul.animate({'marginLeft' : -sumWidth/2+'px'},300);
		},300);
	});
    // 左右按钮点击图片切换
	$btn.click(function (){
		if (new Date() - clickTime > 350) {

			$dotLi.eq(midIndex).removeClass('color4');

			if ($(this).index()) {
				midIndex ++;
				midIndex %= length;

				$ul.stop().animate({
					'marginLeft': -sumWidth/2 - width + 'px'
				},300,function(){
					$(this).css('marginLeft',-sumWidth/2 + 'px').append($(this).children().first());
				});
			} else {
				midIndex --;
				if(midIndex < 0)midIndex = length - 1;

				$ul.stop().animate({
					'marginLeft': -sumWidth/2 + width + 'px'
				},300,function(){
					$(this).css('marginLeft',-sumWidth/2 + 'px').prepend($(this).children().last());
				});
			}

			changeClassName();
			clickTime = new Date();
			$dotLi.eq(midIndex).addClass('color4');
		}
	});


    // 函数给中间三个li添加名称
	function changeClassName(){
		var a = midIndex,
			b = midIndex + 1,
			c = midIndex - 1;
		if(b>=length)b=0;
        if(c<0)c=length-1;
		$li.removeClass('mid slide');
		$li.eq(a).addClass('mid');
		$li.eq(b).addClass('slide');
		$li.eq(c).addClass('slide');
	}

})();


// 头部more-hidden隐藏显示
(function showMore() {
	var $show = $('#more-hidden');
	var $more = $('#show-more');
	
	$more.click(function(e){
		$show.toggle();
	});
})();

//移动校园部分 part1
(function (){
	var $content = $('#content'),
		$part1 = $('#c-part1');

	$(window).resize(part1Height);
	part1Height();
	function part1Height(){
		var winHeight = $(window).height();
		$part1.height(winHeight - parseFloat($content.css('margin')));
	}
})();

//移动校园部分 part3 选项卡切换
(function (){
	var $tab3Li = $('#c-part3 .c-p-tab .tab3 ul li'),
		$tab2Li = $('#c-part3 .c-p-tab .tab2 ul li'),
		length = $tab3Li.length,
		index = 0,
		timer = null;

	$tab3Li.click(function(){
		clearInterval(timer);
		index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$tab2Li.eq(index).show().siblings().hide();
		auto();
	});	
	auto();
	function auto(){
		timer = setInterval(function(){
			index ++;
			index %= length;
			$tab3Li.eq(index).addClass('on').siblings().removeClass('on');
			$tab2Li.eq(index).show().siblings().hide();
		},3000)
	}
})();

//移动校园部分 btn按钮点击
(function (){
	var $part = $('#content .part'),
		$btn = $part.find('.btn');

	$btn.click(function(){
		var index = $(this).parents('.part').index('.part');
		// console.log(index);
		var scrollTop = $part.eq(index+1).offset().top - ($(window).height()-$part.eq(index+1).height()+71)/2;
        
        $("body,html").animate({
            scrollTop : scrollTop
        },800);
	});


})();
// 头部more-hidden隐藏显示
(function showMore() {
	var $show = $('#more-hidden');
	var $more = $('#show-more');
	
	$more.click(function(e){
		$show.toggle();
	});
})();

//为新闻动态增加分页
/**
 * 为新闻页面增加新的翻页插件
 * create by santree on 2016/9/7
 * usage: $("your className").pageBean({
 *      perPageNum : 4  //每页显示的数量
 *      nowPage    : 1  //初始显示的页码
 *      pageClass  : "your pageClass" //你用来放置页码的div
 *      list       : [
 *          {
 *              imgUrl: "图片地址",
 *              url   : "跳转页面地址",
 *              title : "新闻标题",
 *              detail: "新闻描述",
 *              time  : "发布时间"
 *          }
 *          //每个新闻动态都按照以上对象格式封装作为数组
 *      ]
 * })
 * PS : 在录入新闻是记住时间最近的放在最前面，永远按照在头部加入新闻的原则，时间顺序是从上到下
 *
 */
(function ($) {
    $.fn.extend({
        "pageBean" : function (options) {
            //合并默认配置和自定义配置
            var opts = $.extend({}, defaults, options);
            //设定新闻模版
            var tmpl =
                "<div class='news-details'>"
                + "<div class='news-img'>" + "<img src='' alt=''/>" + "</div>"
                + "<div class='news-text'>"
                + "<h1 class='news-title'>" + "<a href='' target='_blank'>" + "</a>" + "</h1>"
                + "<p class='news-time'>" + "</p>"
                + "<p class='news-detail'>" + "</p>"
                + "</div>"
                + "</div>";
            //设定分页数字模板
            var tmplPage = "<a class='pg-num' href='javascript:void(0);'>" + "</a>";

            this.each(function () {
                var $this = $(this);
                //获取总页数
                var allPageNum = $.fn.pageBean.getPageNum(opts.list, opts.perPageNum);

                //传入页码数目
                for (var i = 0; i < allPageNum; i++) {
                    var nowPage = $(tmplPage).text(i + 1);
                    $this.find(opts.pageClass).append(nowPage);
                }
                //为每一页的页码绑定事件
                $this.find(opts.pageClass).children("a").on('click', function () {
                    $(this).addClass("select");
                    $(this).siblings().removeClass("select");
                    var nowPage = parseInt($(this).text());
                    addNewpage(nowPage);
                });
                //触发默认第一页的点击时间
                $this.find(opts.pageClass).children("a").eq(opts.nowPage - 1).trigger('click');
                //为当前页数传入内容
                function addNewpage(nowPage) {
                    $this.find(".news-details").remove();
                    var nowPageArr = $.fn.pageBean.pagination(opts.list, nowPage, opts.perPageNum);
                    for (var i = 0; i < nowPageArr.length ; i++) {
                        $this.append(tmpl);
                    }
                    for (var j = 0; j < nowPageArr.length; j++){
                        $(".news-details").eq(j).find(".news-img img").attr("src", nowPageArr[j].imgUrl);
                        $(".news-details").eq(j).find(".news-title a").attr("href", nowPageArr[j].url);
                        $(".news-details").eq(j).find(".news-title a").text(nowPageArr[j].title);
                        $(".news-details").eq(j).find(".news-time").text(nowPageArr[j].time);
                        $(".news-details").eq(j).find(".news-detail").text(nowPageArr[j].detail);
                    }
                }
            })
        }
    });
    //定义默认配置
    var defaults ={
        perPageNum : 4,
        nowPage    : 1,
        pageClass  : ".pg-btn",
        list: [
            {
                imgUrl: "../images/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016.01.29"
            },
            {
                imgUrl: "../images/news/ct2.jpg",
                url   : "http://it.msn.com.cn/077636/555560998284b.shtml",
                title : "兰途科技:搭建互联网+校园移动门户平台",
                detail: "2016年1月8日，河南省教育科研网2016年工作会议在新乡医学院成功召开。本次会议以“‘互联网+’时代网络中心的定位与发展”为主题，由河南省教育科研网主办...",
                time  : "2016.01.21"
            },
            {
                imgUrl: "../images/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016.01.15"
            },
            {
                imgUrl: "../images/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015.11.24"
            }
        ]
    };

    /**
     *  根据总的list和每页数目以及当前页数来确定当夜的list为什么
     * @param arr
     * @param pgNum
     * @param perPageNum
     * @returns {Array.<T>|ArrayBuffer|Blob|string|*}
     */
    $.fn.pageBean.pagination = function (arr, pgNum, perPageNum) {
        var perPageArr = arr.slice( (pgNum-1) * perPageNum, pgNum * perPageNum );
        return perPageArr;
    };

    /**
     *  根据总的list和每页数目来确定总页数
     * @param arr
     * @param perPageNum
     * @returns {number}
     */
    $.fn.pageBean.getPageNum = function (arr, perPageNum) {
        var allPageNum = Math.ceil( arr.length / perPageNum );
        return allPageNum;
    };

})(jQuery);
$(function () {
    $(".n-list").pageBean({
        list : [
            {
                imgUrl: "../images/news/ct9.jpg",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823005" +
                "&idx=1&sn=bf01a999dc45df573a0442bf900613bb&chksm=80c5f114b7b278" +
                "02a59fda5a9a0a1024e3971ba392ded1086aefa32027d493768ba25dd529ce" +
                "&mpshare=1&scene=23&srcid=0614VV2F7w6nPFxlPXw1tn0S#rd",
                title : "兰途出品|“掌上河中医”试运行上线啦",
                detail: "​随着信息技术的发展，移动门户随之走进了校园。为了更好的服务全校教职工生，河南中医药大学网络信息中心于2016年12月起与兰途科技共同建设...",
                time  : "2017-06-09"
            },
            {
                imgUrl: "../images/news/ct8.jpg",
                url   : "http://www.caigou.com.cn/news/20170424108.shtml",
                title : "兰途科技参加CERNET西南地区学术年会",
                detail: "​为进一步加强西南地区各高校数字校园建设，分享信息化建设实践中的有益经验、交流信息领域的关键技术和应用，进一步促进CERNET西南地区各高校...",
                time  : "2017-04-24"
            },
            {
                imgUrl: "../images/news/ct10.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822895" +
                "&idx=1&sn=a2edd0d5dba65f9ad2b2f633ef0839a1&chksm=80c5f0a6b7b279b01ac3554" +
                "4aa73f59fab58070d35297f510eb1ed137dafc684e8e2929e8c0f&mpshare=1&scene=23" +
                "&srcid=0614xSalSzfg5auWBvNiaD7Y#rd",
                title : "兰途出品|中国海洋大学移动门户“i中国海大”拉新运营活动圆满落幕",
                detail: "​近日，兰途科技携手中国海大网络协会策划运营了“花开海大”主题摄影大赛，旨在调动师生对“i中国海大”的参与度和使用率，同时丰富中国海洋大学的校园文化生活...",
                time  : "2017-04-18"
            },
            {
                imgUrl: "../images/news/ct21.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822888&idx=1&sn=45e38d4850ca12e6dece79f16dff0172&" +
                "chksm=80c5f0a1b7b279b79fa46a64162ed79a1a7e482f5c1b4b100eb4856d312ad5c8350c32699ae0&" +
                "mpshare=1&scene=23&srcid=0614LrEPIFQNqMVvWJR0vhCZ#rd",
                title : "由兰途科技策划运营的中财一卡通设计初赛圆满结束！",
                detail: "4月13日，由中央财经大学网络信息中心、数字化校园建设办公室主办、校文化与传播学院承办、兰途科技协办并策划运营执行的“中央财经大学一卡通卡面设计大赛”的初赛评选工作已圆满结束...",
                time  : " 2017-04-14"
            },
            {
                imgUrl: "../images/news/ct11.jpg",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822883" +
                "&idx=1&sn=4ddcd64b8f4cf2765f8db6d1dada3171&chksm=80c5f0aab7b279bc0106232" +
                "caae15dc67ca460dac10cab0442ae509eb8d74f1dcd5a7dd39517&mpshare=1&scene=23" +
                "&srcid=0614rOb9Dv1U4t3VJNZcNlvd#rd",
                title : "听说，西安电子科技大学发布了一款新产品...",
                detail: "4月10日，西安电子科技大学信息化建设处面向全校发布了一款程序员实力锻造的新产品。这是一款由兰途科技提供技术支持，采用兰途跨平台校园门户系统...",
                time  : "2017-04-12"
            },
            {
                imgUrl: "../images/news/ct12.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822873&idx=1" +
                "&sn=f2c3391136ae9137b95613edab8a79d3&chksm=80c5f090b7b27986048d253eeaab14418fc13c" +
                "2a67634c6ba83605be9b601d07d40fa97d748a&mpshare=1&scene=23&srcid=061449RcrJ6abiCnMmxeNvpw#rd",
                title : "兰途出品|北京建筑大学企业号，畅享移动校园新体验",
                detail: "迄今，微信已建立起订阅号、服务号、企业号和小程序四大体系。相对于APP，越来越多的高校利用微信上搭载移动应用，开启校园信息化新模式...",
                time  : "2017-04-11"
            },
            {
                imgUrl: "../images/news/ct13.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822842" +
                "&idx=1&sn=79e4b8ad18836ae7c9721758f4e31070" +
                "&chksm=80c5f0f3b7b279e5f6ed59f67e84dbc22f96a4b19bba50fde6f5c14f5123080772e82b106679" +
                "&mpshare=1&scene=23&srcid=0614MU4hMSMxoJNdHVuJoVmI#rd",
                title : "兰途出品 | 河工贸移动校园上线使用率过半",
                detail: "日前，兰途科技参与建设提供技术服务支持的河南工业贸易职业学院移动校园（以下简称“河工贸移动校园”）已圆满完成，并获得了广大师生的欢迎和认可...",
                time  : "2017-03-29"
            },
            {
                imgUrl: "../images/news/ct14.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822828" +
                "&idx=1&sn=70a4d73d8afc085d559bd769eed32e75" +
                "&chksm=80c5f0e5b7b279f32c36c93b13e325b14618f2583b0bd30f7653f38d2f8ebb709fd27c193e47" +
                "&mpshare=1&scene=23&srcid=061409IeWScVbs9nX3lSxyqg#rd",
                title : "兰途出品|西南石油大学“移动校园”上线！",
                detail: "移动校园建设主要为学校提供了基于教务、通知、办公、教学、生活等20项服务广大师生的常用应用，并且统一的应用管理平台还支持后期的应用扩展，非常方便...",
                time  : "2017-03-22"
            },
            {
                imgUrl: "../images/news/ct15.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822791&idx=1&sn=a546cef4a2b56d619c1efbe4743c0278" +
                "&chksm=80c5f0ceb7b279d8b9ce5d15c38bd404ec7f02e97e8f076a37d73c0d0c1011c52b799c4a3089" +
                "&mpshare=1&scene=23&srcid=0614awRN2zKhDYXaLt0F4Kel#rd",
                title : "西南财经大学：99%掌上离校，学生快速办理毕业手续",
                detail: "还有不到四个月的时间，各大高校老师又要开始忙于办理毕业生离校手续。在很多高校，每年六月的离校高峰期，来回奔波提交资料、办理离校毕业证书...",
                time  : " 2017-03-13"
            },
            {
                imgUrl: "../images/news/ct16.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822781&idx=1&sn=29ddf153210991e192edace50e396ffe&" +
                "chksm=80c5f034b7b2792293ae4aea0f73821d87b38c6f3caba7d08e0766cb97013507348cf9191589&" +
                "mpshare=1&scene=23&srcid=0614EaxcBysafq2UIMShZu0W#rd",
                title : "兰途出品|广西师范学院移动校园平台建设完成，支持后期应用扩展",
                detail: "经过为期三月的开发建设，广西师范学院移动校园统一服务平台已经建设完成并准备面向全校上线。本次的移动校园建设主要为学校提供了基于教务、通知、办公、教学、生活等20项服务广大师生的常用应用...",
                time  : " 2017-03-09"
            },
            {
                imgUrl: "../images/news/ct17.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822719" +
                "&idx=1&sn=2ec93fdc1bc7050d1f50f03807f9e4b5&" +
                "chksm=80c5f076b7b27960fcb1440153cfda0063eed1f1572d259e44e72f675285983ffd56e044aea3" +
                "&mpshare=1&scene=23&srcid=0614etsjtNn53N4HW1luhcas#rd",
                title : "兰途出品|中国海洋大学移动校园今日上线试运行",
                detail: "对于全新移动校园平台“i中国海大”的初次上线试运营，学校网络与信息中心领导小组的老师给予了特别的重视，分别在校官网（学校最具权威的宣传展示渠道）投放了首页宣传图和发布了上线公告...",
                time  : " 2017-01-10"
            },
            {
                imgUrl: "../images/news/ct3.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822703&idx=1" +
                "&sn=f5658474c121e0fb7ea763a0e94fdce3" +
                "&chksm=80c5f066b7b279703c76fa7c3c58b146c55e2fdb900c05404613448135a5bc28548aa12709d5" +
                "&mpshare=1&scene=23&srcid=0614Nwl8UiatgUK1G8BXEbao#rd",
                title : "专题|中青政基于微信企业号的高校移动信息化实践与运行",
                detail: "近年来，移动互联网的浪潮给高校信息化建设带来了很多挑战，但同时也带来了新的发展机遇，移动信息化建设成为当前高校信息化建设一个重要的建设方向。自腾讯于2014年下半年推出微信企业号后，更是给高校移动信息化建设提供了便利的条件...",
                time  : " 2016-12-23"
            },
            {
                imgUrl: "../images/news/ct4.jpg",
                url   : "http://www.sohu.com/a/121980615_555566",
                title : "兰途科技 为高校构建长久持续的移动信息化服务",
                detail: "　随着网络基础设施的不断完善，以及信息系统的不断上线，当前多数高校信息化服务管理开始向移动端发展。移动信息化服务平台(APP、微信端)为高校信息化服务管理拓展了一种新的模式，是校园未来信息化管理和服务的重要平台。",
                time  : "2016-12-19"
            },
            {
                imgUrl: "../images/news/ct19.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822675&idx=1&sn=703cb8226cc6f5f7da2a43e15e346851&" +
                "chksm=80c5f05ab7b2794c1283668abd39b690f65ac741ae1c086ce38e70bded9422d00efe8d1b56ad&" +
                "mpshare=1&scene=23&srcid=0614HCU3cwOMOCePAc6iYJYG#rd",
                title : "盘点北京交通大学官方微信企业号那些好“玩”的应用",
                detail: "上周我们给大家介绍了北京交通大学的官方移动信息服务平台——北交移动门户APP日均访问量破万。并在文章结尾卖了一个小关子：北京交通大学的微信企业号也运营得有声有色，今日就为大家揭晓答案...",
                time  : " 2016-12-08"
            },
            {
                imgUrl: "../images/news/ct20.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822661&" +
                "idx=1&sn=52c29d00fa4c6b0c0664066b9891041e&" +
                "chksm=80c5f04cb7b2795a5200085208bdaab51071d53a83a269f0eed04661664c07667377777de57b&" +
                "mpshare=1&scene=23&srcid=0614PYZeQBsfRWhlUdQRAlpu#rd",
                title : "由兰途科技承建的北交移动门户日均访问量破万",
                detail: "由兰途科技承建、北京交通大学官方出品的北交移动门户APP以“贴心服务、体验顺畅、关注学生”等特色深受北交师生喜爱，并且以每日平均10000+的访问量赢得师生广泛关注和使用...",
                time  : " 2016-12-01"
            },
            {
                imgUrl: "../images/news/ct22.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822653&" +
                "idx=1&sn=41fdf48598fbfa933d42719110aa4a21&" +
                "chksm=80c5f3b4b7b27aa28968d18bee54fa6f8e29eb133e19d055a864c61a2280f331a76c097fd322&" +
                "mpshare=1&scene=23&srcid=0614SAUaY3a5cagRNninBI2Z#rd",
                title : "兰途出品|北京第二外国语大学移动校园正式上线",
                detail: "由兰途科技承建的北京第二外国语大学官方移动信息服务平台（简称“移动二外”）已经全线上线试运行啦，这一举措，让北京第二外国语大学进入移动信息服务新时代...",
                time  : " 2016-11-25"
            },
            {
                imgUrl: "../images/news/ct23.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822613&idx=1&sn=cd73e3a78c38379cef9603d8c73bf519&" +
                "chksm=80c5f39cb7b27a8a8bf4f50d8cb08c765cf35d59260dbfc43637bfa4c4a225c0cc4fc1772176&" +
                "mpshare=1&scene=23&srcid=0614CE9HEdbmmXoNq3Mo9LOH#rd",
                title : "兰途出品|技能MAX的长安大学移动信息服务平台上线啦！",
                detail: "由兰途科技承建的长安大学官方移动信息服务平台（简称“长安大学APP”）已经全线上线试运营啦，这一举措，让长安大学进入全新移动信息服务新时代...",
                time  : " 2016-11-09"
            },
            {
                imgUrl: "../images/news/ct5.jpg",
                url   : "http://sanwen8.cn/p/553c6z6.html",
                title : "兰途科技洪叶：保持专注 只为更好的智慧校园体验 | 晓数专访",
                detail: "在移动互联浪潮与“十三五”规划中教育部提出加快教育信息化发展的双重推动下，“互联网+教育”概念被迅速传播，高校逐渐启程踏上智慧校园之路，而越来越多的厂商、资本也纷纷瞄准了这一巨大潜力的市场。",
                time  : "2016-11-07"
            },
            {
                imgUrl: "../images/news/ct24.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822565&idx=1&" +
                "sn=51ca21c030a894ff64082c9606785c41&" +
                "chksm=80c5f3ecb7b27afa7739c0eccfce771056cf379e05701b03efd7a1980fd80540da4e04322a20&" +
                "mpshare=1&scene=23&srcid=0614SSH0aG4tSfkH5yIxvG4I#rd",
                title : "兰途出品|移动中财大拉新运营活动圆满结束！",
                detail: "2016年10月12日，借中央财经大学“百团大战”之际，兰途科技与学校一起策划组织了新一轮的移动中财大拉新运营活动...",
                time  : " 2016-10-14"
            },
            {
                imgUrl: "../images/news/ct25.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822510&idx=1&sn=57d049ea48717f5a482ff819c0410fa7&" +
                "mpshare=1&scene=23&srcid=0614BhhSeIrXyMx2yXEs5IYW#rd",
                title : "高校APP开学迎新出大招：手机报道、全景校园、学长帮忙...",
                detail: "从8月31日起，各大高校陆续进入开学迎新季。为奏响新生入校第一乐章，各大高校“奇招”、“新招”花样百出，利用校园官方APP推出手机迎新报道、全景校园、选号服务、学长帮忙...",
                time  : "2016-09-06"
            },
            {
                imgUrl: "../images/news/ct2.jpg",
                url   : "http://edu.enorth.com.cn/system/2016/08/22/031118032.shtml",
                title : "兰途科技，运用企业号提供智慧校园解决方案",
                detail: "据了解，由兰途科技筹建的北建移动门户微信企业号2.5.9已于近日正式上线。该企业号是基于智慧校园推出的微信第三方应用。根据学生反映，自北建移动门户上线以来，全校部分师生已经关注并绑定了此微信企业号...",
                time  : "2016-08-22"
            },
            {
                imgUrl: "../images/news/ct7.png",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822255&idx=1&sn=78803a2334935c00c97e04abaa652824&scene=23&srcid=08033ger5lTW8DS1OAkBzDpb#rd",
                title : "兰途出品 | 中财移动门户上线！",
                detail: "中财掌上校园正式开学了！兰途科技承建的中央财经大学官方移动门户正式上线，现已登陆苹果、安卓各大应用市场，在校师生可第一时间前往下载使用...",
                time  : "2016-05-30"
            },
            {
                imgUrl: "../images/news/ct6.png",
                url   : "http://edu.enorth.com.cn/system/2016/05/26/030988669.shtml",
                title : "兰途科技出品：中青政“移动校园”上线",
                detail: "昨日，中国青年政治学院“移动校园”正式上线，成为中青政“智慧校园”发展又一里程碑。同时，兰途科技“移动智慧校园”家族正式增添一名新成员...",
                time  : "2016-05-26"
            },
            {
                imgUrl: "../images/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016-01-29"
            },
            {
                imgUrl: "../images/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016-01-15"
            },
            {
                imgUrl: "../images/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015-11-24"
            }

        ]
    });
    $(".btn-first").on('click', function () {
        $(".pg-btn a:first-child").trigger('click');
    });
    $(".btn-last").on('click', function () {
        $(".pg-btn a:last-child").trigger('click');
    });
    $(".btn-pre").on('click', function () {
        $(".pg-num.select").prev().trigger('click');
    });
    $(".btn-next").on('click', function () {
        $(".pg-num.select").next().trigger('click');
    })
});