$(function(){

/* ==========================================================================
   Home
   ========================================================================== */

	// slide swiper
	var swiper_home = new Swiper(' .swiper_home', {
		autoplay: {
			delay: 4000, 
		}, 
		
		// centeredSlides: true,
	    pagination: { 
	        el: '.swiper-pagination',
	        // type: 'fraction',
	        clickable: true,
	    }, 
	    navigation: {
        	nextEl: '.btn_next',
        	prevEl: '.btn_prev', 
      	},
	    speed: 400,
		spaceBetween: 0,
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	    on: {
	    	init: function () {
		    	$('.home .txt_area .txt_title').css({top: '200px', opacity: 0});
		    	$('.home .txt_area .txt_title').animate({top: '0px', opacity: 1}, 1000, "swing");

		    	$('.home .txt_area .txt_sub').css({top: '400px', opacity: 0});
		    	$('.home .txt_area .txt_sub').animate({top: '0px', opacity: 1}, 1000, "swing");

		    	var counter = $('.swiper-counter');
				var currentCount = $('<span class="count">1</span><span class="total">/01</span>');
				counter.append(currentCount);
		    },
		    slideChange: function(){
		    	var index = this.realIndex;
		    	$('.home .count').text(index + 1);

		    	var bullet = $('.home .swiper-pagination-bullet');
		    	bullet.each(function(i){
		    		if (i == index) {
		    			bullet.eq(i).find('.bar').stop().css({'width':'0%'});
		    			bullet.eq(i).find('.bar').stop().animate({'width':'100%'}, 3000);
		    		}else if(i < index){
		    			bullet.eq(i).find('.bar').stop().css({'width':'0%'}, function(){});
		    		}else{
		    			bullet.eq(i).find('.bar').stop().css({'width':'0%'});
		    		}
		    	});
		    },
		    slideChangeTransitionStart: function(){
		    	var index = this.realIndex;
		    	var slide = $('.home .swiper-slide-active');
 
		    	if (index%2 == 1) {
		    		slide.find($('.txt_title')).css({top: 0, left: -200, opacity: 0});
		    		slide.find($('.txt_sub')).css({top: 0, left: -400, opacity: 0});
		    	}else{
		    		slide.find($('.txt_title')).css({top: 200, left: 0, opacity: 0});
		    		slide.find($('.txt_sub')).css({top: 400, left: 0, opacity: 0});
		    	}
		    },
		    slideChangeTransitionEnd: function(){
		    	var index = this.realIndex;
		    	var slide = $('.home .swiper-slide-active'); 
		    	
		    	slide.find($('.txt_title')).animate({top: 0, left: 0, opacity: 1}, 1000, 'swing');
		    	slide.find($('.txt_sub')).animate({top: 0, left: 0, opacity: 1}, 1000, 'swing');
		    },
		    sliderMove: function(){ 
		    	swiper_home.autoplay.stop();
		    	$('.home .swiper-controler').removeClass('pause');
		    } 
	    } 
	    
	}); 

	$('.home .total').text('/0' + (swiper_home.slides.length - 2));

	var bullet_home = $('.home .swiper-pagination-bullet');

	bullet_home.append('<span class="bar"></span>');
	bullet_home.eq(0).find('.bar').stop().animate({'width':'100%'}, 3000);

	bullet_home.click(function(){
		var controler_home = $('.home .swiper-controler');
		if (controler_home.hasClass('pause')) {
			swiper_home.autoplay.stop();
			controler_home.removeClass('pause');
		}else{
			swiper_home.autoplay.start();
			controler_home.addClass('pause');
		}
	});

	$('.home .btns_arrow a').click(function(){
		var controler_home = $('.home .swiper-controler');
		swiper_home.autoplay.stop();
		controler_home.removeClass('pause');
	});

	var btn_pause_home = $('.section.home .swiper-controler');
	btn_pause_home.click(function(){
		if ($(this).hasClass('pause')) {
			swiper_home.autoplay.stop();
			$(this).removeClass('pause');
		}else{
			swiper_home.autoplay.start();
			$(this).addClass('pause');
		}
	});

/* ==========================================================================
   company
   ========================================================================== */
   // slide swiper
	var swiper_company = new Swiper(' .swiper_company', {
		slidesPerView: 2,
      	spaceBetween: 0,
      	centeredSlides: true,
	    pagination: { 
	        el: '.swiper-pagination',
	        clickable: true
	    }, 
	    navigation: {
        	nextEl: '.btn_next',
        	prevEl: '.btn_prev', 
      	},
	    on: {
	    	init: function () {
		    	
		    },
		    slideChange: function(){
		    	lst_desc.stop().fadeOut(300);   
		    	lst_desc.eq(swiper_company.activeIndex).stop().fadeIn(200);
		    }, 
		    slideChangeTransitionStart: function(){
		    	
		    },
		    slideChangeTransitionEnd: function(){
		    	
		    },
		    sliderMove: function(){ 
		    	
		    } 
	    } 
	});

	var lst_desc = $('.company .lst_desc li');
});