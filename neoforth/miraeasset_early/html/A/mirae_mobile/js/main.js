$(function(){
	var btn_gnb = $('.btn_gnb');
	btn_gnb.click(function(){
		console.log('222');
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

	setTimeout(function(){
		$('.intro').animate({opacity: 0}, 200, function(){
			$('.intro').css({display: 'none'});
		})
	}, 2000);
});