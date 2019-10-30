$(function(){

	if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
		// tablet
		var el = $('#wrap');
		el.addClass('tablet');
	} 

	// main visual prev, next button motion
	// var g_$btnsArrow = $(".gu_btn_arrow");
	//create svg 
	// g_$btnsArrow.prepend('<svg class="svg_circle"><circle cx="50%" cy="50%" r="45%" stroke-dasharray="160" stroke-dashoffset="160"></circle></svg>');

	/*$(document).on("mousemove", function(e){
		var m_mouseX = e.pageX,
			m_mouseY = e.pageY;

		for(var i = 0, len = g_$btnsArrow.length; i < len; ++i){
			var m_$arrowObj = g_$btnsArrow[i],
				m_objSizeHalf = g_$btnsArrow.width()/2,
				m_offset = $(m_$arrowObj).offset(),
				m_objX = m_offset.left+m_objSizeHalf,
				m_objY = m_offset.top+m_objSizeHalf,
				distX = m_objX - m_mouseX,
				distY = m_objY - m_mouseY,
				dist = Math.sqrt(distX*distX+distY*distY);

			if(dist < 25){
				TweenMax.to(m_$arrowObj, 1, {x:-distX, y:-distY});
			}else{
				TweenMax.to(m_$arrowObj, 1, {x:0, y:0});
			}
		} 
	})*/

	// order box line motion
	$(document).on("mouseenter", '.custom_viewmore', function(){
		$(this).removeClass("off");
		$(this).addClass("on");
	}).on("mouseleave", '.custom_viewmore', function(){
		$(this).removeClass("on");
		$(this).addClass("off");
	});

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


	var box_txt = $('.home .txt_area');
	var box_txt_title = box_txt.find('.txt_title');
	var box_txt_sub = box_txt.find('.txt_sub'); 
	var box_top = null;
	var btn_close_notice = $('.popup_notice .btn_close'); 

	btn_close_notice.click(function(){
		$('.popup_notice').slideUp(200);
		$('#wrap').removeClass('popup_on'); 

		resize_txt(); 
		repositon_txt();  
	}); 

	function repositon_txt(){
		if ($('#wrap').hasClass('tablet')) {
			box_top = 60;  
		}else{
			if ($('#wrap').hasClass('popup_on')) {
				if ($(window).height() <= 700) {
					box_top = 45;
				}else{
					box_top = ($(window).height() - 70 - 250)/2 - box_txt.height()/2 -40; 
				} 
			}else{ 
				if ($(window).height() <= 700) {
					box_top = 45;
				}else{
					box_top = ($(window).height() - 70 - 250)/2 - box_txt.height()/2; 
				}
			} 
		};
		box_txt.css('top', box_top);
	}

	function resize_txt(){
		if ($(window).height() <= 900 && $(window).height() > 800) {
			box_txt_title.css({
				'font-size': '55px',
				'line-height': '60px' 
			}); 
			box_txt_sub.css({
				'font-size': '25px',
				'line-height': '40px',
				'margin-top': '30px'
			}); 
		}else if($(window).height() <= 800){ 
			box_txt_title.css({
				'font-size': '45px',
				'line-height': '50px'  
			}); 
			box_txt_sub.css({
				'font-size': '20px',
				'line-height': '35px',
				'margin-top': '25px' 
			});
		}else{ 
			box_txt_title.css({
				'font-size': '65px', 
				'line-height': '70px'  
			});
			box_txt_sub.css({
				'font-size': '30px',
				'line-height': '45px', 
				'margin-top': '39px'
			});
		} 
	} 

	resize_txt(); 
	repositon_txt(); 

	$(window).resize(function(){ 
		resize_txt(); 
		repositon_txt(); 
	}); 

 
/* ==========================================================================
   company info
   ========================================================================== */
	var company_thumbs = new Swiper('.swiper_thumbs', { 
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev', 
      },
      on: {
			init: function () {
				// console.log('init');
			}, 
			transitionEnd: function () {
				lst_thumbs.removeClass('active');
				$('.swiper-slide-active').find('.lst_thumbs li:nth-child(1) a').addClass('active'); 
			},
		}
    });
  
    var lst_thumbs = $('.lst_thumbs li a');
    var el_prev = null;

    lst_thumbs.each(function(){
    	tg = $(this);

    	if (tg.hasClass('active')) {
    		el_prev = tg;
    	};

    	tg.click(function(e){
    		e.preventDefault();

    		lst_thumbs.removeClass('active'); 
    		$(this).addClass('active');
    	});
    });

/* ==========================================================================
   order info  
   ========================================================================== */    

	var swiper_order1 = new Swiper('#desc_order1 .swiper-container', {
		observer: true,
        observeParents: true,
		// autoplay: {
		// 	delay: 5000,
		// },
		
		centeredSlides: true,
	    pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	    },
	    speed: 400,
	    spaceBetween: 20,
	    effect: "slide",
	    on: {
		    sliderMove: function(){
		    	swiper_order1.autoplay.stop();
		    	$('#desc_order1 .swiper-controler').removeClass('pause');
		    }
	    }
	});

	var bullet_order1 = $('#desc_order1 .swiper-pagination-bullet');
	bullet_order1.click(function(){
		var controler_order1 = $('#desc_order1 .swiper-controler');
		swiper_order1.autoplay.stop();
		controler_order1.removeClass('pause');
	});

	var btn_pause_order1 = $('#desc_order1 .swiper-controler');
	btn_pause_order1.click(function(){
		if ($(this).hasClass('pause')) {
			swiper_order1.autoplay.stop();
			$(this).removeClass('pause');
		}else{
			swiper_order1.autoplay.start();
			$(this).addClass('pause');
		}
	});

	var swiper_order2 = new Swiper('#desc_order2 .swiper-container', {
		observer: true,
        observeParents: true,
		// autoplay: {
		// 	delay: 5000,
		// },
		
		centeredSlides: true,
	    pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	    },
	    speed: 400,
	    spaceBetween: 20,
	    effect: "slide",
	    on: {
		    sliderMove: function(){
		    	swiper_order2.autoplay.stop();
		    	$('#desc_order2 .swiper-controler').removeClass('pause');
		    }
	    }
	});

	var bullet_order2 = $('#desc_order2 .swiper-pagination-bullet');
	bullet_order2.click(function(){
		var controler_order2 = $('#desc_order2 .swiper-controler');
		swiper_order2.autoplay.stop();
		controler_order2.removeClass('pause');
	});

	var btn_pause_order2 = $('#desc_order2 .swiper-controler');
	btn_pause_order2.click(function(){
		if ($(this).hasClass('pause')) {
			swiper_order2.autoplay.stop();
			$(this).removeClass('pause');
		}else{
			swiper_order2.autoplay.start();
			$(this).addClass('pause');
		}
	});

	var swiper_order3 = new Swiper('#desc_order3 .swiper-container', {
		observer: true,
        observeParents: true,
		// autoplay: {
		// 	delay: 5000,
		// },
		
		centeredSlides: true,
	    pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	    },
	    speed: 400,
	    spaceBetween: 20,
	    effect: "slide",
	    on: {
		    sliderMove: function(){
		    	swiper_order3.autoplay.stop();
		    	$('#desc_order3 .swiper-controler').removeClass('pause');
		    }
	    }
	});

	var bullet_order3 = $('#desc_order3 .swiper-pagination-bullet');
	bullet_order3.click(function(){
		var controler_order3 = $('#desc_order3 .swiper-controler');
		swiper_order3.autoplay.stop();
		controler_order3.removeClass('pause');
	});

	var btn_pause_order3 = $('#desc_order3 .swiper-controler');
	btn_pause_order3.click(function(){
		if ($(this).hasClass('pause')) {
			swiper_order3.autoplay.stop();
			$(this).removeClass('pause');
		}else{
			swiper_order3.autoplay.start();
			$(this).addClass('pause');
		}
	});

	// tab
	var lst_tabs = $('.section.order .group_tabs a');
	var contents_tabs = $('.section.order .group_tabs_contents .desc');
	lst_tabs.each(function(){
		var tg = $(this);
		tg.click(function(e){
			e.preventDefault();
			lst_tabs.removeClass('active');
			tg.addClass('active');
			contents_tabs.removeClass('active');
			var name = tg.attr('href');
			$(name).addClass('active');
		});
	});

	// scroll
	$.scrollify({
		section : ".section",
	    // sectionName : true,
	    interstitialSection : "#footer",
	    easing: "easeOutExpo",
	    scrollSpeed: 1100,
	    offset : 0,
	    scrollbars: true,
	    standardScrollElements: "",
	    setHeights: true, 
	    overflowScroll: false,
	    updateHash: true,
	    touchScroll:false,
		before:function(i,panels) {
			var ref = panels[i].attr("data-section-name");
			$(".pagination .active").removeClass("active");
			$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
		},
		afterResize:function(){
			// console.log('resize'); 
			$.scrollify.update();  
		},
		afterRender:function(i,panels) {
			var pagination = "<ul class=\"pagination\">";
			var activeClass = "";
			$(".section").each(function(i) {
				activeClass = "";
				if(i===0) {
					activeClass = "active";
				}
				pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
			});
			pagination += "</ul>";
			$(".home").append(pagination);
			/*
			Tip: The two click events below are the same:
			$(".pagination a").on("click",function() {
				$.scrollify.move($(this).attr("href"));
			});
			*/
			$(".pagination a").on("click",$.scrollify.move);

			$(".pagination .active").removeClass("active");
			$(".pagination li").eq($.scrollify.currentIndex()).find('a').addClass('active'); 

		}
	});	// scrollify

	if ($('#wrap').hasClass('tablet')) { 
		$.scrollify.destroy();   
	};

	$.scrollify.move('#main');

	
	// scroll motion
	var lst_title = $('.section h2');
	var lst_news = $('.section.news .lst_news li');
	var lst_guide = $('.section.news .lst_guide li');
	var wh = $(window).height();

	$(window).resize(function(){
		wh = $(this).height();

		/*write_positon(lst_title, -200);    
	 	write_positon(lst_news, -300); 
		write_positon(lst_guide, -1100);*/   
	});

	

 	/*write_positon(lst_title, -200);    
 	write_positon(lst_news, -300); 
	write_positon(lst_guide, -1100);*/   

	function write_positon(target, position_default){
		target.each(function(i){
			var tg = $(this);
			var pd = position_default;
			var gap = 100; 
			var idx = tg.closest('.section').index();
			// var scroll_top = tg.closest('.section').offset().top - 500;
			var scroll_top = wh*idx - 500;  
			var position_element = pd - (i * gap); 

			console.log(scroll_top);     


			tg.removeAttr('data-parallax'); 

			if (window.orientation !== 0) {
				tg.css({'top': position_element*-1});
				tg.attr('data-parallax', '{"y": '+ position_element + ', "from-scroll": ' + scroll_top + ', "distance": 0, "smoothness": 10}');
			}else{
				tg.css({
					'top': 0,
					'transform': 'translate3d(0px, 0px, 0px)'
				});
				tg.removeAttr('data-parallax');
			} 
		});
	}

});	// jQuery 

