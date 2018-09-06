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

