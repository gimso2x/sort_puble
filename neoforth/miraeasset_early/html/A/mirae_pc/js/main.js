$(function(){
	var ww = $(window).outerWidth();
	var wh = $(window).outerHeight();
	var intro_width = ww/3;

	var intro = $('.intro');
	var intro1 = $('.intro1');
	var intro2 = $('.intro2');
	var intro3 = $('.intro3');

	var logo = $('.logo');

	var btn_left = $('.btn_left');
	var btn_right = $('.btn_right');
	var left = $('.left');
	var right = $('.right');

	var btn_gnb = $('.btn_gnb');
	btn_gnb.click(function(){
		$('.gnb_area').addClass('on');
		$('.gnb').addClass('on');
	});
	var btn_close = $('.btn_close');
	btn_close.click(function(){
		$('.gnb').removeClass('on');
		setTimeout(function(){
			$('.gnb_area').removeClass('on');
		}, 200);
		
	});

	btn_left.click(function(){
		left.addClass('on');
		right.animate({left: 1500}, 300, 'easeInQuart');
		btn_right.animate({left: 1000, opacity: 0}, 500, function(){
			location.href = 'sub_left1.html';
		});
		$('.main1').addClass('left');
	});

	btn_right.click(function(){
		left.addClass('on');
		right.animate({left: 1500}, 300, 'easeInQuart');
		btn_right.animate({left: 1000, opacity: 0}, 500, function(){
			location.href = 'sub_right1.html';
		});
		$('.main1').addClass('left');
	});

	

	function init(){
		ww = $(window).outerWidth();
		wh = $(window).outerHeight();
		intro_width = ww/3;

		intro.css({
			'background-size': ww+'px '+wh+'px'
		});

		intro1.css({
			'left': 0,
			'right': intro_width*2
		});
		intro2.css({
			'left': intro_width,
			'right': intro_width
		});
		intro3.css({
			'left': intro_width*2,
			'right': 0
		});
	};

	init();

	$(window).resize(function(){
		init();
	});

	setTimeout(function(){
		var txt1 = $('.txt1');
		var span = txt1.find('span');
		span.each(function(index){
			var tg = $(this);
			var tg_w = tg.outerWidth();

			tg.css('width', tg_w);
			tg.delay(80*index).animate({top: 0}, function(){
				$('.container.main1').css({opacity: 1});
			});
		});

		var txt2 = $('.txt2');
		var span2 = txt2.find('span');
		span2.each(function(index){
			var tg = $(this);
			var tg_w = tg.outerWidth();

			tg.css('width', tg_w);
			tg.delay(80*index).animate({top: 0});
		});

		logo.animate({opacity: 1});
	}, 500);

	setTimeout(function(){
		logo.animate({opacity: 0});

		var txt1 = $('.txt1');
		var span = txt1.find('span');

		span.each(function(index){
			var tg = $(this);
			tg.animate({'text-indent': 100});
		});

		var txt2 = $('.txt2');
		var span2 = txt2.find('span');
		span2.each(function(index){
			var tg = $(this);
			tg.animate({'text-indent': 100});
		});

		intro.each(function(){
			var tg = $(this);
			var tg_left = tg.position().left;
			tg.delay(600).animate({'left': tg_left + intro_width}, 500, function(){
					tg.parent().css('display', 'none');
				}
			);
		});
	}, 5000);

	$(window).scroll(function(e){
		var st = $(this).scrollTop();
		if (st > 500) {
			$('.banner').addClass('on');
		}else{
			$('.banner').removeClass('on');
		}
	});
});