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